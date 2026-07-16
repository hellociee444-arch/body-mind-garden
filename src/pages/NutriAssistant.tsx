import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Sparkles, Loader2, RefreshCw, Droplets, Flame } from "lucide-react";

interface Form {
  idade: string;
  sexo: string;
  altura: string;
  peso: string;
  objetivo: string;
  atividade: string;
  rotina: string;
  preferencias: string;
  restricoes: string[];
  alergias: string;
  condicoes: string;
}

interface Meal { nome: string; descricao: string; calorias: number }
interface Day { dia: string; refeicoes: Meal[] }
interface Plan {
  resumo: string;
  hidratacao_ml: number;
  calorias_alvo: number;
  cardapio: Day[];
  lista_compras: string[];
  orientacoes: string[];
  disclaimer: string;
}

const RESTRICOES = ["Vegana", "Vegetariana", "Sem glúten", "Sem lactose", "Low carb"];

const initial: Form = {
  idade: "", sexo: "", altura: "", peso: "",
  objetivo: "", atividade: "", rotina: "", preferencias: "",
  restricoes: [], alergias: "", condicoes: "",
};

export default function NutriAssistant() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initial);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);

  const steps = ["Perfil", "Objetivo", "Preferências", "Saúde"];

  const canNext = () => {
    if (step === 0) return form.idade && form.sexo && form.altura && form.peso;
    if (step === 1) return form.objetivo && form.atividade;
    return true;
  };

  const toggleRestr = (r: string) =>
    setForm((f) => ({
      ...f,
      restricoes: f.restricoes.includes(r) ? f.restricoes.filter((x) => x !== r) : [...f.restricoes, r],
    }));

  const submit = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("nutri-assistant", {
        body: {
          idade: parseInt(form.idade),
          sexo: form.sexo,
          altura: parseFloat(form.altura),
          peso: parseFloat(form.peso),
          objetivo: form.objetivo,
          atividade: form.atividade,
          rotina: form.rotina,
          preferencias: form.preferencias,
          restricoes: form.restricoes,
          alergias: form.alergias,
          condicoes: form.condicoes,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setPlan(data as Plan);
      toast.success("Seu plano está pronto!");
    } catch (e) {
      toast.error((e as Error).message || "Não foi possível gerar o plano.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPlan(null);
    setForm(initial);
    setStep(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Nutri Assistente — Cardápio Personalizado com IA"
        description="Responda algumas perguntas e receba um cardápio semanal completo, com lista de compras e orientações personalizadas."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-12">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <Badge className="mb-3 bg-primary/15 text-primary border-0">
              <Sparkles className="h-3 w-3 mr-1" /> Inteligência Artificial
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
              Nutri Assistente
            </h1>
            <p className="text-muted-foreground">
              Um cardápio semanal criado para você, respeitando suas restrições, rotina e objetivos.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 max-w-3xl">
          {!plan ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>{steps[step]}</CardTitle>
                  <span className="text-sm text-muted-foreground">Etapa {step + 1} de {steps.length}</span>
                </div>
                <Progress value={((step + 1) / steps.length) * 100} />
              </CardHeader>
              <CardContent className="space-y-4">
                {step === 0 && (
                  <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    <div><Label>Idade</Label><Input type="number" value={form.idade} onChange={(e) => setForm({ ...form, idade: e.target.value })} placeholder="30" /></div>
                    <div>
                      <Label>Sexo</Label>
                      <Select value={form.sexo} onValueChange={(v) => setForm({ ...form, sexo: v })}>
                        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feminino">Feminino</SelectItem>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label>Altura (cm)</Label><Input type="number" value={form.altura} onChange={(e) => setForm({ ...form, altura: e.target.value })} placeholder="170" /></div>
                    <div><Label>Peso (kg)</Label><Input type="number" value={form.peso} onChange={(e) => setForm({ ...form, peso: e.target.value })} placeholder="70" /></div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <Label>Objetivo</Label>
                      <Select value={form.objetivo} onValueChange={(v) => setForm({ ...form, objetivo: v })}>
                        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emagrecer">Emagrecer</SelectItem>
                          <SelectItem value="manter">Manter o peso</SelectItem>
                          <SelectItem value="ganhar">Ganhar massa muscular</SelectItem>
                          <SelectItem value="saude">Melhorar a saúde geral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Nível de atividade física</Label>
                      <Select value={form.atividade} onValueChange={(v) => setForm({ ...form, atividade: v })}>
                        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentario">Sedentário</SelectItem>
                          <SelectItem value="leve">Leve (1-3x/sem)</SelectItem>
                          <SelectItem value="moderado">Moderado (3-5x/sem)</SelectItem>
                          <SelectItem value="intenso">Intenso (6-7x/sem)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Como é sua rotina?</Label>
                      <Textarea value={form.rotina} onChange={(e) => setForm({ ...form, rotina: e.target.value })} placeholder="Trabalho fora, treino de manhã..." rows={2} />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <Label className="mb-2 block">Restrições alimentares</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {RESTRICOES.map((r) => (
                          <label key={r} className="flex items-center gap-2 p-2 rounded-md border border-border cursor-pointer hover:bg-accent/30 transition-colors">
                            <Checkbox checked={form.restricoes.includes(r)} onCheckedChange={() => toggleRestr(r)} />
                            <span className="text-sm">{r}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Preferências ou aversões</Label>
                      <Textarea value={form.preferencias} onChange={(e) => setForm({ ...form, preferencias: e.target.value })} placeholder="Não gosto de peixe, adoro frutas..." rows={2} />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <Label>Alergias ou intolerâncias</Label>
                      <Input value={form.alergias} onChange={(e) => setForm({ ...form, alergias: e.target.value })} placeholder="Ex.: lactose, amendoim" />
                    </div>
                    <div>
                      <Label>Condições de saúde</Label>
                      <Textarea value={form.condicoes} onChange={(e) => setForm({ ...form, condicoes: e.target.value })} placeholder="Ex.: diabetes, hipertensão, gastrite" rows={3} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      As informações não substituem uma consulta com nutricionista ou médico.
                    </p>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || loading}>
                    <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
                  </Button>
                  {step < steps.length - 1 ? (
                    <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
                      Continuar <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button onClick={submit} disabled={loading} className="bg-gradient-accent">
                      {loading ? <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Gerando...</> : <><Sparkles className="h-4 w-4 mr-1" /> Gerar meu plano</>}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <Card className="bg-gradient-accent text-primary-foreground">
                <CardContent className="p-6">
                  <p className="text-sm opacity-90 mb-2">Seu plano personalizado</p>
                  <p className="font-heading text-xl font-bold mb-4">{plan.resumo}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/15 rounded-lg p-3 flex items-center gap-2">
                      <Flame className="h-5 w-5" />
                      <div>
                        <p className="text-xs opacity-80">Meta calórica</p>
                        <p className="font-bold">{plan.calorias_alvo} kcal</p>
                      </div>
                    </div>
                    <div className="bg-white/15 rounded-lg p-3 flex items-center gap-2">
                      <Droplets className="h-5 w-5" />
                      <div>
                        <p className="text-xs opacity-80">Hidratação</p>
                        <p className="font-bold">{(plan.hidratacao_ml / 1000).toFixed(1)} L/dia</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="cardapio">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="cardapio">Cardápio</TabsTrigger>
                  <TabsTrigger value="compras">Compras</TabsTrigger>
                  <TabsTrigger value="orient">Orientações</TabsTrigger>
                </TabsList>

                <TabsContent value="cardapio" className="space-y-4 mt-4">
                  {plan.cardapio?.map((d) => (
                    <Card key={d.dia}>
                      <CardHeader className="pb-2"><CardTitle className="text-lg text-primary">{d.dia}</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        {d.refeicoes?.map((m, i) => (
                          <div key={i} className="border-l-2 border-primary/40 pl-3 py-1">
                            <p className="text-sm font-medium flex justify-between">
                              <span>{m.nome}</span>
                              <span className="text-muted-foreground text-xs">{m.calorias} kcal</span>
                            </p>
                            <p className="text-sm text-muted-foreground">{m.descricao}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="compras" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {plan.lista_compras?.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orient" className="mt-4">
                  <Card>
                    <CardContent className="p-6 space-y-3">
                      {plan.orientacoes?.map((o, i) => (
                        <p key={i} className="text-sm flex gap-2">
                          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {o}
                        </p>
                      ))}
                      {plan.disclaimer && (
                        <p className="text-xs text-muted-foreground italic border-t pt-3 mt-3">{plan.disclaimer}</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="text-center">
                <Button variant="outline" onClick={reset}>
                  <RefreshCw className="h-4 w-4 mr-1" /> Refazer questionário
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
