import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { enrichedRecipes, getRecipeById } from "@/data/enrichedRecipes";
import RecipeCard from "@/components/RecipeCard";
import { Loader2, LogOut, Sparkles, Download, RefreshCw, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import {
  downloadNutriReport,
  downloadWeeklyMenu,
  downloadShoppingList,
  downloadRecipesCollection,
  type NutriForm,
  type NutriPlan,
} from "@/lib/pdf";

interface Profile { name: string | null; email: string | null; created_at: string }

export default function MyAccount() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<NutriForm | null>(null);
  const [plan, setPlan] = useState<NutriPlan | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const [p, np, rv] = await Promise.all([
        supabase.from("profiles").select("name, email, created_at").eq("id", user.id).maybeSingle(),
        supabase.from("nutri_plans").select("form_data, plan").eq("user_id", user.id).maybeSingle(),
        supabase.from("recipe_views").select("recipe_id, viewed_at").eq("user_id", user.id).order("viewed_at", { ascending: false }).limit(30),
      ]);
      if (p.data) setProfile(p.data);
      if (np.data) {
        setForm(np.data.form_data as unknown as NutriForm);
        setPlan(np.data.plan as unknown as NutriPlan);
      }
      if (rv.data) {
        const ids: number[] = [];
        for (const row of rv.data) if (!ids.includes(row.recipe_id)) ids.push(row.recipe_id);
        setHistory(ids.slice(0, 12));
      }
      setLoading(false);
    })();
  }, [user]);

  const favoriteRecipes = enrichedRecipes.filter((r) => favorites.includes(r.id));
  const historyRecipes = history.map((id) => getRecipeById(id)).filter(Boolean) as ReturnType<typeof getRecipeById>[];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Minha Conta — Viva Leve" description="Seu painel Viva Leve com perfil, avaliação, cardápio, favoritos e downloads." />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3"><UserIcon className="h-6 w-6 text-primary" /></div>
                <div>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold">Olá, {profile?.name || user.email}</h1>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => signOut().then(() => navigate("/"))}>
                <LogOut className="h-4 w-4 mr-1" /> Sair
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 max-w-5xl">
          <Tabs defaultValue="perfil">
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="perfil">Perfil</TabsTrigger>
              <TabsTrigger value="avaliacao">Avaliação</TabsTrigger>
              <TabsTrigger value="plano">Plano</TabsTrigger>
              <TabsTrigger value="cardapio">Cardápio</TabsTrigger>
              <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>

            <TabsContent value="perfil" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Meu Perfil</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Nome:</strong> {profile?.name || "—"}</p>
                  <p><strong>E-mail:</strong> {profile?.email || user.email}</p>
                  <p><strong>Membro desde:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("pt-BR") : "—"}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avaliacao" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Minha Avaliação NutriA</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {form ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                        <div><strong>Objetivo:</strong> {form.objetivo}</div>
                        <div><strong>Idade:</strong> {form.idade}</div>
                        <div><strong>Sexo:</strong> {form.sexo}</div>
                        <div><strong>Altura:</strong> {form.altura} cm</div>
                        <div><strong>Peso:</strong> {form.peso} kg</div>
                        <div><strong>Atividade:</strong> {form.atividade}</div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button asChild variant="outline"><Link to="/nutri-assistente"><RefreshCw className="h-4 w-4 mr-1" /> Atualizar avaliação</Link></Button>
                        {plan && (
                          <Button variant="outline" onClick={() => downloadNutriReport(form, plan, enrichedRecipes.slice(0, 8))}>
                            <Download className="h-4 w-4 mr-1" /> Baixar meu relatório
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Você ainda não fez a avaliação. <Link to="/nutri-assistente" className="text-primary underline">Começar agora</Link>.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plano" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Meu Plano Alimentar</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {plan ? (
                    <>
                      <p className="text-sm">{plan.resumo}</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><Sparkles className="inline h-4 w-4 text-primary" /> Meta: <strong>{plan.calorias_alvo} kcal/dia</strong></div>
                        <div><Sparkles className="inline h-4 w-4 text-primary" /> Água: <strong>{(plan.hidratacao_ml / 1000).toFixed(1)} L/dia</strong></div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button variant="outline" onClick={() => form && downloadNutriReport(form, plan, enrichedRecipes.slice(0, 8))}><Download className="h-4 w-4 mr-1" /> Relatório</Button>
                        <Button variant="outline" onClick={() => downloadWeeklyMenu(plan)}><Download className="h-4 w-4 mr-1" /> Cardápio semanal</Button>
                        <Button variant="outline" onClick={() => downloadShoppingList(plan)}><Download className="h-4 w-4 mr-1" /> Lista de compras</Button>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum plano salvo. <Link to="/nutri-assistente" className="text-primary underline">Gerar plano</Link>.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cardapio" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Meu Cardápio</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {plan?.cardapio?.length ? (
                    <>
                      {plan.cardapio.map((d) => (
                        <div key={d.dia} className="border-l-2 border-primary/40 pl-3">
                          <p className="font-semibold text-primary">{d.dia}</p>
                          <ul className="text-sm text-muted-foreground list-disc pl-4">
                            {d.refeicoes.map((m, i) => (<li key={i}><strong>{m.nome}:</strong> {m.descricao} <em>({m.calorias} kcal)</em></li>))}
                          </ul>
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => downloadWeeklyMenu(plan)}><Download className="h-4 w-4 mr-1" /> Baixar cardápio</Button>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum cardápio salvo.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favoritos" className="mt-4">
              {favoriteRecipes.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteRecipes.map((r) => (
                    <RecipeCard key={r.id} recipeId={r.id} title={r.nome} image={r.image} time={r.time} calories={r.calories} rating={r.rating} tags={r.tags} costPerServing={r.costPerServing} servings={r.servings} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum favorito ainda. <Link to="/receitas" className="text-primary underline">Explorar receitas</Link>.</p>
              )}
            </TabsContent>

            <TabsContent value="historico" className="mt-4">
              {historyRecipes.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {historyRecipes.map((r) => r && (
                    <RecipeCard key={r.id} recipeId={r.id} title={r.nome} image={r.image} time={r.time} calories={r.calories} rating={r.rating} tags={r.tags} costPerServing={r.costPerServing} servings={r.servings} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Seu histórico aparecerá aqui conforme você visitar receitas.</p>
              )}
            </TabsContent>

            <TabsContent value="downloads" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Downloads</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Todos os PDFs disponíveis na Biblioteca Viva Leve.</p>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild><Link to="/biblioteca"><Download className="h-4 w-4 mr-1" /> Abrir Biblioteca</Link></Button>
                    {favoriteRecipes.length > 0 && (
                      <Button variant="outline" onClick={() => downloadRecipesCollection("Receitas Favoritas", "Suas receitas salvas", favoriteRecipes)}>
                        <Download className="h-4 w-4 mr-1" /> Favoritas em PDF
                      </Button>
                    )}
                  </div>
                  <div className="pt-3 border-t">
                    <Badge variant="outline">{favoriteRecipes.length} favoritos</Badge>{" "}
                    <Badge variant="outline">{historyRecipes.length} visualizações recentes</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
}
