import { jsPDF } from "jspdf";
import type { EnrichedRecipe } from "@/data/recipeMetadata";
import { CATEGORY_LABELS } from "@/data/recipeMetadata";

// ---------- Base helpers ----------

const BRAND = "#4A7C59";
const MUTED = "#6b7280";
const TEXT = "#1f2937";
const PAGE_W = 210;
const MARGIN = 15;
const CONTENT_W = PAGE_W - MARGIN * 2;

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function newDoc(title: string) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setProperties({ title, creator: "Viva Leve" });
  return doc;
}

function drawHeader(doc: jsPDF, title: string, subtitle?: string) {
  doc.setFillColor(BRAND);
  doc.rect(0, 0, PAGE_W, 28, "F");
  doc.setTextColor("#ffffff");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("VIVA LEVE", MARGIN, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Coma bem. Viva leve.", MARGIN, 19);
  doc.setFontSize(9);
  doc.text(
    new Date().toLocaleDateString("pt-BR"),
    PAGE_W - MARGIN,
    13,
    { align: "right" },
  );

  doc.setTextColor(TEXT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, MARGIN, 42);
  if (subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(MUTED);
    doc.text(subtitle, MARGIN, 49);
  }
  doc.setTextColor(TEXT);
  return subtitle ? 56 : 50;
}

function drawFooter(doc: jsPDF) {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(MUTED);
    doc.text(
      `Viva Leve • vivaleve.app • Página ${i}/${pages}`,
      PAGE_W / 2,
      290,
      { align: "center" },
    );
  }
}

interface Cursor { y: number }

function ensureSpace(doc: jsPDF, c: Cursor, needed: number) {
  if (c.y + needed > 280) {
    doc.addPage();
    c.y = 20;
  }
}

function heading(doc: jsPDF, c: Cursor, text: string, size = 13) {
  ensureSpace(doc, c, 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(size);
  doc.setTextColor(BRAND);
  doc.text(text, MARGIN, c.y);
  c.y += size * 0.5 + 2;
  doc.setTextColor(TEXT);
}

function paragraph(doc: jsPDF, c: Cursor, text: string, size = 10) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(size);
  doc.setTextColor(TEXT);
  const lines = doc.splitTextToSize(text, CONTENT_W);
  for (const line of lines) {
    ensureSpace(doc, c, 6);
    doc.text(line, MARGIN, c.y);
    c.y += size * 0.45 + 1.5;
  }
}

function bullet(doc: jsPDF, c: Cursor, text: string) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, CONTENT_W - 6);
  ensureSpace(doc, c, lines.length * 5 + 1);
  doc.setTextColor(BRAND);
  doc.text("•", MARGIN, c.y);
  doc.setTextColor(TEXT);
  doc.text(lines, MARGIN + 5, c.y);
  c.y += lines.length * 4.5 + 1;
}

function kv(doc: jsPDF, c: Cursor, label: string, value: string) {
  ensureSpace(doc, c, 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`${label}:`, MARGIN, c.y);
  doc.setFont("helvetica", "normal");
  doc.text(value, MARGIN + 45, c.y);
  c.y += 5.5;
}

async function drawImage(doc: jsPDF, url: string, x: number, y: number, w: number, h: number) {
  try {
    const dataUrl = await urlToDataUrl(url);
    if (dataUrl) {
      const ext = dataUrl.includes("image/png") ? "PNG" : "JPEG";
      doc.addImage(dataUrl, ext, x, y, w, h, undefined, "FAST");
    }
  } catch {
    /* ignore image errors */
  }
}

