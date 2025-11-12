export const receitas = [
  {
    nome: "Bowl de Quinoa com Abacate e Vegetais Coloridos",
    ingredientes: [
      "1 xícara de quinoa",
      "2 xícaras de água",
      "Sal a gosto",
      "1/2 cenoura ralada",
      "1/2 pimentão vermelho",
      "1/2 pepino",
      "1/2 xícara de milho cozido",
      "6 tomates-cereja",
      "1/2 beterraba (opcional)",
      "Folhas verdes",
      "1/2 abacate",
      "Suco de 1/2 limão",
      "Molho opcional: azeite, vinagre, mel/agave, mostarda, sal e pimenta"
    ],
    modo_preparo: [
      "Cozinhar a quinoa com água e sal até secar.",
      "Preparar os vegetais (crus ou levemente grelhados).",
      "Montar o bowl com quinoa e vegetais em seções.",
      "Adicionar abacate temperado e molho. Finalizar com sementes."
    ],
    dicas: [
      "Adicionar grão-de-bico, tofu ou frango para mais proteína.",
      "Salpicar ervas frescas.",
      "Servir frio ou levemente morno."
    ],
    image: "/src/assets/recipe-salad-bowl.jpg",
    time: "25 min",
    calories: "420",
    rating: 4.9,
    tags: ["Vegana", "Low Carb", "Rico em proteína"]
  },
  {
    nome: "Smoothie Verde Detox",
    ingredientes: [
      "1 banana madura",
      "1 punhado de espinafre",
      "1/2 maçã verde (opcional)",
      "Suco de 1/2 limão",
      "200 ml água de coco ou leite vegetal",
      "1 colher de chá de chia ou linhaça",
      "Gelo a gosto"
    ],
    modo_preparo: [
      "Lavar e cortar os ingredientes.",
      "Bater tudo no liquidificador até homogeneizar.",
      "Servir imediatamente."
    ],
    dicas: [
      "Adicionar gengibre fresco.",
      "Adicionar proteína vegetal ou aveia.",
      "Adoçar naturalmente com tâmaras ou mel."
    ],
    image: "/src/assets/recipe-smoothie.jpg",
    time: "10 min",
    calories: "180",
    rating: 4.8,
    tags: ["Detox", "Rápido", "Energético"]
  },
  {
    nome: "Overnight Oats com Frutas Vermelhas",
    ingredientes: [
      "1/2 xícara de aveia",
      "1/2 xícara de leite (ou vegetal)",
      "2 colheres de sopa de iogurte",
      "1 colher de chá de mel (ou adoçante natural)",
      "1/2 xícara de frutas vermelhas",
      "1 colher de chá de chia",
      "Pitada de canela"
    ],
    modo_preparo: [
      "Misturar aveia, leite, iogurte, chia, mel e canela.",
      "Adicionar frutas vermelhas.",
      "Levar à geladeira por 6 horas ou durante a noite.",
      "Servir com frutas extras ou granola se desejar."
    ],
    dicas: [
      "Adicionar pasta de amendoim ou proteína em pó.",
      "Usar leite de coco para mais cremosidade.",
      "Frutas vermelhas congeladas funcionam bem."
    ],
    image: "/src/assets/recipe-breakfast.jpg",
    time: "5 min",
    calories: "290",
    rating: 4.9,
    tags: ["Café da manhã", "Prático", "Sem glúten"]
  },
  {
    nome: "Avocado Toast",
    ingredientes: [
      "1 fatia de pão integral",
      "1/2 abacate pequeno (80 g)",
      "Suco de 1/2 limão",
      "Sal e pimenta a gosto",
      "1 fio de azeite",
      "1 ovo (opcional)",
      "Sementes (chia, linhaça ou gergelim)"
    ],
    modo_preparo: [
      "Amasse o abacate com limão, sal e pimenta.",
      "Torre o pão e espalhe o creme de abacate.",
      "Finalize com sementes e ovo, se desejar."
    ],
    dicas: [
      "Adicione tomate ou rúcula para mais frescor.",
      "Use pão sem glúten se preferir.",
      "O ovo pochê traz cremosidade extra."
    ],
    image: "/src/assets/recipe-avocado-toast.jpg",
    time: "10 min",
    calories: "250",
    rating: 4.7,
    tags: ["Rápido", "Vegetariano", "Proteico"]
  },
  {
    nome: "Bowl de Açaí Energético",
    ingredientes: [
      "200 g de polpa de açaí",
      "1 banana média congelada",
      "100 ml de leite vegetal ou iogurte",
      "1 colher de sopa de aveia",
      "1 colher de chá de mel (opcional)",
      "Frutas frescas e granola para topping"
    ],
    modo_preparo: [
      "Bata o açaí, banana, leite e aveia até cremoso.",
      "Sirva em tigela e adicione toppings de frutas e granola."
    ],
    dicas: [
      "Congele as frutas para textura mais cremosa.",
      "Adicione proteína em pó para pós-treino.",
      "Varie os toppings com coco ralado ou cacau."
    ],
    image: "/src/assets/recipe-acai-bowl.jpg",
    time: "8 min",
    calories: "320",
    rating: 4.8,
    tags: ["Energético", "Pós-treino", "Antioxidante"]
  },
  {
    nome: "Salmão com Quinoa e Granola Fit",
    ingredientes: [
      "150 g de filé de salmão",
      "1/2 xícara de quinoa crua",
      "2 colheres de sopa de aveia",
      "1 colher de sopa de sementes",
      "1 colher de chá de azeite",
      "Ervas e limão a gosto"
    ],
    modo_preparo: [
      "Tempere e grelhe o salmão.",
      "Cozinhe a quinoa até macia.",
      "Prepare a granola assando aveia, sementes e azeite por 10 min.",
      "Monte o prato com quinoa, salmão e granola por cima."
    ],
    dicas: [
      "Use salmão selvagem para mais ômega-3.",
      "Adicione vegetais grelhados.",
      "A granola pode ser preparada com antecedência."
    ],
    image: "/src/assets/recipe-salmon-quinoa.jpg",
    time: "30 min",
    calories: "480",
    rating: 4.9,
    tags: ["Alto em proteína", "Ômega-3", "Gourmet"]
  }
];

