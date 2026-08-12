import type { GuideSection } from "@/lib/pdf";

export interface EducationArticle {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  sections: GuideSection[];
}

/** Conteúdos de educação alimentar — linguagem acolhedora, sem terrorismo alimentar. */
export const educationArticles: EducationArticle[] = [
  {
    id: "alimentacao-equilibrada",
    title: "Como funciona uma alimentação equilibrada?",
    summary:
      "Entenda a lógica por trás de uma rotina alimentar possível de manter, sem listas de alimentos proibidos.",
    readTime: "6 min",
    sections: [
      {
        heading: "O ponto de partida",
        paragraphs: [
          "Alimentação equilibrada não é sinônimo de restrição. É a combinação de comida de verdade, variedade e regularidade ao longo do dia, respeitando sua rotina, seu orçamento e sua cultura alimentar.",
          "Em vez de pensar em alimentos “certos” e “errados”, pense em frequência e proporção: o que aparece todos os dias no seu prato e o que aparece ocasionalmente.",
        ],
      },
      {
        heading: "Os três grupos que sustentam o dia",
        bullets: [
          "Fontes de energia: arroz, feijão, batata, mandioca, pães, aveia, macarrão. Sustentam o corpo e o cérebro.",
          "Fontes de proteína: ovos, frango, carnes, peixes, leite e derivados, feijões e lentilha. Ajudam na manutenção da massa muscular e na saciedade.",
          "Fontes de vitaminas, minerais e fibras: verduras, legumes e frutas. Quanto mais cores no prato, maior a variedade de nutrientes.",
        ],
      },
      {
        heading: "Como aplicar sem complicar",
        bullets: [
          "Garanta uma fonte de proteína em cada refeição principal.",
          "Inclua ao menos uma verdura ou legume no almoço e no jantar.",
          "Tenha frutas visíveis e lavadas para facilitar o lanche.",
          "Beba água ao longo do dia, não apenas quando sentir sede.",
          "Se um dia sair do combinado, o próximo passo é simplesmente retomar a rotina.",
        ],
      },
    ],
  },
  {
    id: "prato-equilibrado",
    title: "Como montar um prato equilibrado",
    summary: "Uma referência visual simples para almoço e jantar, usando comida acessível do dia a dia.",
    readTime: "4 min",
    sections: [
      {
        heading: "A divisão do prato",
        bullets: [
          "Metade do prato: verduras e legumes (crus, refogados, assados ou cozidos).",
          "Um quarto do prato: fonte de proteína (ovo, frango, carne, peixe, feijão, lentilha, grão-de-bico).",
          "Um quarto do prato: fonte de energia (arroz, batata, mandioca, macarrão, farofa de aveia).",
          "Um fio de gordura boa: azeite, abacate, castanhas ou sementes.",
        ],
      },
      {
        heading: "Ajustes conforme o dia",
        paragraphs: [
          "Em dias de treino ou de trabalho mais intenso, aumentar a porção de carboidrato faz sentido e não é um erro. Em dias mais parados, a fome tende a ser menor — e respeitar isso também faz parte.",
          "Arroz com feijão, ovo e salada é um prato completo, barato e culturalmente nosso. Não é preciso comida importada para comer bem.",
        ],
      },
    ],
  },
  {
    id: "organizar-semana",
    title: "Como organizar a alimentação durante a semana",
    summary: "Planejamento realista em três etapas: decidir, comprar e preparar.",
    readTime: "5 min",
    sections: [
      {
        heading: "1. Decidir antes de ter fome",
        paragraphs: [
          "Escolha de 4 a 6 receitas que você realmente gosta e repita durante a semana. Variedade não significa cozinhar algo diferente todos os dias.",
        ],
      },
      {
        heading: "2. Comprar com lista",
        bullets: [
          "Monte a lista a partir do cardápio, não do impulso.",
          "Compre proteínas em maior quantidade e congele em porções.",
          "Prefira frutas e legumes da estação: mais baratos e mais saborosos.",
        ],
      },
      {
        heading: "3. Preparar em blocos",
        bullets: [
          "Cozinhe uma leguminosa e um cereal em maior quantidade (feijão e arroz, por exemplo).",
          "Deixe legumes higienizados e picados em potes.",
          "Prepare 2 ou 3 proteínas prontas para montar marmitas rapidamente.",
          "Reserve de 60 a 90 minutos, uma ou duas vezes por semana. Não precisa ser domingo.",
        ],
      },
    ],
  },
  {
    id: "escolhas-no-mercado",
    title: "Como fazer melhores escolhas no mercado",
    summary: "Estratégias práticas para comprar melhor gastando menos.",
    readTime: "5 min",
    sections: [
      {
        heading: "Antes de sair de casa",
        bullets: [
          "Confira o que você já tem na despensa e no congelador.",
          "Leve uma lista organizada por setor do mercado.",
          "Evite ir com fome — a compra fica mais impulsiva.",
        ],
      },
      {
        heading: "Dentro do mercado",
        bullets: [
          "Comece pelo hortifrúti: é ali que a variedade nutricional aparece.",
          "Compare o preço por quilo ou por litro, não apenas o preço da embalagem.",
          "Marcas próprias costumam ter qualidade semelhante e custo menor.",
          "Grãos, ovos e legumes continuam sendo as melhores relações custo-nutrição do mercado brasileiro.",
        ],
      },
    ],
  },
  {
    id: "interpretar-rotulo",
    title: "Como interpretar um rótulo",
    summary: "O que realmente importa olhar na embalagem, em ordem de prioridade.",
    readTime: "6 min",
    sections: [
      {
        heading: "1. Lista de ingredientes",
        paragraphs: [
          "Os ingredientes aparecem em ordem de quantidade. Se açúcar, gordura vegetal ou amido aparecem nas primeiras posições, o produto é majoritariamente composto por eles.",
          "Listas curtas e com nomes reconhecíveis geralmente indicam produtos menos processados — mas isso não faz de um produto de lista longa algo proibido.",
        ],
      },
      {
        heading: "2. Tamanho da porção",
        paragraphs: [
          "Todos os números da tabela se referem à porção declarada, que muitas vezes é menor do que o que se consome de fato. Sempre compare a porção do rótulo com a sua porção real.",
        ],
      },
      {
        heading: "3. Números que ajudam na decisão",
        bullets: [
          "Proteínas: valores mais altos ajudam na saciedade.",
          "Fibras: acima de 3 g por porção é um bom sinal.",
          "Açúcares totais e adicionados: quanto menor, melhor para o consumo frequente.",
          "Sódio: atenção em produtos consumidos todos os dias, como pães, embutidos e temperos prontos.",
        ],
      },
      {
        heading: "4. Selos frontais",
        paragraphs: [
          "A lupa de alto em açúcar, sódio ou gordura saturada é um alerta de consumo frequente, não uma proibição. Serve para orientar escolhas do dia a dia.",
        ],
      },
    ],
  },
  {
    id: "lista-de-compras",
    title: "Como montar uma lista de compras",
    summary: "Um método simples para não esquecer nada e não gastar mais do que o planejado.",
    readTime: "4 min",
    sections: [
      {
        heading: "Organize por categoria",
        bullets: [
          "Hortaliças",
          "Frutas",
          "Carnes e proteínas",
          "Cereais e grãos",
          "Laticínios",
          "Ovos",
          "Temperos",
          "Outros",
        ],
      },
      {
        heading: "Dicas que economizam",
        bullets: [
          "Parta sempre do cardápio da semana.",
          "Anote quantidades para evitar sobras e desperdício.",
          "Deixe uma linha para itens de reposição da despensa.",
          "Use a lista no celular e marque os itens comprados enquanto anda pelo mercado.",
        ],
      },
    ],
  },
  {
    id: "quem-trabalha-fora",
    title: "Como organizar refeições para quem trabalha fora",
    summary: "Marmitas, lanches e soluções para dias corridos.",
    readTime: "5 min",
    sections: [
      {
        heading: "Estrutura da marmita",
        bullets: [
          "Uma proteína pronta (frango desfiado, carne moída, ovos cozidos, feijão reforçado).",
          "Um carboidrato (arroz, batata, macarrão, mandioca).",
          "Legumes cozidos ou refogados, que resistem melhor ao reaquecimento.",
          "Salada crua em pote separado, se possível.",
        ],
      },
      {
        heading: "Lanches que cabem na bolsa",
        bullets: [
          "Fruta + castanhas.",
          "Iogurte natural + aveia.",
          "Pão integral com ovo ou queijo.",
          "Tapioca simples preparada em casa.",
        ],
      },
      {
        heading: "Quando não dá para levar comida",
        paragraphs: [
          "Escolher um prato com proteína, arroz, feijão e salada em um restaurante do dia a dia é uma decisão perfeitamente equilibrada. Comer fora não interrompe sua rotina.",
        ],
      },
    ],
  },
  {
    id: "orcamento-limitado",
    title: "Alimentação saudável com orçamento limitado",
    summary: "Comer bem é possível com ingredientes simples e baratos.",
    readTime: "6 min",
    sections: [
      {
        heading: "A base econômica e nutritiva",
        bullets: [
          "Ovos: proteína completa e de baixo custo.",
          "Feijões, lentilha e grão-de-bico: proteína, fibras e ferro.",
          "Arroz, aveia, mandioca e batata: energia acessível.",
          "Legumes da estação e verduras de folha: baratos e ricos em micronutrientes.",
          "Frango e cortes bovinos de segunda: rendem bem em preparações cozidas.",
        ],
      },
      {
        heading: "Reduzindo desperdício",
        bullets: [
          "Use talos e folhas em refogados, sopas e omeletes.",
          "Congele porções antes que estraguem.",
          "Transforme sobras em novas refeições: arroz vira bolinho, frango vira recheio.",
          "Compre em feiras no fim do dia, quando os preços caem.",
        ],
      },
      {
        heading: "O que não é necessário",
        paragraphs: [
          "Suplementos, superalimentos importados e produtos “detox” não são requisitos para uma alimentação equilibrada. Comida comum, bem combinada, resolve.",
        ],
      },
    ],
  },
];

