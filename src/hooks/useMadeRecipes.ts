import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const STORAGE_KEY = "viva-leve:made";

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
 * "Já fiz" recipes: persists in the database when signed in,
 * falling back to localStorage for guests (and merging on sign-in).
 */
export function useMadeRecipes() {
  const { user } = useAuth();
  const [made, setMade] = useState<number[]>(() => readLocal());

  useEffect(() => {
    if (!user) {
      setMade(readLocal());
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("recipes_made")
        .select("recipe_id")
        .eq("user_id", user.id);
      const dbIds = (data ?? []).map((r) => r.recipe_id as number);
      const localIds = readLocal();
      const toUpload = localIds.filter((id) => !dbIds.includes(id));
      if (toUpload.length > 0) {
        await supabase
          .from("recipes_made")
          .upsert(
            toUpload.map((recipe_id) => ({ user_id: user.id, recipe_id })),
            { onConflict: "user_id,recipe_id" },
          );
      }
      const merged = Array.from(new Set([...dbIds, ...localIds]));
      setMade(merged);
      writeLocal(merged);
    })();
  }, [user]);

  const toggleMade = useCallback(
    (id: number) => {
      setMade((current) => {
        const has = current.includes(id);
        const next = has ? current.filter((x) => x !== id) : [...current, id];
        writeLocal(next);
        if (user) {
          if (has) {
            supabase.from("recipes_made").delete().eq("user_id", user.id).eq("recipe_id", id);
          } else {
            supabase
              .from("recipes_made")
              .upsert({ user_id: user.id, recipe_id: id }, { onConflict: "user_id,recipe_id" });
          }
        }
        return next;
      });
    },
    [user],
  );

  const isMade = useCallback((id: number) => made.includes(id), [made]);

  return { made, toggleMade, isMade };
}
