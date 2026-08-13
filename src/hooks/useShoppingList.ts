import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const SHOPPING_CATEGORIES = [
  "Hortaliças",
  "Frutas",
  "Carnes e proteínas",
  "Cereais e grãos",
  "Laticínios",
  "Ovos",
  "Temperos",
  "Outros",
] as const;

export type ShoppingCategory = (typeof SHOPPING_CATEGORIES)[number];

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string | null;
  category: string;
  bought: boolean;
}

const RULES: Array<{ category: ShoppingCategory; re: RegExp }> = [
  { category: "Hortaliças", re: /(tomate|cenoura|pepino|piment[aã]o|abobrinha|beterraba|espinafre|couve|alface|br[oó]colis|repolho|rúcula|rucula|batata|mandioca|inhame|cebola|alho|ab[oó]bora|chuchu|vagem|quiabo|berinjela|milho)/i },
  { category: "Frutas", re: /(banana|maç[aã]|pera|abacate|morango|amora|uva|lim[aã]o|laranja|manga|mam[aã]o|abacaxi|melancia|melão|melao|kiwi|goiaba|açaí|acai|tangerina|fruta)/i },
  { category: "Carnes e proteínas", re: /(frango|peito|carne|bife|patinho|alcatra|coxão|coxao|mignon|salm[aã]o|at[uú]m|sardinha|til[aá]pia|peixe|linguiça|linguica|bacon|mo[íi]da|carne mo|prote[íi]na|whey|soja|tofu|feij[aã]o|lentilha|gr[aã]o.de.bico|ervilha)/i },
  { category: "Cereais e grãos", re: /(arroz|quinoa|aveia|granola|farinha|macarr[aã]o|penne|espaguete|massa|p[aã]o|tapioca|chia|linhaça|linhaca|cuscuz|castanha|am[eê]ndoa|amendoim|noz|semente|polvilho|fub[aá])/i },
  { category: "Laticínios", re: /(leite|iogurte|queijo|cottage|requeij[aã]o|ricota|manteiga|nata|creme de leite|mussarela|parmes[aã]o)/i },
  { category: "Ovos", re: /\bovos?\b/i },
  { category: "Temperos", re: /(sal\b|pimenta|az[eê]ite|[oó]leo|vinagre|mostarda|shoyu|curry|or[eé]gano|p[aá]prica|cominho|noz.moscada|canela|gengibre|a[cç]afr[aã]o|tempero|salsinha|coentro|manjeric[aã]o|hortel[aã]|louro|caldo)/i },
];

export const classifyShoppingItem = (name: string): ShoppingCategory => {
  for (const r of RULES) if (r.re.test(name)) return r.category;
  return "Outros";
};

/** Lista de compras pessoal, salva na conta do usuário. */
export function useShoppingList() {
  const { user } = useAuth();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("shopping_items")
      .select("id, name, quantity, category, bought")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const addItem = useCallback(
    async (name: string, quantity?: string, category?: string) => {
      if (!user || !name.trim()) return;
      await supabase.from("shopping_items").insert({
        user_id: user.id,
        name: name.trim(),
        quantity: quantity?.trim() || null,
        category: category || classifyShoppingItem(name),
      });
      await load();
    },
    [user, load],
  );

  const addMany = useCallback(
    async (names: string[]) => {
      if (!user || !names.length) return 0;
      const existing = new Set(items.map((i) => i.name.trim().toLowerCase()));
      const rows = names
        .map((n) => n.trim())
        .filter((n) => n && !existing.has(n.toLowerCase()))
        .map((n) => ({
          user_id: user.id,
          name: n,
          category: classifyShoppingItem(n),
        }));
      if (!rows.length) return 0;
      await supabase.from("shopping_items").insert(rows);
      await load();
      return rows.length;
    },
    [user, items, load],
  );

  const toggle = useCallback(
    async (id: string, bought: boolean) => {
      setItems((cur) => cur.map((i) => (i.id === id ? { ...i, bought } : i)));
      await supabase.from("shopping_items").update({ bought }).eq("id", id);
    },
    [],
  );

  const remove = useCallback(
    async (id: string) => {
      setItems((cur) => cur.filter((i) => i.id !== id));
      await supabase.from("shopping_items").delete().eq("id", id);
    },
    [],
  );

  const clearBought = useCallback(async () => {
    if (!user) return;
    await supabase.from("shopping_items").delete().eq("user_id", user.id).eq("bought", true);
    await load();
  }, [user, load]);

  /** Marca ou desmarca todos os itens da lista de uma vez. */
  const toggleAll = useCallback(
    async (bought: boolean) => {
      if (!user) return;
      setItems((cur) => cur.map((i) => ({ ...i, bought })));
      await supabase.from("shopping_items").update({ bought }).eq("user_id", user.id);
    },
    [user],
  );

  return { items, loading, addItem, addMany, toggle, toggleAll, remove, clearBought, reload: load };
}
