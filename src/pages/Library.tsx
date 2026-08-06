import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useMadeRecipes } from "@/hooks/useMadeRecipes";
import { toast } from "sonner";
import {
  Download,
  BookOpen,
  Loader2,
  FileText,
  ShoppingBasket,
  Heart,
  Dumbbell,
  Wallet,
  Scale,
  Flame,
  Leaf,
  Salad,
  ChefHat,
  Sun,
  Utensils,
  Cookie,
  LogIn,
} from "lucide-react";
import { enrichedRecipes } from "@/data/enrichedRecipes";
import type { EnrichedRecipe } from "@/data/recipeMetadata";
import {
  downloadNutriReport,
  downloadWeeklyMenu,
  downloadShoppingList,
  downloadRecipesCollection,
  type NutriPlan,
  type NutriForm,
} from "@/lib/pdf";

type Cat = {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  needsAuth?: boolean;
  action: (ctx: LibCtx) => Promise<unknown> | unknown;
};

interface LibCtx {
  favorites: EnrichedRecipe[];
  made: EnrichedRecipe[];
  loadPlan: () => Promise<{ form: NutriForm; plan: NutriPlan } | null>;
}

const filterByCat = (fn: (r: EnrichedRecipe) => boolean) =>
  enrichedRecipes.filter(fn);

const CATS: Cat[] = [
  {
    id: "relatorio",
    title: "Meu Relatório Nutricional",
    desc: "Sua avaliação completa da NutriA em PDF.",
    icon: FileText,
    needsAuth: true,
    action: async (ctx) => {
      const saved = await ctx.loadPlan();
      if (!saved) return toast.error("Faça sua avaliação com a NutriA primeiro.");
      const recommended = enrichedRecipes.slice(0, 8);
      downloadNutriReport(saved.form, saved.plan, recommended);
    },
  },
  {
    id: "cardapio",
    title: "Meu Cardápio Semanal",
    desc: "Seu plano alimentar organizado por dia.",
    icon: Utensils,
    needsAuth: true,
    action: async (ctx) => {
      const saved = await ctx.loadPlan();
      if (!saved) return toast.error("Gere seu cardápio com a NutriA primeiro.");
      downloadWeeklyMenu(saved.plan);
    },
  },
  {
    id: "compras",
    title: "Minha Lista de Compras",
    desc: "Ingredientes do seu cardápio agrupados por categoria.",
    icon: ShoppingBasket,
    needsAuth: true,
    action: async (ctx) => {
      const saved = await ctx.loadPlan();
      if (!saved) return toast.error("Gere seu cardápio com a NutriA primeiro.");
      downloadShoppingList(saved.plan);
    },
  },
  {
    id: "favoritas",
    title: "Receitas Favoritas",
    desc: "Todas as suas receitas salvas em um PDF.",
    icon: Heart,
    action: async (ctx) => {
      if (!ctx.favorites.length) return toast.error("Você ainda não salvou receitas.");
      await downloadRecipesCollection("Receitas Favoritas", "Suas receitas salvas", ctx.favorites);
    },
  },
  {
    id: "jafiz",
    title: "Receitas Já Feitas",
    desc: "As receitas que você marcou como “Já fiz”.",
    icon: ChefHat,
    action: async (ctx) => {
      if (!ctx.made.length) return toast.error("Você ainda não marcou receitas como “Já fiz”.");
      await downloadRecipesCollection("Receitas que eu já fiz", "Suas receitas preparadas", ctx.made);
    },
  },
  {
    id: "fitness",
    title: "Receitas Fitness",
    desc: "Receitas proteicas para treinar e evoluir.",
    icon: Dumbbell,
    action: () => downloadRecipesCollection("Receitas Fitness", "Ricas em proteína e leves", filterByCat((r) => r.proteins >= 18 || r.tags.some((t) => /fit|proteic/i.test(t)))),
  },
  {
    id: "economicas",
    title: "Receitas Econômicas",
    desc: "Cabem no bolso e no seu tempo.",
    icon: Wallet,
    action: () => downloadRecipesCollection("Receitas Econômicas", "Custo baixo por porção", filterByCat((r) => r.costPerServing <= 8)),
  },
  {
    id: "emagrecimento",
    title: "Receitas para Emagrecimento",
    desc: "Baixas em calorias, cheias de sabor.",
    icon: Scale,
    action: () => downloadRecipesCollection("Receitas para Emagrecimento", "Leves e nutritivas", filterByCat((r) => r.caloriesNum <= 350 || r.goals.includes("emagrecimento"))),
  },
  {
    id: "massa",
    title: "Receitas para Ganho de Massa",
    desc: "Alta densidade calórica e proteica.",
    icon: Flame,
    action: () => downloadRecipesCollection("Receitas para Ganho de Massa", "Densidade calórica e proteica", filterByCat((r) => r.caloriesNum >= 450 || r.goals.includes("ganho-massa"))),
  },
  {
    id: "vegetarianas",
    title: "Receitas Vegetarianas",
    desc: "Pratos sem carne, ricos em sabor.",
    icon: Leaf,
    action: () => downloadRecipesCollection("Receitas Vegetarianas", "Sem carne", filterByCat((r) => r.restrictions.includes("vegetariana") || r.restrictions.includes("vegana"))),
  },
  {
    id: "lowcarb",
    title: "Receitas Low Carb",
    desc: "Menos carboidratos, mais nutrientes.",
    icon: Salad,
    action: () => downloadRecipesCollection("Receitas Low Carb", "Baixo carboidrato", filterByCat((r) => r.restrictions.includes("low-carb") || r.carbs <= 20)),
  },
  {
    id: "airfryer",
    title: "Receitas para Air Fryer",
    desc: "Crocantes com pouco óleo.",
    icon: ChefHat,
    action: () => downloadRecipesCollection("Receitas para Air Fryer", "Preparo em airfryer", filterByCat((r) => r.tags.some((t) => /air ?fryer/i.test(t)) || /air ?fryer/i.test(r.nome))),
  },
  {
    id: "sobremesas",
    title: "Sobremesas Saudáveis",
    desc: "Doces sem culpa.",
    icon: Cookie,
    action: () => downloadRecipesCollection("Sobremesas Saudáveis", "Doces fit e leves", filterByCat((r) => r.category === "sobremesa")),
  },
  {
    id: "cafe",
    title: "Café da Manhã Saudável",
    desc: "Comece o dia com energia.",
    icon: Sun,
    action: () => downloadRecipesCollection("Café da Manhã Saudável", "Para começar bem o dia", filterByCat((r) => r.category === "cafe-da-manha")),
  },
  {
    id: "marmitas",
    title: "Marmitas Fit",
    desc: "Práticas para levar para o trabalho.",
    icon: Utensils,
    action: () => downloadRecipesCollection("Marmitas Fit", "Fáceis de transportar e reaquecer", filterByCat((r) => r.category === "almoco" && r.timeMinutes <= 45)),
  },
];

