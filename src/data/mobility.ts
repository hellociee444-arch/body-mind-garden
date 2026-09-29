import type { WorkoutExercise } from "./workouts";

/** Sequências prontas no mesmo padrão dos exercícios do gerador. */
export const YOGA_PILATES: WorkoutExercise[] = [
  { name: "Postura do gato-vaca", region: "costas", equipment: ["peso-corporal"], sets: 2, reps: "10 ciclos respirando", rest: "20s", execution: "Em quatro apoios, arredonde a coluna ao expirar e estenda ao inspirar.", care: "Movimento lento, sem forçar o pescoço." },
  { name: "Cachorro olhando para baixo", region: "corpo-inteiro", equipment: ["peso-corporal"], sets: 3, reps: "30s", rest: "20s", execution: "Quadril para cima, mãos e pés no chão, alongando costas e posteriores.", care: "Pode flexionar os joelhos se sentir tensão." },
  { name: "Ponte de glúteos (Pilates)", region: "gluteos", equipment: ["peso-corporal"], sets: 3, reps: "12 repetições", rest: "30s", execution: "Deitado, pés no chão, eleve o quadril vértebra por vértebra e desça devagar.", care: "Não arqueie a lombar no topo." },
  { name: "The Hundred (Pilates)", region: "abdomen", equipment: ["peso-corporal"], sets: 2, reps: "100 batidas de braço", rest: "40s", execution: "Cabeça e pernas elevadas, braços batendo curto enquanto respira em 5 tempos.", care: "Iniciantes mantêm os pés apoiados." },
  { name: "Postura do guerreiro II", region: "pernas", equipment: ["peso-corporal"], sets: 2, reps: "30s cada lado", rest: "20s", execution: "Pernas afastadas, joelho da frente flexionado, braços abertos na altura dos ombros.", care: "Joelho alinhado com o pé." },
  { name: "Prancha com respiração", region: "abdomen", equipment: ["peso-corporal"], sets: 3, reps: "20–40s", rest: "30s", execution: "Antebraços no chão, corpo alinhado, respiração contínua.", care: "Apoie os joelhos se necessário." },
  { name: "Postura da criança", region: "costas", equipment: ["peso-corporal"], sets: 1, reps: "60s", rest: "—", execution: "Sente sobre os calcanhares e leve o tronco à frente, braços estendidos.", care: "Relaxe ombros e respire fundo." },
];

export const WARMUP_MOBILITY: WorkoutExercise[] = [
  { name: "Polichinelo leve", region: "corpo-inteiro", equipment: ["peso-corporal"], sets: 1, reps: "60s", rest: "15s", execution: "Abra e feche braços e pernas em ritmo confortável.", care: "Troque por passo lateral se tiver impacto articular." },
  { name: "Rotação de ombros", region: "ombros", equipment: ["peso-corporal"], sets: 2, reps: "10 para cada lado", rest: "15s", execution: "Círculos amplos com os braços, para frente e para trás.", care: "Sem dor; reduza a amplitude se precisar." },
  { name: "Rotação de quadril", region: "gluteos", equipment: ["peso-corporal"], sets: 2, reps: "10 para cada lado", rest: "15s", execution: "Mãos na cintura, faça círculos amplos com o quadril.", care: "Mantenha os joelhos levemente soltos." },
  { name: "Agachamento de mobilidade", region: "pernas", equipment: ["peso-corporal"], sets: 2, reps: "10 repetições", rest: "20s", execution: "Desça devagar até onde for confortável, pausando 2s embaixo.", care: "Calcanhares no chão, joelhos acompanhando os pés." },
  { name: "Afundo com rotação de tronco", region: "pernas", equipment: ["peso-corporal"], sets: 2, reps: "6 para cada lado", rest: "20s", execution: "Dê um passo à frente em afundo e gire o tronco para o lado da perna da frente.", care: "Movimento controlado, sem pressa." },
  { name: "Mobilidade torácica em quatro apoios", region: "costas", equipment: ["peso-corporal"], sets: 2, reps: "8 para cada lado", rest: "15s", execution: "Mão na nuca, gire o cotovelo em direção ao teto e volte.", care: "Quadril parado; o movimento vem das costas." },
  { name: "Tornozelo na parede", region: "pernas", equipment: ["peso-corporal"], sets: 2, reps: "10 para cada lado", rest: "15s", execution: "De frente para a parede, leve o joelho à frente sem tirar o calcanhar do chão.", care: "Pare se houver dor no tornozelo." },
];
