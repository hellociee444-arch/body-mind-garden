import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface QuestionnaireInput {
  idade: number;
  sexo: string;
  altura: number; // cm
  peso: number; // kg
  objetivo: string;
  atividade: string;
  rotina?: string;
  preferencias?: string;
  restricoes?: string[];
  alergias?: string;
  condicoes?: string;
}

const SYSTEM_PROMPT = `Você é o Nutri Assistente do Viva Leve, uma nutricionista virtual empática e baseada em evidências.
Sua tarefa é criar um cardápio semanal personalizado, uma lista de compras consolidada, uma meta de hidratação e orientações gerais.
Regras:
- Use alimentos brasileiros comuns, acessíveis e econômicos.
- Respeite TODAS as restrições, alergias e condições de saúde informadas.
- Adapte porções ao objetivo (emagrecer/manter/ganhar) e nível de atividade.
- Seja objetivo, use linguagem acolhedora em português do Brasil.
- Retorne SEMPRE um JSON válido no formato solicitado, sem markdown, sem comentários.`;

const JSON_SCHEMA_INSTRUCTION = `Retorne apenas um objeto JSON com este formato exato:
{
  "resumo": "string curta explicando o plano",
  "hidratacao_ml": number,
  "calorias_alvo": number,
  "cardapio": [
    {
      "dia": "Segunda",
      "refeicoes": [
        { "nome": "Café da manhã", "descricao": "...", "calorias": 350 },
        { "nome": "Lanche da manhã", "descricao": "...", "calorias": 150 },
        { "nome": "Almoço", "descricao": "...", "calorias": 550 },
        { "nome": "Lanche da tarde", "descricao": "...", "calorias": 200 },
        { "nome": "Jantar", "descricao": "...", "calorias": 450 }
      ]
    }
  ],
  "lista_compras": ["item 1", "item 2"],
  "orientacoes": ["dica 1", "dica 2"],
  "disclaimer": "string"
}
Inclua os 7 dias da semana (Segunda a Domingo).`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as QuestionnaireInput;

    const userPrompt = `Perfil do usuário:
- Idade: ${body.idade}
- Sexo: ${body.sexo}
- Altura: ${body.altura} cm
- Peso: ${body.peso} kg
- Objetivo: ${body.objetivo}
- Nível de atividade: ${body.atividade}
- Rotina: ${body.rotina || "não informada"}
- Preferências: ${body.preferencias || "nenhuma"}
- Restrições alimentares: ${(body.restricoes || []).join(", ") || "nenhuma"}
- Alergias/intolerâncias: ${body.alergias || "nenhuma"}
- Condições de saúde: ${body.condicoes || "nenhuma"}

${JSON_SCHEMA_INSTRUCTION}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      const status = response.status === 429 ? 429 : response.status === 402 ? 402 : 500;
      return new Response(
        JSON.stringify({
          error:
            status === 429
              ? "Muitas requisições. Tente novamente em instantes."
              : status === 402
                ? "Créditos de IA esgotados. Adicione créditos ao workspace."
                : `Erro do gateway de IA: ${text}`,
        }),
        { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    let plan;
    try {
      plan = JSON.parse(content);
    } catch {
      plan = { error: "Resposta inválida da IA", raw: content };
    }

    return new Response(JSON.stringify(plan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