/** Guia de escolha de alimentos industrializados — sem lista de permitidos e proibidos. */
export const processedFoodsGuide: EducationArticle = {
  id: "guia-industrializados",
  title: "Como escolher alimentos industrializados",
  summary:
    "Critérios práticos para avaliar produtos de prateleira e fazer escolhas melhores, sem culpa.",
  readTime: "8 min",
  sections: [
    {
      heading: "O princípio geral",
      paragraphs: [
        "Produtos industrializados fazem parte da vida real. O objetivo não é eliminá-los, mas aprender a comparar opções dentro da mesma categoria e escolher a que contribui melhor para a sua alimentação.",
      ],
    },
    {
      heading: "O que avaliar em qualquer produto",
      bullets: [
        "Ingredientes: lista curta e reconhecível costuma indicar produto menos processado.",
        "Proteínas: quanto mais, maior a contribuição para a saciedade.",
        "Fibras: acima de 3 g por porção é um bom indicador.",
        "Açúcares: observe os açúcares adicionados, especialmente em produtos de consumo diário.",
        "Sódio: relevante em pães, embutidos, molhos e temperos prontos.",
        "Tamanho da porção: compare com a quantidade que você realmente consome.",
      ],
    },
    {
      heading: "Iogurtes",
      bullets: [
        "Compare a quantidade de proteína por pote: versões naturais e gregas tradicionais costumam ter mais.",
        "Prefira as opções com menos açúcar adicionado e adoce em casa com fruta ou mel, se quiser.",
        "Iogurte natural + fruta + aveia é um lanche completo e econômico.",
      ],
    },
    {
      heading: "Barras",
      bullets: [
        "Veja se a barra entrega proteína e fibras ou apenas açúcar e gordura.",
        "Barras servem bem como praticidade em dias corridos, não como base da alimentação.",
        "Uma fruta com castanhas costuma custar menos e nutrir de forma semelhante.",
      ],
    },
    {
      heading: "Pães",
      bullets: [
        "Procure farinha integral entre os primeiros ingredientes.",
        "Fibras acima de 3 g por porção indicam boa qualidade.",
        "Compare o sódio entre marcas: a diferença pode ser grande.",
      ],
    },
    {
      heading: "Cereais e granolas",
      bullets: [
        "Observe a posição do açúcar, do mel e do xarope de glicose na lista de ingredientes.",
        "Aveia em flocos é a opção mais simples, barata e versátil.",
      ],
    },
    {
      heading: "Bebidas",
      bullets: [
        "Água segue sendo a melhor escolha para hidratação diária.",
        "Sucos de fruta, mesmo integrais, têm menos fibras que a fruta inteira.",
        "Refrigerantes e bebidas açucaradas cabem em ocasiões, sem precisar de culpa nem de proibição.",
      ],
    },
    {
      heading: "Snacks",
      bullets: [
        "Compare sódio e gordura entre as opções da mesma prateleira.",
        "Porções individuais ajudam a manter a quantidade sob controle.",
        "Castanhas, pipoca de panela e frutas secas são alternativas simples e saborosas.",
      ],
    },
    {
      heading: "Como decidir na prateleira",
      paragraphs: [
        "Escolha dois produtos da mesma categoria, compare ingredientes, proteína, fibras, açúcar e sódio, e leve o que se encaixa melhor no seu dia. Essa é uma habilidade que melhora com prática — e vale mais do que qualquer lista de alimentos proibidos.",
      ],
    },
  ],
};

