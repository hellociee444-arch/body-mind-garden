export type WorkoutGoal = "perda-gordura" | "ganho-massa" | "definicao" | "condicionamento";
export type WorkoutRegion =
  | "bracos"
  | "costas"
  | "peito"
  | "ombros"
  | "abdomen"
  | "gluteos"
  | "pernas"
  | "corpo-inteiro";
export type WorkoutLevel = "iniciante" | "intermediario" | "avancado";

export interface Exercise {
  name: string;
  region: WorkoutRegion;
  execution: string;
  care: string;
  /** Link opcional de demonstração (YouTube). */
  video?: string;
}

export interface WorkoutExercise extends Exercise {
  sets: number;
  reps: string;
  rest: string;
  done?: boolean;
}

export const GOALS: { value: WorkoutGoal; label: string }[] = [
  { value: "perda-gordura", label: "Perda de gordura" },
  { value: "ganho-massa", label: "Ganho de massa" },
  { value: "definicao", label: "Definição" },
  { value: "condicionamento", label: "Condicionamento" },
];

export const REGIONS: { value: WorkoutRegion; label: string }[] = [
  { value: "corpo-inteiro", label: "Corpo inteiro" },
  { value: "bracos", label: "Braços" },
  { value: "costas", label: "Costas" },
  { value: "peito", label: "Peito" },
  { value: "ombros", label: "Ombros" },
  { value: "abdomen", label: "Abdômen" },
  { value: "gluteos", label: "Glúteos" },
  { value: "pernas", label: "Pernas" },
];

export const LEVELS: { value: WorkoutLevel; label: string }[] = [
  { value: "iniciante", label: "Iniciante" },
  { value: "intermediario", label: "Intermediário" },
  { value: "avancado", label: "Avançado" },
];

export const EXERCISES: Exercise[] = [
  // Braços
  { name: "Rosca direta com halteres", region: "bracos", execution: "Cotovelos junto ao corpo, suba o peso controlando a subida e a descida.", care: "Evite balançar o tronco para ajudar no movimento." },
  { name: "Tríceps testa ou tríceps banco", region: "bracos", execution: "Mantenha o cotovelo apontado para cima e estenda o braço sem travar a articulação.", care: "Se sentir dor no cotovelo, reduza a carga." },
  { name: "Rosca martelo", region: "bracos", execution: "Punhos neutros (polegar para cima), suba até a altura do peito.", care: "Não use impulso de ombro." },
  // Costas
  { name: "Remada curvada", region: "costas", execution: "Tronco inclinado, coluna neutra, puxe os cotovelos para trás junto às costelas.", care: "Não arredonde a lombar." },
  { name: "Puxada alta ou barra assistida", region: "costas", execution: "Puxe a barra até a linha do peito aproximando as escápulas.", care: "Evite jogar o corpo para trás." },
  { name: "Remada unilateral com halter", region: "costas", execution: "Apoie uma mão no banco e puxe o halter em linha reta.", care: "Mantenha o quadril estável." },
  // Peito
  { name: "Flexão de braços (solo ou joelhos)", region: "peito", execution: "Mãos na largura do peito, desça o corpo em linha reta até 90° de cotovelo.", care: "Não deixe o quadril cair." },
  { name: "Supino reto com halteres", region: "peito", execution: "Desça os halteres na linha do peito e empurre sem travar os cotovelos.", care: "Controle a descida; evite arquear demais a lombar." },
  { name: "Crucifixo", region: "peito", execution: "Braços levemente flexionados, abra até sentir alongar e feche devagar.", care: "Use carga leve para proteger o ombro." },
  // Ombros
  { name: "Desenvolvimento de ombros", region: "ombros", execution: "Empurre os halteres acima da cabeça mantendo o abdômen firme.", care: "Não force se houver dor no ombro." },
  { name: "Elevação lateral", region: "ombros", execution: "Suba os braços até a linha dos ombros com cotovelos levemente flexionados.", care: "Evite subir acima da linha do ombro." },
  { name: "Elevação frontal", region: "ombros", execution: "Suba o halter à frente até a altura dos ombros.", care: "Movimento lento, sem impulso." },
  // Abdômen
  { name: "Prancha isométrica", region: "abdomen", execution: "Apoie antebraços e pontas dos pés, corpo alinhado, abdômen contraído.", care: "Não prenda a respiração." },
  { name: "Abdominal remador", region: "abdomen", execution: "Leve joelhos e tronco ao mesmo tempo em direção ao centro.", care: "Evite puxar a nuca." },
  { name: "Elevação de pernas", region: "abdomen", execution: "Deitado, suba as pernas estendidas e desça devagar sem tocar o chão.", care: "Mantenha a lombar apoiada." },
  // Glúteos
  { name: "Elevação de quadril (ponte)", region: "gluteos", execution: "Pés apoiados, suba o quadril contraindo o glúteo no topo.", care: "Não hiperextenda a lombar." },
  { name: "Afundo (passada)", region: "gluteos", execution: "Passo à frente e desça até o joelho de trás perto do chão.", care: "Joelho da frente alinhado ao pé." },
  { name: "Coice de glúteo (4 apoios)", region: "gluteos", execution: "Empurre o pé para trás e para cima mantendo o quadril estável.", care: "Evite girar o tronco." },
  // Pernas
  { name: "Agachamento livre", region: "pernas", execution: "Pés na largura do quadril, desça o quadril para trás mantendo o peito aberto.", care: "Não deixe o joelho passar muito da linha do pé." },
  { name: "Cadeira extensora ou agachamento na parede", region: "pernas", execution: "Estenda os joelhos de forma controlada e volte devagar.", care: "Sem travar o joelho no final." },
  { name: "Stiff ou levantamento terra romeno", region: "pernas", execution: "Desça o peso rente às pernas com coluna neutra até sentir o posterior.", care: "Não arredonde a lombar." },
  { name: "Elevação de panturrilha", region: "pernas", execution: "Suba na ponta dos pés e desça devagar.", care: "Use apoio para equilíbrio." },
  // Corpo inteiro / condicionamento
  { name: "Polichinelo", region: "corpo-inteiro", execution: "Salte abrindo pernas e braços em ritmo constante.", care: "Amorteça a aterrissagem com joelhos leves." },
  { name: "Burpee (com ou sem salto)", region: "corpo-inteiro", execution: "Agache, apoie as mãos, estenda as pernas e volte subindo.", care: "Versão sem salto se houver desconforto articular." },
  { name: "Escalador (mountain climber)", region: "corpo-inteiro", execution: "Em prancha, alterne os joelhos em direção ao peito.", care: "Mantenha o quadril baixo." },
  { name: "Caminhada rápida ou corrida leve", region: "corpo-inteiro", execution: "Ritmo constante em que você consegue conversar com esforço leve.", care: "Use calçado adequado e hidrate-se." },
];

