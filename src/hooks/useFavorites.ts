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
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "number") : [];
  } catch {
    return [];
  }
};

const writeLocal = (ids: number[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch { /* no-op */ }
};

/**
 * Favorites: syncs with DB when authenticated, otherwise falls back to localStorage.
 */
export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>(() => readLocal());

  // Load favorites from DB when user signs in, and merge any local ones.
  useEffect(() => {
    if (!user) {
      setFavorites(readLocal());
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("favorites")
        .select("recipe_id")
        .eq("user_id", user.id);
      const dbIds = (data ?? []).map((r) => r.recipe_id as number);
      const localIds = readLocal();
      const toUpload = localIds.filter((id) => !dbIds.includes(id));
      if (toUpload.length > 0) {
        await supabase.from("favorites").insert(
          toUpload.map((recipe_id) => ({ user_id: user.id, recipe_id })),
        );
      }
      const merged = Array.from(new Set([...dbIds, ...localIds]));
      setFavorites(merged);
      writeLocal(merged);
    })();
  }, [user]);

  const toggle = useCallback(
    async (id: number) => {
      setFavorites((current) => {
        const has = current.includes(id);
        const next = has ? current.filter((x) => x !== id) : [...current, id];
        writeLocal(next);
        if (user) {
          if (has) {
            supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", id);
          } else {
            supabase.from("favorites").insert({ user_id: user.id, recipe_id: id });
          }
        }
        return next;
      });
    },
    [user],
  );

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}