function urlToDataUrl(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

// ---------- Recipe PDF ----------

export async function downloadRecipePdf(r: EnrichedRecipe) {
  const doc = newDoc(r.nome);
  const c: Cursor = { y: drawHeader(doc, r.nome, CATEGORY_LABELS[r.category]) };

  await drawImage(doc, r.image, MARGIN, c.y, 80, 60);
  const infoX = MARGIN + 85;
  let iy = c.y + 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Tempo:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(r.time, infoX + 22, iy); iy += 6;
  doc.setFont("helvetica", "bold"); doc.text("Rendimento:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(r.yieldLabel, infoX + 22, iy); iy += 6;
  doc.setFont("helvetica", "bold"); doc.text("Dificuldade:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(r.difficulty, infoX + 22, iy); iy += 6;
  doc.setFont("helvetica", "bold"); doc.text("Calorias:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(`${r.calories} kcal`, infoX + 22, iy); iy += 6;
  doc.setFont("helvetica", "bold"); doc.text("Proteínas:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(`${r.proteins} g`, infoX + 22, iy); iy += 6;
  doc.setFont("helvetica", "bold"); doc.text("Carboidratos:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(`${r.carbs} g`, infoX + 22, iy); iy += 6;
  doc.setFont("helvetica", "bold"); doc.text("Gorduras:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(`${r.fats} g`, infoX + 22, iy); iy += 6;
  doc.setFont("helvetica", "bold"); doc.text("Fibras:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(`${r.fibers} g`, infoX + 22, iy); iy += 6;
  doc.setFont("helvetica", "bold"); doc.text("Custo/porção:", infoX, iy); doc.setFont("helvetica", "normal"); doc.text(`R$ ${r.costPerServing.toFixed(2).replace(".", ",")}`, infoX + 22, iy);

  c.y += 68;

  heading(doc, c, "Ingredientes");
  for (const i of r.ingredientes) bullet(doc, c, i);
  c.y += 3;

  heading(doc, c, "Modo de Preparo");
  r.modo_preparo.forEach((step, i) => {
    const lines = doc.splitTextToSize(step, CONTENT_W - 8);
    ensureSpace(doc, c, lines.length * 5 + 3);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(BRAND);
    doc.text(`${i + 1}.`, MARGIN, c.y);
    doc.setTextColor(TEXT);
    doc.setFont("helvetica", "normal");
    doc.text(lines, MARGIN + 7, c.y);
    c.y += lines.length * 4.5 + 2;
  });

  if (r.dicas?.length) {
    c.y += 3;
    heading(doc, c, "Dicas");
    for (const d of r.dicas) bullet(doc, c, d);
  }

  drawFooter(doc);
  doc.save(`viva-leve-${slug(r.nome)}.pdf`);
}

// ---------- Recipe collection (Biblioteca) ----------

export async function downloadRecipesCollection(
  title: string,
  subtitle: string,
  recipes: EnrichedRecipe[],
) {
  const doc = newDoc(title);
  const c: Cursor = { y: drawHeader(doc, title, subtitle) };
  paragraph(doc, c, `${recipes.length} receitas selecionadas para você.`);
  c.y += 4;

  recipes.forEach((r, idx) => {
    if (idx > 0) { doc.addPage(); c.y = 20; }
    heading(doc, c, r.nome, 15);
    paragraph(doc, c, `${CATEGORY_LABELS[r.category]} • ${r.time} • ${r.calories} kcal • ${r.yieldLabel}`);
    c.y += 2;
    heading(doc, c, "Ingredientes", 12);
    for (const i of r.ingredientes) bullet(doc, c, i);
    c.y += 2;
    heading(doc, c, "Modo de Preparo", 12);
    r.modo_preparo.forEach((step, i) => {
      const lines = doc.splitTextToSize(`${i + 1}. ${step}`, CONTENT_W);
      ensureSpace(doc, c, lines.length * 5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(lines, MARGIN, c.y);
      c.y += lines.length * 4.5 + 1;
    });
  });

  drawFooter(doc);
  doc.save(`viva-leve-${slug(title)}.pdf`);
}

// ---------- Nutri Report ----------

export interface NutriMeal { nome: string; descricao: string; calorias: number }
export interface NutriDay { dia: string; refeicoes: NutriMeal[] }
export interface NutriPlan {
  resumo: string;
  hidratacao_ml: number;
  calorias_alvo: number;
  cardapio: NutriDay[];
  lista_compras: string[];
  orientacoes: string[];
  disclaimer?: string;
}
export interface NutriForm {
  idade: string; sexo: string; altura: string; peso: string;
  objetivo: string; atividade: string; rotina?: string;
  preferencias?: string; restricoes?: string[]; alergias?: string; condicoes?: string;
}

export function computeImc(alturaCm: number, pesoKg: number) {
  if (!alturaCm || !pesoKg) return { imc: 0, classe: "-" };
  const alt = alturaCm / 100;
  const imc = pesoKg / (alt * alt);
  let classe = "Peso normal";
  if (imc < 18.5) classe = "Abaixo do peso";
  else if (imc < 25) classe = "Peso normal";
  else if (imc < 30) classe = "Sobrepeso";
  else classe = "Obesidade";
  return { imc: Math.round(imc * 10) / 10, classe };
}

export function downloadNutriReport(
  form: NutriForm,
  plan: NutriPlan,
  recommended: EnrichedRecipe[],
) {
  const doc = newDoc("Relatório Nutricional Viva Leve");
  const c: Cursor = { y: drawHeader(doc, "Meu Relatório Nutricional", `Avaliação de ${new Date().toLocaleDateString("pt-BR")}`) };

  const altura = parseFloat(form.altura);
  const peso = parseFloat(form.peso);
  const { imc, classe } = computeImc(altura, peso);
  const proteinas = Math.round((plan.calorias_alvo * 0.25) / 4);
  const carbs = Math.round((plan.calorias_alvo * 0.5) / 4);
  const gorduras = Math.round((plan.calorias_alvo * 0.25) / 9);

  heading(doc, c, "Dados pessoais");
  kv(doc, c, "Idade", `${form.idade} anos`);
  kv(doc, c, "Sexo", form.sexo);
  kv(doc, c, "Altura", `${form.altura} cm`);
  kv(doc, c, "Peso", `${form.peso} kg`);
  kv(doc, c, "Nível de atividade", form.atividade);
  if (form.rotina) kv(doc, c, "Rotina", form.rotina);
  c.y += 3;

  heading(doc, c, "Objetivo");
  paragraph(doc, c, form.objetivo);
  c.y += 3;

  heading(doc, c, "IMC");
  kv(doc, c, "IMC", `${imc}`);
  kv(doc, c, "Classificação", classe);
  c.y += 3;

  heading(doc, c, "Necessidades calóricas e macronutrientes");
  kv(doc, c, "Meta calórica", `${plan.calorias_alvo} kcal/dia`);
  kv(doc, c, "Proteínas", `${proteinas} g`);
  kv(doc, c, "Carboidratos", `${carbs} g`);
  kv(doc, c, "Gorduras", `${gorduras} g`);
  kv(doc, c, "Hidratação", `${(plan.hidratacao_ml / 1000).toFixed(1)} L/dia`);
  c.y += 3;

  heading(doc, c, "Resumo do plano");
  paragraph(doc, c, plan.resumo);
  c.y += 3;

  if (form.restricoes?.length || form.alergias || form.condicoes) {
    heading(doc, c, "Observações de saúde");
    if (form.restricoes?.length) kv(doc, c, "Restrições", form.restricoes.join(", "));
    if (form.alergias) kv(doc, c, "Alergias", form.alergias);
    if (form.condicoes) kv(doc, c, "Condições", form.condicoes);
    c.y += 3;
  }

  heading(doc, c, "Plano alimentar (visão geral)");
  plan.cardapio.slice(0, 3).forEach((d) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    ensureSpace(doc, c, 6);
    doc.text(d.dia, MARGIN, c.y); c.y += 5;
    d.refeicoes.forEach((m) => bullet(doc, c, `${m.nome} — ${m.descricao} (${m.calorias} kcal)`));
    c.y += 2;
  });
  paragraph(doc, c, "Cardápio completo disponível no PDF 'Meu Cardápio Semanal'.", 9);
  c.y += 3;

  heading(doc, c, "Recomendações");
  for (const o of plan.orientacoes) bullet(doc, c, o);
  c.y += 3;

  if (recommended.length) {
    heading(doc, c, "Receitas recomendadas");
    for (const r of recommended.slice(0, 8)) {
      bullet(doc, c, `${r.nome} — ${r.calories} kcal, ${r.time}`);
    }
    c.y += 3;
  }

  heading(doc, c, "Orientações finais");
  paragraph(doc, c, plan.disclaimer || "Este relatório é uma referência gerada automaticamente e não substitui o acompanhamento de um profissional de saúde.");

  drawFooter(doc);
  doc.save("viva-leve-relatorio-nutricional.pdf");
}

// ---------- Weekly menu ----------

export function downloadWeeklyMenu(plan: NutriPlan) {
  const doc = newDoc("Cardápio Semanal Viva Leve");
  const c: Cursor = { y: drawHeader(doc, "Meu Cardápio Semanal", `Meta: ${plan.calorias_alvo} kcal/dia • ${(plan.hidratacao_ml / 1000).toFixed(1)} L de água/dia`) };

  plan.cardapio.forEach((d) => {
    ensureSpace(doc, c, 15);
    doc.setFillColor("#eaf3ec");
    doc.rect(MARGIN, c.y - 5, CONTENT_W, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(BRAND);
    doc.text(d.dia, MARGIN + 3, c.y);
    c.y += 6;
    doc.setTextColor(TEXT);
    d.refeicoes.forEach((m) => {
      ensureSpace(doc, c, 12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(m.nome, MARGIN, c.y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(MUTED);
      doc.text(`${m.calorias} kcal`, PAGE_W - MARGIN, c.y, { align: "right" });
      doc.setTextColor(TEXT);
      c.y += 4;
      const lines = doc.splitTextToSize(m.descricao, CONTENT_W);
      doc.setFontSize(9);
      doc.text(lines, MARGIN, c.y);
      c.y += lines.length * 4 + 2;
    });
    c.y += 3;
  });

  drawFooter(doc);
  doc.save("viva-leve-cardapio-semanal.pdf");
}

// ---------- Shopping list ----------

const SHOPPING_CATEGORIES: Array<{ label: string; keys: RegExp }> = [
  { label: "Hortifruti", keys: /(tomate|cenoura|pepino|piment[aã]o|abobrinha|beterraba|espinafre|couve|alface|br[oó]colis|banana|maç[aã]|pera|abacate|frutas|morango|amora|blueberry|lim[aã]o|laranja|manga|mam[aã]o|abacaxi|batata|mandioca|inhame|cebola|alho|salsinha|coentro|manjeric[aã]o|hortel[aã])/i },
  { label: "Carnes", keys: /(frango|peito|carne|bife|patinho|alcatra|coxão|mignon|salm[aã]o|at[uú]m|sardinha|til[aá]pia|peixe|linguiça|bacon)/i },
  { label: "Laticínios", keys: /(leite|iogurte|queijo|cottage|requeij[aã]o|ricota|manteiga|nata|creme de leite|ovo)/i },
  { label: "Grãos", keys: /(arroz|feij[aã]o|lentilha|gr[aã]o.de.bico|quinoa|aveia|granola|farinha|macarr[aã]o|penne|espaguete|massa|p[aã]o|tapioca|chia|linhaça|linhaca|castanha|am[eê]ndoa|amendoim)/i },
  { label: "Temperos", keys: /(sal|pimenta|az[eê]ite|[oó]leo|vinagre|mostarda|shoyu|curry|orégano|páprica|cominho|noz.moscada|canela|gengibre|a[cç]afr[aã]o|tempero)/i },
];

function classifyIngredient(s: string) {
  for (const c of SHOPPING_CATEGORIES) if (c.keys.test(s)) return c.label;
  return "Outros";
}

function normalizeItem(s: string) {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}

export function downloadShoppingList(plan: NutriPlan) {
  const seen = new Set<string>();
  const items: string[] = [];
  for (const raw of plan.lista_compras || []) {
    const key = normalizeItem(raw);
    if (!seen.has(key)) { seen.add(key); items.push(raw.trim()); }
  }

  const groups: Record<string, string[]> = {};
  for (const it of items) {
    const cat = classifyIngredient(it);
    (groups[cat] ||= []).push(it);
  }

  const doc = newDoc("Lista de Compras Viva Leve");
  const c: Cursor = { y: drawHeader(doc, "Minha Lista de Compras", "Ingredientes do seu cardápio agrupados por categoria") };

  const order = ["Hortifruti", "Carnes", "Laticínios", "Grãos", "Temperos", "Outros"];
  for (const cat of order) {
    const list = groups[cat];
    if (!list?.length) continue;
    heading(doc, c, cat);
    for (const item of list) {
      ensureSpace(doc, c, 6);
      doc.setDrawColor(BRAND);
      doc.rect(MARGIN, c.y - 3.2, 3.5, 3.5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(TEXT);
      const lines = doc.splitTextToSize(item, CONTENT_W - 8);
      doc.text(lines, MARGIN + 6, c.y);
      c.y += lines.length * 4.5 + 1;
    }
    c.y += 3;
  }

  drawFooter(doc);
  doc.save("viva-leve-lista-de-compras.pdf");
}

// ---------- Educational guides ----------

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export function downloadGuidePdf(title: string, subtitle: string, sections: GuideSection[]) {
  const doc = newDoc(title);
  const c: Cursor = { y: drawHeader(doc, title, subtitle) };
  for (const s of sections) {
    heading(doc, c, s.heading);
    for (const p of s.paragraphs || []) { paragraph(doc, c, p); c.y += 2; }
    for (const b of s.bullets || []) bullet(doc, c, b);
    c.y += 4;
  }
  c.y += 4;
  paragraph(
    doc,
    c,
    "Conteúdo educativo de caráter informativo. Valores nutricionais são estimativas e não substituem o acompanhamento individual de um nutricionista.",
    9,
  );
  drawFooter(doc);
  doc.save(`viva-leve-${slug(title)}.pdf`);
}

// ---------- Personal shopping list (saved items) ----------

export interface ShoppingItemLike {
  name: string;
  quantity?: string | null;
  category: string;
  bought: boolean;
}

export function downloadPersonalShoppingList(items: ShoppingItemLike[]) {
  const groups: Record<string, ShoppingItemLike[]> = {};
  for (const it of items) (groups[it.category || "Outros"] ||= []).push(it);

  const doc = newDoc("Minha Lista de Compras");
  const c: Cursor = { y: drawHeader(doc, "Minha Lista de Compras", "Itens organizados por categoria") };

  for (const cat of Object.keys(groups).sort()) {
    heading(doc, c, cat);
    for (const item of groups[cat]) {
      ensureSpace(doc, c, 6);
      doc.setDrawColor(BRAND);
      doc.rect(MARGIN, c.y - 3.2, 3.5, 3.5);
      if (item.bought) {
        doc.setDrawColor(BRAND);
        doc.line(MARGIN + 0.6, c.y - 1.6, MARGIN + 3, c.y - 3);
        doc.line(MARGIN + 0.6, c.y - 1.6, MARGIN + 1.6, c.y - 0.4);
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(TEXT);
      const label = item.quantity ? `${item.name} — ${item.quantity}` : item.name;
      const lines = doc.splitTextToSize(label, CONTENT_W - 8);
      doc.text(lines, MARGIN + 6, c.y);
      c.y += lines.length * 4.5 + 1;
    }
    c.y += 3;
  }

  drawFooter(doc);
  doc.save("viva-leve-lista-de-compras.pdf");
}

// ---------- Progress / follow-up report ----------

export interface MeasurementLike {
  measured_at: string;
  weight?: number | null;
  waist?: number | null;
  hip?: number | null;
  arm?: number | null;
  notes?: string | null;
}

export interface MealLogLike {
  log_date: string;
  meal_type: string;
  done: boolean;
  eaten?: string | null;
}

export function downloadProgressReport(opts: {
  name: string;
  form?: NutriForm | null;
  plan?: NutriPlan | null;
  measurements: MeasurementLike[];
  logs: MealLogLike[];
  notes: Array<{ title?: string | null; content: string; created_at?: string }>;
}) {
  const { name, form, plan, measurements, logs, notes } = opts;
  const doc = newDoc("Meu Relatório Viva Leve");
  const c: Cursor = { y: drawHeader(doc, "Meu Relatório Viva Leve", name) };

  if (form) {
    heading(doc, c, "Meus dados");
    kv(doc, c, "Objetivo", form.objetivo || "—");
    kv(doc, c, "Idade", form.idade || "—");
    kv(doc, c, "Altura", form.altura ? `${form.altura} cm` : "—");
    kv(doc, c, "Peso informado", form.peso ? `${form.peso} kg` : "—");
    kv(doc, c, "Nível de atividade", form.atividade || "—");
    c.y += 4;
  }

  if (plan) {
    heading(doc, c, "Orientações do meu plano");
    if (plan.resumo) paragraph(doc, c, plan.resumo);
    kv(doc, c, "Meta calórica", `${plan.calorias_alvo} kcal/dia (estimativa)`);
    kv(doc, c, "Hidratação", `${(plan.hidratacao_ml / 1000).toFixed(1)} L/dia`);
    c.y += 4;
  }

  if (measurements.length) {
    heading(doc, c, "Medidas registradas");
    for (const m of measurements) {
      const parts: string[] = [];
      if (m.weight != null) parts.push(`peso ${m.weight} kg`);
      if (m.waist != null) parts.push(`cintura ${m.waist} cm`);
      if (m.hip != null) parts.push(`quadril ${m.hip} cm`);
      if (m.arm != null) parts.push(`braço ${m.arm} cm`);
      bullet(doc, c, `${new Date(`${m.measured_at}T12:00:00`).toLocaleDateString("pt-BR")} — ${parts.join(", ") || "sem valores"}${m.notes ? ` (${m.notes})` : ""}`);
    }
    c.y += 4;
  }

  if (logs.length) {
    heading(doc, c, "Acompanhamento das refeições");
    const byDate: Record<string, MealLogLike[]> = {};
    for (const l of logs) (byDate[l.log_date] ||= []).push(l);
    for (const date of Object.keys(byDate).sort().reverse().slice(0, 14)) {
      const done = byDate[date].filter((l) => l.done).length;
      bullet(
        doc,
        c,
        `${new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR")} — ${done} de ${byDate[date].length} refeições registradas como realizadas`,
      );
    }
    c.y += 4;
  }

  if (notes.length) {
    heading(doc, c, "Minhas observações");
    for (const n of notes) bullet(doc, c, `${n.title ? `${n.title}: ` : ""}${n.content}`);
    c.y += 4;
  }

  paragraph(
    doc,
    c,
    "Este relatório reúne apenas as informações que você registrou. Os valores nutricionais são estimativas e não substituem a avaliação individual de um nutricionista.",
    9,
  );

  drawFooter(doc);
  doc.save("viva-leve-meu-relatorio.pdf");
}