export const nutricao = [
  {
    receita: "Bowl de Quinoa com Abacate e Vegetais Coloridos",
    porcao: "1 bowl",
    calorias: 420,
    carboidratos: 45,
    proteinas: 12,
    gorduras: 20,
    fibras: 10,
    acucares_naturais: null,
    beneficios: "Proteínas vegetais, gorduras boas; melhora saciedade, saúde cardiovascular e regula intestino."
  },
  {
    receita: "Smoothie Verde Detox",
    porcao: "1 copo",
    calorias: 180,
    carboidratos: 35,
    proteinas: 3,
    gorduras: 3,
    fibras: 5,
    acucares_naturais: 18,
    beneficios: "Rico em ferro, potássio, vitamina C; auxilia desintoxicação, digestão e fortalece sistema imunológico."
  },
  {
    receita: "Overnight Oats com Frutas Vermelhas",
    porcao: "1 porção",
    calorias: 290,
    carboidratos: 45,
    proteinas: 9,
    gorduras: 8,
    fibras: 6,
    acucares_naturais: 15,
    beneficios: "Fibras, antioxidantes; promove saciedade, digestão e fornece energia sustentada."
  },
  {
    receita: "Avocado Toast",
    porcao: "1 fatia",
    calorias: 250,
    carboidratos: 22,
    proteinas: 5,
    gorduras: 15,
    fibras: 6,
    acucares_naturais: null,
    beneficios: "Fonte de gorduras boas e fibras; aumenta saciedade; melhora saúde cardiovascular."
  },
  {
    receita: "Bowl de Açaí Energético",
    porcao: "1 bowl (300 ml)",
    calorias: 320,
    carboidratos: 55,
    proteinas: 7,
    gorduras: 9,
    fibras: 8,
    acucares_naturais: 25,
    beneficios: "Rico em antioxidantes; fornece energia; melhora controle glicêmico."
  },
  {
    receita: "Salmão com Quinoa e Granola Fit",
    porcao: "1 prato (350-400 g)",
    calorias: 480,
    carboidratos: 30,
    proteinas: 35,
    gorduras: 22,
    fibras: 5,
    acucares_naturais: null,
    beneficios: "Rico em ômega-3; alto teor proteico; antioxidante e anti-inflamatório."
  }
];

export const fitness = [
  {
    treino: "HIIT (Alta Performance)",
    duracao: "20 minutos",
    beneficios: "Acelera metabolismo, queima gordura e melhora condicionamento.",
    combinacao_alimentar: "Smoothie Verde Detox ou Bowl de Quinoa"
  },
  {
    treino: "Yoga / Pilates (Equilíbrio e Força)",
    duracao: "30-45 minutos",
    beneficios: "Melhora postura, flexibilidade e reduz estresse.",
    combinacao_alimentar: "Overnight Oats com Frutas Vermelhas"
  },
  {
    treino: "Corrida Leve / Caminhada",
    duracao: "40 minutos",
    beneficios: "Fortalece sistema cardiovascular e ajuda no controle de peso.",
    combinacao_alimentar: "Smoothie Verde pré-treino e Bowl de Quinoa pós-treino"
  }
];

export const bemEstar = [
  {
    categoria: "10 Passos para Vida Saudável",
    conteudo: [
      "Alimente-se com consciência",
      "Hidrate-se bem",
      "Mova-se diariamente",
      "Priorize o sono",
      "Exponha-se ao sol com moderação",
      "Cuide da mente",
      "Cultive boas relações",
      "Planeje sua rotina alimentar",
      "Pratique a gratidão",
      "Seja gentil consigo mesmo"
    ]
  },
  {
    categoria: "Rotina de Autocuidado",
    conteudo: [
      "Comece o dia com intenção",
      "Hidrate-se ao acordar",
      "Crie pausas de respiração",
      "Escolha alimentos que te nutrem",
      "Desconecte-se das telas",
      "Tenha um ritual noturno",
      "Valorize o descanso"
    ]
  },
  {
    categoria: "Energia e Equilíbrio",
    conteudo: [
      "Comece com café da manhã nutritivo",
      "Mantenha-se em movimento",
      "Beba água com frequência",
      "Faça pausas conscientes",
      "Passe mais tempo ao ar livre",
      "Alimente pensamentos positivos",
      "Organize seu dia",
      "Descanse e recarregue"
    ]
  }
];
