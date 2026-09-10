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

/** Onde/como a pessoa vai treinar. */
export type WorkoutPlace = "casa" | "academia" | "livre" | "maquinas";

/** Equipamentos considerados na montagem do treino. */
export type Equipment =
  | "peso-corporal"
  | "halteres"
  | "barra"
  | "elastico"
  | "banco"
  | "kettlebell"
  | "maquina"
  | "cabo";

export interface Exercise {
  name: string;
  region: WorkoutRegion;
  execution: string;
  care: string;
  /** Equipamentos que servem para este exercício (qualquer um deles). */
  equipment: Equipment[];
  /** Link opcional de demonstração (YouTube). */
  video?: string;
}

export interface WorkoutExercise extends Exercise {
  sets: number;
  reps: string;
  rest: string;
  done?: boolean;
  /** Quando o exercício entrou no lugar de outro por falta de equipamento. */
  replacedFor?: string;
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

export const PLACES: { value: WorkoutPlace; label: string }[] = [
  { value: "casa", label: "Treino em casa" },
  { value: "academia", label: "Treino na academia" },
  { value: "livre", label: "Treino livre" },
  { value: "maquinas", label: "Treino somente com máquinas" },
];

export const EQUIPMENTS: { value: Equipment; label: string }[] = [
  { value: "peso-corporal", label: "Peso do corpo" },
  { value: "halteres", label: "Halteres" },
  { value: "barra", label: "Barra" },
  { value: "elastico", label: "Elástico" },
  { value: "banco", label: "Banco" },
  { value: "kettlebell", label: "Kettlebell" },
  { value: "maquina", label: "Máquinas" },
  { value: "cabo", label: "Polia / cabo" },
];

/** Equipamentos considerados disponíveis em cada tipo de treino. */
export const PLACE_EQUIPMENT: Record<WorkoutPlace, Equipment[]> = {
  casa: ["peso-corporal", "halteres", "elastico"],
  academia: ["peso-corporal", "halteres", "barra", "elastico", "banco", "kettlebell", "maquina", "cabo"],
  livre: ["peso-corporal", "halteres", "barra", "elastico", "banco", "kettlebell"],
  maquinas: ["maquina", "cabo"],
};

export const EXERCISES: Exercise[] = [
  // Braços
  { name: "Rosca direta com halteres", region: "bracos", equipment: ["halteres"], execution: "Cotovelos junto ao corpo, suba o peso controlando a subida e a descida.", care: "Evite balançar o tronco para ajudar no movimento." },
  { name: "Tríceps testa ou tríceps banco", region: "bracos", equipment: ["halteres", "banco", "peso-corporal"], execution: "Mantenha o cotovelo apontado para cima e estenda o braço sem travar a articulação.", care: "Se sentir dor no cotovelo, reduza a carga." },
  { name: "Rosca martelo", region: "bracos", equipment: ["halteres"], execution: "Punhos neutros (polegar para cima), suba até a altura do peito.", care: "Não use impulso de ombro." },
  { name: "Rosca no elástico", region: "bracos", equipment: ["elastico"], execution: "Pise no elástico e suba as mãos até o peito mantendo os cotovelos parados.", care: "Volte devagar, sem soltar a tensão de uma vez." },
  { name: "Rosca na polia", region: "bracos", equipment: ["cabo", "maquina"], execution: "Puxe a barra ou o punho da polia até o peito com os cotovelos fixos.", care: "Não jogue o tronco para trás." },
  { name: "Tríceps na polia", region: "bracos", equipment: ["cabo", "maquina"], execution: "Estenda os cotovelos para baixo mantendo os braços junto ao corpo.", care: "Evite abrir os cotovelos para os lados." },
  // Costas
  { name: "Remada curvada", region: "costas", equipment: ["halteres", "barra"], execution: "Tronco inclinado, coluna neutra, puxe os cotovelos para trás junto às costelas.", care: "Não arredonde a lombar." },
  { name: "Puxada alta ou barra assistida", region: "costas", equipment: ["maquina", "cabo"], execution: "Puxe a barra até a linha do peito aproximando as escápulas.", care: "Evite jogar o corpo para trás." },
  { name: "Remada unilateral com halter", region: "costas", equipment: ["halteres", "banco"], execution: "Apoie uma mão no banco e puxe o halter em linha reta.", care: "Mantenha o quadril estável." },
  { name: "Remada na máquina", region: "costas", equipment: ["maquina", "cabo"], execution: "Sentado, puxe os punhos até o abdômen aproximando as escápulas.", care: "Mantenha o peito apoiado e a coluna neutra." },
  { name: "Remada com elástico", region: "costas", equipment: ["elastico"], execution: "Fixe o elástico à frente e puxe os cotovelos para trás junto às costelas.", care: "Não eleve os ombros durante a puxada." },
  // Peito
  { name: "Flexão de braços (solo ou joelhos)", region: "peito", equipment: ["peso-corporal"], execution: "Mãos na largura do peito, desça o corpo em linha reta até 90° de cotovelo.", care: "Não deixe o quadril cair." },
  { name: "Supino reto com halteres", region: "peito", equipment: ["halteres", "banco"], execution: "Desça os halteres na linha do peito e empurre sem travar os cotovelos.", care: "Controle a descida; evite arquear demais a lombar." },
  { name: "Crucifixo", region: "peito", equipment: ["halteres", "banco", "elastico"], execution: "Braços levemente flexionados, abra até sentir alongar e feche devagar.", care: "Use carga leve para proteger o ombro." },
  { name: "Supino na máquina", region: "peito", equipment: ["maquina"], execution: "Empurre os punhos à frente na linha do peito e volte devagar.", care: "Ajuste o assento para os punhos ficarem na altura do peito." },
  { name: "Crucifixo na máquina (peck deck)", region: "peito", equipment: ["maquina", "cabo"], execution: "Feche os braços à frente do peito e abra de forma controlada.", care: "Não force a abertura além do confortável." },
  // Ombros
  { name: "Desenvolvimento de ombros", region: "ombros", equipment: ["halteres", "barra"], execution: "Empurre os halteres acima da cabeça mantendo o abdômen firme.", care: "Não force se houver dor no ombro." },
  { name: "Elevação lateral", region: "ombros", equipment: ["halteres", "elastico"], execution: "Suba os braços até a linha dos ombros com cotovelos levemente flexionados.", care: "Evite subir acima da linha do ombro." },
  { name: "Elevação frontal", region: "ombros", equipment: ["halteres", "elastico"], execution: "Suba o halter à frente até a altura dos ombros.", care: "Movimento lento, sem impulso." },
  { name: "Desenvolvimento na máquina", region: "ombros", equipment: ["maquina"], execution: "Sentado, empurre os punhos acima da cabeça e volte controlando.", care: "Mantenha as costas apoiadas no banco." },
  { name: "Elevação lateral na máquina ou polia", region: "ombros", equipment: ["maquina", "cabo"], execution: "Afaste os braços do corpo até a linha dos ombros.", care: "Carga leve e movimento controlado." },
  // Abdômen
  { name: "Prancha isométrica", region: "abdomen", equipment: ["peso-corporal"], execution: "Apoie antebraços e pontas dos pés, corpo alinhado, abdômen contraído.", care: "Não prenda a respiração." },
  { name: "Abdominal remador", region: "abdomen", equipment: ["peso-corporal"], execution: "Leve joelhos e tronco ao mesmo tempo em direção ao centro.", care: "Evite puxar a nuca." },
  { name: "Elevação de pernas", region: "abdomen", equipment: ["peso-corporal"], execution: "Deitado, suba as pernas estendidas e desça devagar sem tocar o chão.", care: "Mantenha a lombar apoiada." },
  { name: "Abdominal na máquina ou na polia", region: "abdomen", equipment: ["maquina", "cabo"], execution: "Flexione o tronco à frente contraindo o abdômen e volte devagar.", care: "Evite puxar com os braços." },
  // Glúteos
  { name: "Elevação de quadril (ponte)", region: "gluteos", equipment: ["peso-corporal", "halteres"], execution: "Pés apoiados, suba o quadril contraindo o glúteo no topo.", care: "Não hiperextenda a lombar." },
  { name: "Afundo (passada)", region: "gluteos", equipment: ["peso-corporal", "halteres"], execution: "Passo à frente e desça até o joelho de trás perto do chão.", care: "Joelho da frente alinhado ao pé." },
  { name: "Coice de glúteo (4 apoios)", region: "gluteos", equipment: ["peso-corporal", "elastico"], execution: "Empurre o pé para trás e para cima mantendo o quadril estável.", care: "Evite girar o tronco." },
  { name: "Glúteo na máquina ou na polia", region: "gluteos", equipment: ["maquina", "cabo"], execution: "Empurre a perna para trás com o tronco firme e volte controlando.", care: "Não arqueie a lombar para ganhar amplitude." },
  // Pernas
  { name: "Agachamento livre", region: "pernas", equipment: ["peso-corporal", "halteres", "barra"], execution: "Pés na largura do quadril, desça o quadril para trás mantendo o peito aberto.", care: "Não deixe o joelho passar muito da linha do pé." },
  { name: "Cadeira extensora ou agachamento na parede", region: "pernas", equipment: ["maquina", "peso-corporal"], execution: "Estenda os joelhos de forma controlada e volte devagar.", care: "Sem travar o joelho no final." },
  { name: "Stiff ou levantamento terra romeno", region: "pernas", equipment: ["halteres", "barra", "kettlebell"], execution: "Desça o peso rente às pernas com coluna neutra até sentir o posterior.", care: "Não arredonde a lombar." },
  { name: "Elevação de panturrilha", region: "pernas", equipment: ["peso-corporal", "halteres", "maquina"], execution: "Suba na ponta dos pés e desça devagar.", care: "Use apoio para equilíbrio." },
  { name: "Leg press", region: "pernas", equipment: ["maquina"], execution: "Empurre a plataforma estendendo os joelhos sem travar no final.", care: "Mantenha a lombar apoiada no banco." },
  { name: "Cadeira flexora", region: "pernas", equipment: ["maquina"], execution: "Flexione os joelhos levando o apoio em direção ao glúteo.", care: "Volte devagar, sem soltar o peso." },
  // Corpo inteiro / condicionamento
  { name: "Polichinelo", region: "corpo-inteiro", equipment: ["peso-corporal"], execution: "Salte abrindo pernas e braços em ritmo constante.", care: "Amorteça a aterrissagem com joelhos leves." },
  { name: "Burpee (com ou sem salto)", region: "corpo-inteiro", equipment: ["peso-corporal"], execution: "Agache, apoie as mãos, estenda as pernas e volte subindo.", care: "Versão sem salto se houver desconforto articular." },
  { name: "Escalador (mountain climber)", region: "corpo-inteiro", equipment: ["peso-corporal"], execution: "Em prancha, alterne os joelhos em direção ao peito.", care: "Mantenha o quadril baixo." },
  { name: "Caminhada rápida ou corrida leve", region: "corpo-inteiro", equipment: ["peso-corporal"], execution: "Ritmo constante em que você consegue conversar com esforço leve.", care: "Use calçado adequado e hidrate-se." },
  { name: "Esteira, elíptico ou bicicleta", region: "corpo-inteiro", equipment: ["maquina"], execution: "Mantenha ritmo constante e postura ereta durante o tempo definido.", care: "Comece leve e aumente o ritmo aos poucos." },
  { name: "Swing com kettlebell ou halter", region: "corpo-inteiro", equipment: ["kettlebell", "halteres"], execution: "Empurre o quadril para trás e balance o peso até a altura do peito.", care: "O movimento vem do quadril, não dos braços." },
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

const isAvailable = (exercise: Exercise, available: Equipment[]) =>
  exercise.equipment.some((eq) => available.includes(eq));

/**
 * Troca um exercício por outro similar: mesma região muscular e objetivo,
 * usando apenas os equipamentos disponíveis.
 */
export function findSimilar(
  exercise: Exercise,
  available: Equipment[],
  used: string[] = [],
): Exercise | null {
  const sameRegion = EXERCISES.filter(
    (e) => e.region === exercise.region && e.name !== exercise.name && !used.includes(e.name) && isAvailable(e, available),
  );
  if (sameRegion.length > 0) return sameRegion[0];
  const bodyweight = EXERCISES.filter(
    (e) =>
      (e.region === "corpo-inteiro" || e.region === "abdomen") &&
      !used.includes(e.name) &&
      isAvailable(e, available),
  );
  return bodyweight[0] ?? null;
}

/**
 * Gera um treino a partir do objetivo, região, nível e do tipo/local de treino,
 * respeitando os equipamentos disponíveis e substituindo por exercícios similares
 * quando o equipamento necessário não existir.
 */
export function generateWorkout(
  goal: WorkoutGoal,
  region: WorkoutRegion,
  level: WorkoutLevel,
  place: WorkoutPlace = "livre",
  availableEquipment?: Equipment[],
): WorkoutExercise[] {
  const scheme = SCHEME[goal][level];
  const available =
    availableEquipment && availableEquipment.length > 0 ? availableEquipment : PLACE_EQUIPMENT[place];

  const primary = EXERCISES.filter((e) => e.region === region);
  const support = EXERCISES.filter((e) => e.region !== region);
  const pool =
    region === "corpo-inteiro"
      ? [...primary, ...support]
      : [...primary, ...support.filter((e) => e.region === "corpo-inteiro" || e.region === "abdomen")];

  const chosen: WorkoutExercise[] = [];
  const used: string[] = [];

  for (const exercise of pool) {
    if (chosen.length >= scheme.count) break;
    if (used.includes(exercise.name)) continue;

    if (isAvailable(exercise, available)) {
      used.push(exercise.name);
      chosen.push({ ...exercise, sets: scheme.sets, reps: scheme.reps, rest: scheme.rest, done: false });
      continue;
    }

    const similar = findSimilar(exercise, available, used);
    if (similar) {
      used.push(similar.name);
      chosen.push({
        ...similar,
        sets: scheme.sets,
        reps: scheme.reps,
        rest: scheme.rest,
        done: false,
        replacedFor: exercise.name,
      });
    }
  }

  return chosen;
}

/** Busca de demonstração no YouTube quando não há vídeo cadastrado. */
export const youtubeSearchUrl = (name: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} execução correta`)}`;
