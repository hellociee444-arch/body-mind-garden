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

/* ------------------------------------------------------------------ *
 * Store global compartilhado: garante que o card, a página da receita
 * e a lista de favoritos sempre reflitam o mesmo estado.
 * ------------------------------------------------------------------ */
let state: number[] = readLocal();
const listeners = new Set<(ids: number[]) => void>();

const setState = (next: number[]) => {
  state = Array.from(new Set(next));
  writeLocal(state);
  listeners.forEach((l) => l(state));
};

const subscribe = (l: (ids: number[]) => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

let loadedForUser: string | null = null;

/**
 * Favorites: syncs with DB when authenticated, otherwise falls back to localStorage.
 */
export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>(state);

  useEffect(() => subscribe(setFavorites), []);

  // Carrega favoritos do banco ao entrar e mescla os locais (apenas uma vez por usuário).
  useEffect(() => {
    if (!user) {
      loadedForUser = null;
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
      const dbIds = (data ?? []).map((r) => r.recipe_id as number);
      const localIds = readLocal();
      const toUpload = localIds.filter((id) => !dbIds.includes(id));
      if (toUpload.length > 0) {
        await supabase
          .from("favorites")
          .upsert(
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
      const next = has ? state.filter((x) => x !== id) : [...state, id];
      // Atualização otimista e imediata na interface.
      setState(next);

      if (!user) return;

      if (has) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("recipe_id", id);
        if (error) setState([...state, id]); // rollback
      } else {
        const { error } = await supabase
          .from("favorites")
          .upsert(
            { user_id: user.id, recipe_id: id },
            { onConflict: "user_id,recipe_id", ignoreDuplicates: true },
          );
        if (error) setState(state.filter((x) => x !== id)); // rollback
      }
    },
    [user],
  );

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}
