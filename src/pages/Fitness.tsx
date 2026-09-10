import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, Heart, Sparkles, Check, ExternalLink, Play, Trash2, Save } from "lucide-react";
import { fitness } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  generateWorkout,
  findSimilar,
  GOALS,
  LEVELS,
  REGIONS,
  PLACES,
  EQUIPMENTS,
  PLACE_EQUIPMENT,
  youtubeSearchUrl,
  type Equipment,
  type WorkoutExercise,
  type WorkoutGoal,
  type WorkoutLevel,
  type WorkoutPlace,
  type WorkoutRegion,
} from "@/data/workouts";
import { useWorkoutLogs } from "@/hooks/useWorkoutLogs";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";

const Fitness = () => {
  const iconMap: { [key: string]: any } = {
    "HIIT (Alta Performance)": Dumbbell,
    "Yoga / Pilates (Equilíbrio e Força)": Heart,
    "Corrida Leve / Caminhada": Sparkles,
  };
  const { user } = useAuth();
  const { workouts, save, updateExercises, remove } = useWorkoutLogs();
  const [goal, setGoal] = useState<WorkoutGoal>("condicionamento");
  const [region, setRegion] = useState<WorkoutRegion>("corpo-inteiro");
  const [level, setLevel] = useState<WorkoutLevel>("iniciante");
  const [place, setPlace] = useState<WorkoutPlace>("livre");
  const [equipment, setEquipment] = useState<Equipment[]>(PLACE_EQUIPMENT.livre);
  const [todayWorkout, setTodayWorkout] = useState<WorkoutExercise[] | null>(null);
  const [todayLogId, setTodayLogId] = useState<string | null>(null);

  const completed = useMemo(() => todayWorkout?.filter((exercise) => exercise.done).length ?? 0, [todayWorkout]);

  const changePlace = (value: WorkoutPlace) => {
    setPlace(value);
    setEquipment(PLACE_EQUIPMENT[value]);
  };

  const toggleEquipment = (value: Equipment, checked: boolean) => {
    setEquipment((current) => (checked ? [...current, value] : current.filter((item) => item !== value)));
  };

  const generate = () => {
    setTodayWorkout(generateWorkout(goal, region, level, place, equipment));
    setTodayLogId(null);
  };

  const replaceExercise = async (index: number) => {
    if (!todayWorkout) return;
    const current = todayWorkout[index];
    const similar = findSimilar(
      current,
      equipment.length > 0 ? equipment : PLACE_EQUIPMENT[place],
      todayWorkout.map((exercise) => exercise.name),
    );
    if (!similar) {
      toast.info("Não encontramos outro exercício equivalente com os equipamentos disponíveis.");
      return;
    }
    const next = todayWorkout.map((exercise, i) =>
      i === index
        ? { ...similar, sets: exercise.sets, reps: exercise.reps, rest: exercise.rest, done: false, replacedFor: current.name }
        : exercise,
    );
    setTodayWorkout(next);
    if (todayLogId) await updateExercises(todayLogId, next);
  };


  const toggleExercise = async (index: number, checked: boolean) => {
    if (!todayWorkout) return;
    const next = todayWorkout.map((exercise, i) => (i === index ? { ...exercise, done: checked } : exercise));
    setTodayWorkout(next);
    if (todayLogId) await updateExercises(todayLogId, next);
  };

  const saveWorkout = async () => {
    if (!todayWorkout) return;
    if (!user) {
      toast.info("Entre na sua conta para salvar o histórico de treinos.");
      return;
    }
    const log = await save(goal, region, level, todayWorkout);
    if (log) {
      setTodayLogId(log.id);
      toast.success("Treino salvo no seu histórico.");
    } else {
      toast.error("Não foi possível salvar o treino.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Fitness e Movimento" description="Treinos acessíveis e personalizados para cuidar do corpo com leveza." />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Fitness e Movimento</h1>
              <p className="text-lg text-primary-foreground/90">Encontre prazer no exercício físico e torne o movimento parte natural da sua rotina</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center space-y-3">
              <Badge className="bg-primary/10 text-primary border-0"><Dumbbell className="h-4 w-4 mr-2" /> Treino de hoje</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">Monte um treino para o seu momento</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Escolha uma combinação e receba exercícios com execução, descanso e cuidados básicos.</p>
            </div>

            <Card>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2"><Label>Objetivo</Label><Select value={goal} onValueChange={(value) => setGoal(value as WorkoutGoal)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{GOALS.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2"><Label>Região do corpo</Label><Select value={region} onValueChange={(value) => setRegion(value as WorkoutRegion)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{REGIONS.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2"><Label>Nível</Label><Select value={level} onValueChange={(value) => setLevel(value as WorkoutLevel)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{LEVELS.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2 md:col-span-3"><Label>Tipo de treino</Label><Select value={place} onValueChange={(value) => changePlace(value as WorkoutPlace)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PLACES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2 md:col-span-3">
                  <Label>Equipamentos disponíveis</Label>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {EQUIPMENTS.map((item) => (
                      <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={equipment.includes(item.value)} onCheckedChange={(checked) => toggleEquipment(item.value, checked === true)} aria-label={item.label} />
                        {item.label}
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Se faltar algum aparelho, trocamos por um exercício similar para a mesma região e objetivo.</p>
                </div>
                <Button onClick={generate} className="md:col-span-3"><Sparkles className="h-4 w-4 mr-2" /> Gerar treino</Button>
              </CardContent>
            </Card>

            {todayWorkout && (
              <Card className="border-primary/30">
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <div><CardTitle className="font-heading">Treino de hoje</CardTitle><p className="text-sm text-muted-foreground mt-1">{completed} de {todayWorkout.length} exercícios concluídos</p></div>
                  <Button variant="outline" onClick={saveWorkout} disabled={Boolean(todayLogId)}><Save className="h-4 w-4 mr-2" /> {todayLogId ? "Salvo" : "Salvar histórico"}</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={(completed / todayWorkout.length) * 100} />
                  {todayWorkout.map((exercise, index) => (
                    <div key={`${exercise.name}-${index}`} className="border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox checked={Boolean(exercise.done)} onCheckedChange={(checked) => toggleExercise(index, checked === true)} aria-label={`Marcar ${exercise.name} como concluído`} className="mt-1" />
                        <div className="flex-1"><h3 className={`font-semibold ${exercise.done ? "line-through text-muted-foreground" : ""}`}>{exercise.name}</h3><p className="text-sm text-muted-foreground mt-1">{exercise.sets} séries · {exercise.reps} · descanso de {exercise.rest}</p>{exercise.replacedFor && <p className="text-xs text-primary mt-1">Exercício similar, no lugar de {exercise.replacedFor}</p>}</div>
                        <Button asChild variant="ghost" size="icon" aria-label={`Pesquisar demonstração de ${exercise.name}`} title="Pesquisar demonstração no YouTube"><a href={exercise.video || youtubeSearchUrl(exercise.name)} target="_blank" rel="noreferrer"><Play className="h-4 w-4" /></a></Button>
                      </div>
                      <div className="pl-7 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"><p><strong>Execução:</strong> {exercise.execution}</p><p><strong>Cuidados:</strong> {exercise.care}</p></div>
                      <div className="pl-7 flex flex-wrap items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => replaceExercise(index)}>Trocar por exercício similar</Button>
                        {!exercise.video && <span className="text-xs text-muted-foreground">Pesquisar demonstração no YouTube</span>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {workouts.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="font-heading">Histórico de treinos</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {workouts.slice(0, 5).map((workout) => {
                    const done = workout.exercises.filter((exercise) => exercise.done).length;
                    return <div key={workout.id} className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0"><div><p className="font-medium">{new Date(`${workout.log_date}T12:00:00`).toLocaleDateString("pt-BR")}</p><p className="text-sm text-muted-foreground">{GOALS.find((item) => item.value === workout.objetivo)?.label} · {done}/{workout.exercises.length} concluídos</p></div><Button variant="ghost" size="icon" aria-label="Remover treino do histórico" onClick={() => remove(workout.id)}><Trash2 className="h-4 w-4" /></Button></div>;
                  })}
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10 space-y-3"><h2 className="font-heading text-3xl md:text-4xl font-bold">Treinos recomendados</h2><p className="text-muted-foreground text-lg">Treinos práticos e eficientes para todos os níveis</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{fitness.map((item, index) => { const Icon = iconMap[item.treino] || Dumbbell; return <Card key={index} className="border-none shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"><CardContent className="p-6 space-y-4"><div className="inline-flex rounded-full bg-accent p-3"><Icon className="h-6 w-6 text-accent-foreground" /></div><h3 className="font-heading text-xl font-semibold">{item.treino}</h3><div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /><span>{item.duracao}</span></div><p className="text-muted-foreground leading-relaxed">{item.beneficios}</p><div className="pt-3 border-t border-border"><p className="text-sm font-medium text-foreground mb-1">Combinação alimentar:</p><p className="text-sm text-muted-foreground">{item.combinacao_alimentar}</p></div></CardContent></Card>; })}</div>
          </div>
        </section>

        <section className="py-16"><div className="container mx-auto px-4 max-w-3xl"><h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">Dicas para começar</h2><div className="space-y-4">{["Comece devagar", "Hidrate-se bem", "Nutrição é fundamental", "Descanse adequadamente"].map((title) => <Card key={title} className="border-none shadow-card"><CardContent className="p-6"><h3 className="font-heading text-lg font-semibold mb-2">{title}</h3><p className="text-muted-foreground">Respeite seu ritmo, observe seu corpo e construa uma rotina possível de manter.</p></CardContent></Card>)}</div><div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3"><Button asChild variant="outline"><Link to="/alimentacao-e-treino">Alimentação e treino</Link></Button><Button asChild variant="outline"><Link to="/bem-estar">Bem-estar e mente</Link></Button><Button asChild variant="outline"><Link to="/receitas">Receitas para o treino</Link></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default Fitness;
