import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "viva-leve:favorites";

const readFavorites = (): number[] => {
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

const writeFavorites = (ids: number[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* no-op */
  }
};

/**
 * Hook de favoritos persistidos em localStorage.
 * Sincroniza entre abas via evento `storage`.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => readFavorites());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setFavorites(readFavorites());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id: number) => {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites],
  );

  return { favorites, toggle, isFavorite };
}