const SCHEME: Record<WorkoutGoal, Record<WorkoutLevel, { sets: number; reps: string; rest: string; count: number }>> = {
  "perda-gordura": {
    iniciante: { sets: 2, reps: "12 a 15 repetições", rest: "45 segundos", count: 5 },
    intermediario: { sets: 3, reps: "15 repetições", rest: "40 segundos", count: 6 },
    avancado: { sets: 4, reps: "15 a 20 repetições", rest: "30 segundos", count: 7 },
  },
  "ganho-massa": {
    iniciante: { sets: 3, reps: "10 a 12 repetições", rest: "60 segundos", count: 5 },
    intermediario: { sets: 4, reps: "8 a 12 repetições", rest: "75 segundos", count: 6 },
    avancado: { sets: 4, reps: "6 a 10 repetições", rest: "90 segundos", count: 7 },
  },
  definicao: {
    iniciante: { sets: 3, reps: "12 repetições", rest: "45 segundos", count: 5 },
    intermediario: { sets: 3, reps: "12 a 15 repetições", rest: "45 segundos", count: 6 },
    avancado: { sets: 4, reps: "12 a 15 repetições", rest: "40 segundos", count: 7 },
  },
  condicionamento: {
    iniciante: { sets: 2, reps: "30 segundos de execução", rest: "45 segundos", count: 5 },
    intermediario: { sets: 3, reps: "40 segundos de execução", rest: "40 segundos", count: 6 },
    avancado: { sets: 4, reps: "45 segundos de execução", rest: "30 segundos", count: 7 },
  },
};

/** Gera um treino a partir do objetivo, região e nível, usando a biblioteca existente. */
export function generateWorkout(
  goal: WorkoutGoal,
  region: WorkoutRegion,
  level: WorkoutLevel,
): WorkoutExercise[] {
  const scheme = SCHEME[goal][level];
  const primary = EXERCISES.filter((e) => e.region === region);
  const support = EXERCISES.filter((e) => e.region !== region);
  const pool =
    region === "corpo-inteiro"
      ? [...primary, ...support]
      : [...primary, ...support.filter((e) => e.region === "corpo-inteiro" || e.region === "abdomen")];

  return pool.slice(0, Math.min(scheme.count, pool.length)).map((e) => ({
    ...e,
    sets: scheme.sets,
    reps: scheme.reps,
    rest: scheme.rest,
    done: false,
  }));
}

/** Busca de demonstração no YouTube quando não há vídeo cadastrado. */
export const youtubeSearchUrl = (name: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} execução correta`)}`;
