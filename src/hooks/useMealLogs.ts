import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const MEAL_TYPES = [
  "Café da manhã",
  "Almoço",
  "Lanche",
  "Jantar",
  "Outras refeições",
] as const;

export type MealType = (typeof MEAL_TYPES)[number];

export interface MealLog {
  id: string;
  log_date: string;
  meal_type: string;
  done: boolean;
  planned: string | null;
  eaten: string | null;
}

export const toISODate = (d: Date) => {
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

/** Registro de refeições do dia, salvo na conta do usuário. */
export function useMealLogs(date: string) {
  const { user } = useAuth();
  const [logs, setLogs] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setLogs([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("meal_logs")
      .select("id, log_date, meal_type, done, planned, eaten")
      .eq("user_id", user.id)
      .eq("log_date", date);
    setLogs(data ?? []);
    setLoading(false);
  }, [user, date]);

  useEffect(() => {
    load();
  }, [load]);

  const saveMeal = useCallback(
    async (mealType: string, patch: { done?: boolean; eaten?: string | null; planned?: string | null }) => {
      if (!user) return;
      const existing = logs.find((l) => l.meal_type === mealType);
      const row = {
        user_id: user.id,
        log_date: date,
        meal_type: mealType,
        done: patch.done ?? existing?.done ?? false,
        eaten: patch.eaten !== undefined ? patch.eaten : existing?.eaten ?? null,
        planned: patch.planned !== undefined ? patch.planned : existing?.planned ?? null,
      };
      // Atualização otimista
      setLogs((cur) => {
        const next = cur.filter((l) => l.meal_type !== mealType);
        return [...next, { id: existing?.id ?? `tmp-${mealType}`, ...row } as MealLog];
      });
      await supabase
        .from("meal_logs")
        .upsert(row, { onConflict: "user_id,log_date,meal_type" });
      load();
    },
    [user, date, logs, load],
  );

  const getMeal = useCallback(
    (mealType: string) => logs.find((l) => l.meal_type === mealType),
    [logs],
  );

  return { logs, loading, saveMeal, getMeal, reload: load };
}

/** Histórico completo de refeições registradas (para relatórios e resumo). */
export function useMealHistory(limitDays = 60) {
  const { user } = useAuth();
  const [history, setHistory] = useState<MealLog[]>([]);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("meal_logs")
        .select("id, log_date, meal_type, done, planned, eaten")
        .eq("user_id", user.id)
        .order("log_date", { ascending: false })
        .limit(limitDays * 6);
      setHistory(data ?? []);
    })();
  }, [user, limitDays]);

  return history;
}