/** Conteúdo educativo para quem treina. */
export const trainingArticles: EducationArticle[] = [
  {
    id: "pre-treino",
    title: "Pré-treino: o que comer antes",
    summary: "Como chegar ao treino com energia, usando comida comum.",
    readTime: "5 min",
    sections: [
      {
        heading: "A função do pré-treino",
        paragraphs: [
          "A refeição antes do treino tem o papel de fornecer energia disponível e evitar desconforto gástrico. O carboidrato é o protagonista aqui.",
        ],
      },
      {
        heading: "Opções práticas e econômicas",
        bullets: [
          "Banana com aveia (30 a 40 minutos antes).",
          "Pão com ovo mexido (1 a 2 horas antes).",
          "Tapioca com queijo branco.",
          "Arroz com frango, quando o treino é depois do almoço.",
          "Café com uma fruta, para treinos leves e curtos.",
        ],
      },
      {
        heading: "Ajustando o horário",
        paragraphs: [
          "Quanto mais próximo do treino, mais leve e mais líquida deve ser a refeição. Treinar em jejum é possível para algumas pessoas, mas não é obrigatório nem superior.",
        ],
      },
    ],
  },
  {
    id: "pos-treino",
    title: "Pós-treino: recuperação sem complicação",
    summary: "Proteína e carboidrato na refeição seguinte já resolvem a maior parte.",
    readTime: "5 min",
    sections: [
      {
        heading: "O que realmente importa",
        paragraphs: [
          "A recuperação depende principalmente do total de proteína e energia consumido ao longo do dia, e não de uma janela de poucos minutos após o treino.",
        ],
      },
      {
        heading: "Combinações simples",
        bullets: [
          "Arroz, feijão, frango e salada.",
          "Ovos mexidos com pão e fruta.",
          "Iogurte natural com aveia e banana.",
          "Panqueca de banana com ovo e canela.",
          "Batata-doce com carne moída.",
        ],
      },
    ],
  },
  {
    id: "proteinas-treino",
    title: "Proteínas para quem treina",
    summary: "Quanto, quando e com quais alimentos acessíveis.",
    readTime: "6 min",
    sections: [
      {
        heading: "Distribuição ao longo do dia",
        paragraphs: [
          "Distribuir a proteína entre 3 e 5 refeições costuma ser mais confortável e eficiente do que concentrar tudo em uma única refeição.",
        ],
      },
      {
        heading: "Fontes acessíveis",
        bullets: [
          "Ovos: versáteis e de baixo custo.",
          "Frango: rende bem em preparações desfiadas.",
          "Carne moída: prática para marmitas.",
          "Sardinha e atum em lata: proteína e gorduras boas.",
          "Feijão, lentilha e grão-de-bico combinados com arroz.",
          "Leite, iogurte natural e queijos brancos.",
        ],
      },
      {
        heading: "Sobre suplementos",
        paragraphs: [
          "Suplementos são convenientes, não indispensáveis. Se a comida já entrega a quantidade necessária, o suplemento é opcional. A indicação individual deve vir de um nutricionista.",
        ],
      },
    ],
  },
  {
    id: "carboidratos-treino",
    title: "Carboidratos: combustível do treino",
    summary: "Por que reduzir demais o carboidrato pode atrapalhar seu desempenho.",
    readTime: "4 min",
    sections: [
      {
        heading: "Energia para render",
        paragraphs: [
          "Carboidrato é a principal fonte de energia para treinos de força e de alta intensidade. Cortá-lo drasticamente costuma reduzir desempenho, disposição e qualidade do sono.",
        ],
      },
      {
        heading: "Boas fontes do dia a dia",
        bullets: [
          "Arroz, macarrão e pão.",
          "Batata, batata-doce, mandioca e inhame.",
          "Aveia, tapioca e cuscuz.",
          "Frutas, especialmente banana e laranja.",
        ],
      },
    ],
  },
  {
    id: "hidratacao-treino",
    title: "Hidratação para quem treina",
    summary: "Água antes, durante e depois — de forma prática.",
    readTime: "3 min",
    sections: [
      {
        heading: "Referências simples",
        bullets: [
          "Beba água ao longo de todo o dia, não apenas no treino.",
          "Leve uma garrafa e tome pequenas quantidades durante o exercício.",
          "Após treinos longos ou com muito suor, reponha água e inclua uma refeição com sal na sequência.",
          "Urina clara ao longo do dia é um bom indicador prático.",
        ],
      },
      {
        heading: "Bebidas esportivas",
        paragraphs: [
          "São úteis principalmente em treinos longos, acima de uma hora, ou em muito calor. Para a maioria das rotinas, água dá conta.",
        ],
      },
    ],
  },
  {
    id: "refeicoes-praticas-treino",
    title: "Refeições práticas e econômicas para quem treina",
    summary: "Combinações rápidas com proteína e energia, sem gastar muito.",
    readTime: "5 min",
    sections: [
      {
        heading: "Até 10 minutos",
        bullets: [
          "Omelete de 3 ovos com pão francês.",
          "Iogurte natural, aveia, banana e canela.",
          "Sanduíche de atum com cenoura ralada.",
          "Cuscuz com ovo e queijo branco.",
        ],
      },
      {
        heading: "Para preparar em maior quantidade",
        bullets: [
          "Frango desfiado temperado, congelado em porções.",
          "Carne moída com legumes ralados.",
          "Feijão reforçado com legumes.",
          "Arroz cozido em maior quantidade e congelado.",
        ],
      },
      {
        heading: "Orientação final",
        paragraphs: [
          "O foco continua sendo alimentação equilibrada. Treinar bem depende de comer o suficiente, de forma consistente, com comida que você consiga manter na sua rotina.",
        ],
      },
    ],
  },
];
