import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import RequireAccount from "@/components/RequireAccount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useMeasurements } from "@/hooks/useMeasurements";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Plus, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const num = (v: string) => (v.trim() === "" ? null : Number(v.replace(",", ".")));

export default function Progress() {
  const { user } = useAuth();
  const { measurements, add, remove } = useMeasurements();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [arm, setArm] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdd = async () => {
    const values = [weight, waist, hip, arm].map(num);
    if (values.every((v) => v === null) && !notes.trim()) {
      toast.info("Preencha ao menos um valor ou uma observação.");
      return;
    }
    if (values.some((v) => v !== null && (Number.isNaN(v) || v! <= 0 || v! > 500))) {
      toast.error("Confira os valores informados.");
      return;
    }
    const res = await add({
      measured_at: date,
      weight: values[0],
      waist: values[1],
      hip: values[2],
      arm: values[3],
      notes: notes.trim() || null,
    });
    if (res?.error) return toast.error(res.error);
    setWeight(""); setWaist(""); setHip(""); setArm(""); setNotes("");
    toast.success("Registro salvo.");
  };

  const chartData = measurements
    .filter((m) => m.weight != null)
    .map((m) => ({
      data: new Date(`${m.measured_at}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      peso: Number(m.weight),
    }));

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Medidas e evolução — Viva Leve"
        description="Registre suas medidas quando fizer sentido e acompanhe sua evolução de forma simples e respeitosa."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-10">
          <div className="container mx-auto px-4 max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
              <TrendingUp className="h-4 w-4" /> Medidas e evolução
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold">Acompanhe seus registros</h1>
            <p className="text-sm text-muted-foreground">
              Registre apenas o que fizer sentido para você. Números são informação de acompanhamento — não medem o
              seu valor.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 max-w-3xl space-y-5">
          {!user && <RequireAccount message="Entre na sua conta para salvar suas medidas com segurança." />}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Novo registro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="data">Data</Label>
                  <Input id="data" type="date" value={date} disabled={!user} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input id="peso" inputMode="decimal" value={weight} disabled={!user} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cintura">Cintura (cm)</Label>
                  <Input id="cintura" inputMode="decimal" value={waist} disabled={!user} onChange={(e) => setWaist(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="quadril">Quadril (cm)</Label>
                  <Input id="quadril" inputMode="decimal" value={hip} disabled={!user} onChange={(e) => setHip(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="braco">Braço (cm)</Label>
                  <Input id="braco" inputMode="decimal" value={arm} disabled={!user} onChange={(e) => setArm(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="obs">Observações</Label>
                <Textarea id="obs" maxLength={400} value={notes} disabled={!user} onChange={(e) => setNotes(e.target.value)} placeholder="Como você se sentiu nesta semana?" />
              </div>
              <Button onClick={handleAdd} disabled={!user}>
                <Plus className="h-4 w-4 mr-1" /> Salvar registro
              </Button>
            </CardContent>
          </Card>

          {chartData.length > 1 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Evolução do peso registrado</CardTitle>
              </CardHeader>
              <CardContent className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="data" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={["dataMin - 2", "dataMax + 2"]} fontSize={11} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line type="monotone" dataKey="peso" stroke="hsl(var(--primary))" strokeWidth={2} dot />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Histórico</CardTitle>
            </CardHeader>
            <CardContent>
              {measurements.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum registro ainda.</p>
              ) : (
                <ul className="divide-y">
                  {[...measurements].reverse().map((m) => (
                    <li key={m.id} className="py-2 flex items-start justify-between gap-3">
                      <div className="text-sm">
                        <p className="font-medium">
                          {new Date(`${m.measured_at}T12:00:00`).toLocaleDateString("pt-BR")}
                        </p>
                        <p className="text-muted-foreground">
                          {[
                            m.weight != null && `peso ${m.weight} kg`,
                            m.waist != null && `cintura ${m.waist} cm`,
                            m.hip != null && `quadril ${m.hip} cm`,
                            m.arm != null && `braço ${m.arm} cm`,
                          ]
                            .filter(Boolean)
                            .join(" • ") || "sem valores"}
                        </p>
                        {m.notes && <p className="text-muted-foreground italic">{m.notes}</p>}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Remover registro" onClick={() => remove(m.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
