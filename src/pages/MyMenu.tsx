import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import RequireAccount from "@/components/RequireAccount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNutriPlan } from "@/hooks/useNutriPlan";
import { useMealLogs, MEAL_TYPES, toISODate } from "@/hooks/useMealLogs";
import { useShoppingList } from "@/hooks/useShoppingList";
import { enrichedRecipes } from "@/data/enrichedRecipes";
import { downloadWeeklyMenu } from "@/lib/pdf";
import { Download, Utensils, ShoppingBasket, Repeat, Loader2 } from "lucide-react";
import { toast } from "sonner";

const WEEKDAYS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

/** Sugere receitas equivalentes do acervo, com base em palavras da refeição. */
function equivalentRecipes(description: string) {
  const words = description
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z]+/)
    .filter((w) => w.length > 4);
  const scored = enrichedRecipes
    .map((r) => {
      const hay = `${r.nome} ${r.tags.join(" ")}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const score = words.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
      return { r, score };
    })
    .sort((a, b) => b.score - a.score);
  const matches = scored.filter((s) => s.score > 0).slice(0, 4);
  return (matches.length ? matches : scored.slice(0, 4)).map((s) => s.r);
}

export default function MyMenu() {
  const { user } = useAuth();
  const { plan, loading } = useNutriPlan();
  const today = new Date();
  const iso = toISODate(today);
  const { getMeal, saveMeal } = useMealLogs(iso);
  const { items: shoppingItems } = useShoppingList();
  const [importing, setImporting] = useState(false);

  const todayName = WEEKDAYS[today.getDay()];

  const todayPlan = useMemo(
    () =>
      plan?.cardapio?.find((d) =>
        d.dia.toLowerCase().startsWith(todayName.toLowerCase().slice(0, 5)),
      ) ?? plan?.cardapio?.[0],
    [plan, todayName],
  );

  const mealTypeFor = (nome: string) =>
    MEAL_TYPES.find((m) => nome.toLowerCase().includes(m.toLowerCase().split(" ")[0])) ??
    "Outras refeições";

  const handleGenerateList = async () => {
    if (!plan?.lista_compras?.length) {
      toast.info("Gere seu cardápio com a NutriA para criar a lista automaticamente.");
      return;
    }
    setImporting(true);
    const added = await addMany(plan.lista_compras);
    setImporting(false);
    toast.success(
      added > 0
        ? `${added} itens adicionados à sua lista de compras.`
        : "Sua lista já contém esses itens.",
    );
  };

  const MealRow = ({ nome, descricao, calorias }: { nome: string; descricao: string; calorias: number }) => {
    const mealType = mealTypeFor(nome);
    const log = getMeal(mealType);
    const options = equivalentRecipes(descricao);
    return (
      <div className="border-l-2 border-primary/40 pl-3 py-2 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-sm">{nome}</p>
            <p className="text-sm text-muted-foreground">{descricao}</p>
            <p className="text-xs text-muted-foreground">≈ {calorias} kcal (estimativa)</p>
          </div>
          {user && (
            <label className="flex items-center gap-2 text-xs shrink-0 cursor-pointer">
              <Checkbox
                checked={!!log?.done}
                onCheckedChange={(v) => saveMeal(mealType, { done: !!v, planned: descricao })}
                aria-label={`Marcar ${nome} como realizada`}
              />
              <span className="text-muted-foreground">Feita</span>
            </label>
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <Repeat className="h-3 w-3 mr-1" /> Trocar por opção equivalente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Opções equivalentes</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Escolha uma receita do acervo Viva Leve com perfil parecido para esta refeição.
            </p>
            <ul className="space-y-2">
              {options.map((r) => (
                <li key={r.id}>
                  <Link
                    to={`/receita/${r.id}`}
                    className="flex items-center justify-between gap-3 rounded-lg border p-2 hover:bg-accent/40 transition-colors"
                  >
                    <span className="text-sm">{r.nome}</span>
                    <Badge variant="outline" className="text-xs">
                      {r.calories}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Meu Cardápio — Viva Leve"
        description="Visualize seu cardápio por dia, semana e refeição, marque o que já foi feito e gere sua lista de compras."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-10">
          <div className="container mx-auto px-4 max-w-4xl space-y-2">
            <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
              <Utensils className="h-4 w-4" /> Meu Cardápio
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold">Seu planejamento alimentar</h1>
            <p className="text-sm text-muted-foreground">
              Uma orientação prática para organizar a semana. Cardápios individualizados devem ser elaborados por
              um nutricionista — a NutriA é um apoio educativo, não uma substituta.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 max-w-4xl space-y-5">
          {!user && <RequireAccount message="Entre na sua conta para salvar e acompanhar seu cardápio." />}

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : !plan?.cardapio?.length ? (
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Você ainda não tem um cardápio salvo. Faça sua avaliação com a NutriA para gerar um planejamento
                  inicial.
                </p>
                <Button asChild>
                  <Link to="/nutri-assistente">Gerar meu cardápio</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => downloadWeeklyMenu(plan)}>
                  <Download className="h-4 w-4 mr-1" /> Baixar cardápio em PDF
                </Button>
                <Button variant="outline" onClick={handleDownloadList}>
                  <Download className="h-4 w-4 mr-1" /> Baixar lista de compras em PDF
                </Button>
                <Button asChild variant="outline">
                  <Link to="/lista-de-compras">
                    <ShoppingBasket className="h-4 w-4 mr-1" /> Abrir minha lista de compras
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/receitas">Buscar receitas</Link>
                </Button>
              </div>

              <Tabs defaultValue="dia">
                <TabsList>
                  <TabsTrigger value="dia">Hoje</TabsTrigger>
                  <TabsTrigger value="semana">Semana</TabsTrigger>
                  <TabsTrigger value="refeicao">Por refeição</TabsTrigger>
                </TabsList>

                <TabsContent value="dia" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{todayPlan?.dia ?? todayName}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      {todayPlan?.refeicoes.map((m, i) => (
                        <MealRow key={i} {...m} />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="semana" className="mt-4 space-y-4">
                  {plan.cardapio.map((d) => (
                    <Card key={d.dia}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-primary">{d.dia}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1">
                        {d.refeicoes.map((m, i) => (
                          <div key={i} className="border-l-2 border-primary/30 pl-3 py-1">
                            <p className="text-sm font-medium">{m.nome}</p>
                            <p className="text-sm text-muted-foreground">{m.descricao}</p>
                            <p className="text-xs text-muted-foreground">≈ {m.calorias} kcal</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="refeicao" className="mt-4 space-y-4">
                  {MEAL_TYPES.map((mt) => {
                    const rows = plan.cardapio.flatMap((d) =>
                      d.refeicoes
                        .filter((m) => mealTypeFor(m.nome) === mt)
                        .map((m) => ({ dia: d.dia, ...m })),
                    );
                    if (!rows.length) return null;
                    return (
                      <Card key={mt}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{mt}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                          {rows.map((r, i) => (
                            <div key={i} className="text-sm">
                              <span className="font-medium text-primary">{r.dia}: </span>
                              <span className="text-muted-foreground">{r.descricao}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    );
                  })}
                </TabsContent>
              </Tabs>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
