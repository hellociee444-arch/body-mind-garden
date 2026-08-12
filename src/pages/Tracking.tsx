import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import RequireAccount from "@/components/RequireAccount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useMealLogs, MEAL_TYPES, toISODate } from "@/hooks/useMealLogs";
import { useNutriPlan } from "@/hooks/useNutriPlan";
import { ChevronLeft, ChevronRight, CalendarDays, Save, Check } from "lucide-react";
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

const formatLong = (d: Date) =>
  d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

export default function Tracking() {
  const { user } = useAuth();
  const [date, setDate] = useState(() => new Date());
  const iso = toISODate(date);
  const { logs, saveMeal, getMeal } = useMealLogs(iso);
  const { plan } = useNutriPlan();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const shift = (days: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    setDate(next);
  };

  const isToday = iso === toISODate(new Date());
  const weekday = WEEKDAYS[date.getDay()];

  /** Sugestão do cardápio salvo para o dia da semana atual, quando existir. */
  const suggestions = useMemo(() => {
    const map: Record<string, string> = {};
    const day = plan?.cardapio?.find((d) =>
      d.dia.toLowerCase().startsWith(weekday.toLowerCase().slice(0, 5)),
    );
    if (!day) return map;
    for (const meal of day.refeicoes) {
      const match = MEAL_TYPES.find((m) =>
        meal.nome.toLowerCase().includes(m.toLowerCase().split(" ")[0]),
      );
      map[match ?? "Outras refeições"] = meal.descricao;
    }
    return map;
  }, [plan, weekday]);

  const doneCount = logs.filter((l) => l.done).length;

  const handleSaveEaten = async (meal: string) => {
    await saveMeal(meal, { eaten: drafts[meal] ?? "" });
    toast.success("Registro salvo. Obrigado por acompanhar sua rotina.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Acompanhamento alimentar — Viva Leve"
        description="Registre suas refeições do dia com leveza e acompanhe sua rotina alimentar sem julgamentos."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-10">
          <div className="container mx-auto px-4 max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
              <CalendarDays className="h-4 w-4" /> Acompanhamento
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold">Minhas refeições</h1>
            <p className="text-sm text-muted-foreground">
              Registre o que você comeu de verdade. Sem cobrança, sem culpa — só organização da sua rotina.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 max-w-3xl space-y-5">
          {!user && <RequireAccount message="Entre na sua conta para salvar seus registros de refeições." />}

          <Card>
            <CardContent className="p-4 flex items-center justify-between gap-2">
              <Button variant="ghost" size="icon" aria-label="Dia anterior" onClick={() => shift(-1)}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="text-center">
                <p className="font-heading font-semibold">{isToday ? "Hoje" : weekday}</p>
                <p className="text-xs text-muted-foreground">{formatLong(date)}</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Dia seguinte" onClick={() => shift(1)}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {user && (
            <p className="text-sm text-muted-foreground">
              {doneCount > 0
                ? `${doneCount} de ${MEAL_TYPES.length} refeições marcadas como realizadas.`
                : "Tudo bem. Registre o que você comeu e continue sua rotina."}
            </p>
          )}

          <div className="space-y-3">
            {MEAL_TYPES.map((meal) => {
              const log = getMeal(meal);
              const value = drafts[meal] ?? log?.eaten ?? "";
              return (
                <Card key={meal} className="transition-all hover:shadow-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">{meal}</CardTitle>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox
                          checked={!!log?.done}
                          disabled={!user}
                          onCheckedChange={(v) => saveMeal(meal, { done: !!v })}
                          aria-label={`Marcar ${meal} como realizada`}
                        />
                        <span className="text-muted-foreground">Realizada</span>
                      </label>
                    </div>
                    {suggestions[meal] && (
                      <p className="text-xs text-muted-foreground pt-1">
                        <Badge variant="outline" className="mr-1">
                          Sugestão do seu cardápio
                        </Badge>
                        {suggestions[meal]}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Textarea
                      placeholder="O que você comeu nesta refeição?"
                      value={value}
                      disabled={!user}
                      maxLength={500}
                      onChange={(e) => setDrafts((d) => ({ ...d, [meal]: e.target.value }))}
                      className="min-h-[64px]"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        {log?.eaten ? (
                          <span className="inline-flex items-center gap-1 text-primary">
                            <Check className="h-3 w-3" /> registro salvo
                          </span>
                        ) : (
                          "Opcional"
                        )}
                      </span>
                      <Button size="sm" variant="outline" disabled={!user} onClick={() => handleSaveEaten(meal)}>
                        <Save className="h-4 w-4 mr-1" /> Salvar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
