import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const STORAGE_KEY = "viva-leve:favorites";

const readLocal = (): number[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? Array.from(new Set(parsed.filter((x) => typeof x === "number")))
      : [];
  } catch {
    return [];
  }
};

const writeLocal = (ids: number[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* no-op */
  }
};

let state: number[] = readLocal();
const listeners = new Set<(ids: number[]) => void>();
const pendingOperations = new Map<number, number>();
let loadedForUser: string | null = null;

const setState = (next: number[]) => {
  state = Array.from(new Set(next));
  writeLocal(state);
  listeners.forEach((listener) => listener(state));
};

const subscribe = (listener: (ids: number[]) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Favoritos sincronizados entre cards, detalhe, cabeçalho e lista. */
export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>(state);

  useEffect(() => subscribe(setFavorites), []);

  useEffect(() => {
    if (!user) {
      loadedForUser = null;
      setState(readLocal());
      return;
    }
    if (loadedForUser === user.id) return;
    loadedForUser = user.id;

    (async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("recipe_id")
        .eq("user_id", user.id);
      if (error) {
        loadedForUser = null;
        return;
      }

      const dbIds = Array.from(new Set((data ?? []).map((row) => row.recipe_id as number)));
      const localIds = readLocal();
      const toUpload = localIds.filter((id) => !dbIds.includes(id));
      if (toUpload.length > 0) {
        await supabase.from("favorites").upsert(
          toUpload.map((recipe_id) => ({ user_id: user.id, recipe_id })),
          { onConflict: "user_id,recipe_id", ignoreDuplicates: true },
        );
      }
      setState([...dbIds, ...localIds]);
    })();
  }, [user]);

  const toggle = useCallback(
    async (id: number) => {
      const has = state.includes(id);
      const next = has ? state.filter((item) => item !== id) : [...state, id];
      const operation = (pendingOperations.get(id) ?? 0) + 1;
      pendingOperations.set(id, operation);
      setState(next);

      if (!user) return;

      const result = has
        ? await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", id)
        : await supabase.from("favorites").upsert(
            { user_id: user.id, recipe_id: id },
            { onConflict: "user_id,recipe_id", ignoreDuplicates: true },
          );

      // Só desfaz a alteração se esta ainda for a última ação para a receita.
      if (result.error && pendingOperations.get(id) === operation) {
        setState(has ? [...state, id] : state.filter((item) => item !== id));
      }
      if (pendingOperations.get(id) === operation) pendingOperations.delete(id);
    },
    [user],
  );

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}
