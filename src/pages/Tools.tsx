import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Droplets, Flame, Scale, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const num = (v: string) => parseFloat(v.replace(",", "."));

function IMCCalc() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const p = num(peso);
  const a = num(altura) / 100;
  const imc = p && a ? p / (a * a) : 0;
  const classif =
    !imc ? "" :
    imc < 18.5 ? "Abaixo do peso" :
    imc < 25 ? "Peso saudável" :
    imc < 30 ? "Sobrepeso" :
    imc < 35 ? "Obesidade I" :
    imc < 40 ? "Obesidade II" : "Obesidade III";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Peso (kg)</Label><Input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="70" /></div>
        <div><Label>Altura (cm)</Label><Input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="170" /></div>
      </div>
      {imc > 0 && (
        <div className="rounded-lg bg-accent/40 p-4 text-center animate-fade-in">
          <p className="text-3xl font-bold text-primary">{imc.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground mt-1">{classif}</p>
        </div>
      )}
    </div>
  );
}

function TMBCalc() {
  const [sexo, setSexo] = useState("f");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [ativ, setAtiv] = useState("1.55");
  const p = num(peso), a = num(altura), i = num(idade);
  const tmb = p && a && i
    ? sexo === "m"
      ? 10 * p + 6.25 * a - 5 * i + 5
      : 10 * p + 6.25 * a - 5 * i - 161
    : 0;
  const get = tmb * parseFloat(ativ);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Sexo</Label>
          <Select value={sexo} onValueChange={setSexo}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="f">Feminino</SelectItem>
              <SelectItem value="m">Masculino</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Idade</Label><Input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="30" /></div>
        <div><Label>Peso (kg)</Label><Input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="70" /></div>
        <div><Label>Altura (cm)</Label><Input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="170" /></div>
      </div>
      <div>
        <Label>Nível de atividade</Label>
        <Select value={ativ} onValueChange={setAtiv}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1.2">Sedentário</SelectItem>
            <SelectItem value="1.375">Leve (1-3x/sem)</SelectItem>
            <SelectItem value="1.55">Moderado (3-5x/sem)</SelectItem>
            <SelectItem value="1.725">Intenso (6-7x/sem)</SelectItem>
            <SelectItem value="1.9">Muito intenso</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {get > 0 && (
        <div className="rounded-lg bg-accent/40 p-4 text-center animate-fade-in">
          <p className="text-3xl font-bold text-primary">{Math.round(get)} kcal</p>
          <p className="text-sm text-muted-foreground mt-1">
            Gasto energético total · TMB: {Math.round(tmb)} kcal
          </p>
        </div>
      )}
    </div>
  );
}

function WaterCalc() {
  const [peso, setPeso] = useState("");
  const [ativ, setAtiv] = useState("35");
  const p = num(peso);
  const ml = p ? Math.round(p * parseFloat(ativ)) : 0;
  return (
    <div className="space-y-4">
      <div><Label>Peso (kg)</Label><Input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="70" /></div>
      <div>
        <Label>Rotina</Label>
        <Select value={ativ} onValueChange={setAtiv}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Sedentário (30 ml/kg)</SelectItem>
            <SelectItem value="35">Moderado (35 ml/kg)</SelectItem>
            <SelectItem value="45">Ativo (45 ml/kg)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {ml > 0 && (
        <div className="rounded-lg bg-accent/40 p-4 text-center animate-fade-in">
          <p className="text-3xl font-bold text-primary">{(ml / 1000).toFixed(1)} L</p>
          <p className="text-sm text-muted-foreground mt-1">{ml} ml por dia (~{Math.round(ml / 250)} copos)</p>
        </div>
      )}
    </div>
  );
}

function MacroCalc() {
  const [cal, setCal] = useState("");
  const [obj, setObj] = useState("manter");
  const c = num(cal);
  const dist =
    obj === "emagrecer" ? { p: 0.35, c: 0.35, g: 0.30 } :
    obj === "ganhar" ? { p: 0.30, c: 0.45, g: 0.25 } :
    { p: 0.25, c: 0.50, g: 0.25 };
  const prot = c ? Math.round((c * dist.p) / 4) : 0;
  const carb = c ? Math.round((c * dist.c) / 4) : 0;
  const gord = c ? Math.round((c * dist.g) / 9) : 0;

  return (
    <div className="space-y-4">
      <div><Label>Calorias diárias</Label><Input type="number" value={cal} onChange={(e) => setCal(e.target.value)} placeholder="2000" /></div>
      <div>
        <Label>Objetivo</Label>
        <Select value={obj} onValueChange={setObj}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="emagrecer">Emagrecer</SelectItem>
            <SelectItem value="manter">Manter</SelectItem>
            <SelectItem value="ganhar">Ganhar massa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {prot > 0 && (
        <div className="grid grid-cols-3 gap-3 animate-fade-in">
          {[
            { l: "Proteína", v: prot, c: "bg-primary/15" },
            { l: "Carbo", v: carb, c: "bg-accent/50" },
            { l: "Gordura", v: gord, c: "bg-secondary" },
          ].map((m) => (
            <div key={m.l} className={`rounded-lg p-3 text-center ${m.c}`}>
              <p className="text-2xl font-bold text-foreground">{m.v}g</p>
              <p className="text-xs text-muted-foreground">{m.l}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const tools = [
  { id: "imc", label: "IMC", icon: Scale, Comp: IMCCalc, desc: "Índice de Massa Corporal" },
  { id: "tmb", label: "Calorias", icon: Flame, Comp: TMBCalc, desc: "Gasto energético diário" },
  { id: "agua", label: "Água", icon: Droplets, Comp: WaterCalc, desc: "Meta de hidratação" },
  { id: "macros", label: "Macros", icon: Activity, Comp: MacroCalc, desc: "Proteína, carbo e gordura" },
];

export default function Tools() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Ferramentas de Saúde — Calculadoras"
        description="Calcule IMC, gasto calórico, ingestão de água e macronutrientes. Ferramentas gratuitas do Viva Leve."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
              Ferramentas de Saúde
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calcule tudo o que precisa para acompanhar sua jornada — rápido, simples e gratuito.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="imc" className="max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-4 w-full h-auto">
              {tools.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="flex-col gap-1 py-2">
                  <t.icon className="h-4 w-4" />
                  <span className="text-xs">{t.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {tools.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <t.icon className="h-5 w-5 text-primary" /> {t.label}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                  </CardHeader>
                  <CardContent><t.Comp /></CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="max-w-2xl mx-auto mt-8">
            <Card className="bg-gradient-accent text-primary-foreground">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-heading text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> Quer um plano personalizado?
                  </p>
                  <p className="text-sm opacity-90 mt-1">
                    O Nutri Assistente cria seu cardápio semanal com base nesses dados.
                  </p>
                </div>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/nutri-assistente">Começar agora</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