export default function Library() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { made } = useMadeRecipes();
  const [busy, setBusy] = useState<string | null>(null);

  const favoriteRecipes = useMemo(
    () => enrichedRecipes.filter((r) => favorites.includes(r.id)),
    [favorites],
  );

  const madeRecipes = useMemo(
    () => enrichedRecipes.filter((r) => made.includes(r.id)),
    [made],
  );

  const loadPlan = async () => {
    if (!user) return null;
    const { data } = await supabase
      .from("nutri_plans")
      .select("form_data, plan")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!data) return null;
    return {
      form: data.form_data as unknown as NutriForm,
      plan: data.plan as unknown as NutriPlan,
    };
  };

  const handle = async (c: Cat) => {
    if (c.needsAuth && !user) {
      toast.error("Entre na sua conta para baixar este PDF.");
      return;
    }
    setBusy(c.id);
    try {
      await c.action({ favorites: favoriteRecipes, made: madeRecipes, loadPlan });
    } catch (e) {
      toast.error((e as Error).message || "Não foi possível gerar o PDF.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Biblioteca Viva Leve — PDFs de receitas, cardápios e relatórios"
        description="Baixe em PDF seu relatório nutricional, cardápio semanal, lista de compras e coleções de receitas Viva Leve."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-14">
          <div className="container mx-auto px-4 text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/20 px-4 py-2 backdrop-blur">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Biblioteca Viva Leve</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
              Baixe seus conteúdos em PDF
            </h1>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto">
              Cada categoria gera um PDF separado, pronto para levar para a cozinha, o mercado ou a academia.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {!user && (
              <Card className="mb-6 border-primary/40 bg-primary/5">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <p className="text-sm">
                    <strong>Entre na sua conta</strong> para baixar seu relatório, cardápio e lista de compras personalizados.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/auth"><LogIn className="h-4 w-4 mr-1" /> Entrar</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATS.map((c) => {
                const Icon = c.icon;
                const loading = busy === c.id;
                return (
                  <Card key={c.id} className="group hover:shadow-hover transition-all hover:-translate-y-0.5">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-xl bg-primary/10 p-2.5">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {c.needsAuth && <Badge variant="outline" className="text-xs">Requer login</Badge>}
                      </div>
                      <div>
                        <h2 className="font-heading font-semibold text-lg">{c.title}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                      </div>
                      <Button
                        onClick={() => handle(c)}
                        disabled={loading}
                        className="w-full gap-2"
                        variant="outline"
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                        Baixar PDF
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
