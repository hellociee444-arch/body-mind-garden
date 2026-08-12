import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface UserNote {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
}

/** Observações pessoais do usuário. */
export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setNotes([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("user_notes")
      .select("id, title, content, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setNotes(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const add = useCallback(
    async (content: string, title?: string) => {
      if (!user || !content.trim()) return;
      await supabase.from("user_notes").insert({
        user_id: user.id,
        content: content.trim(),
        title: title?.trim() || null,
      });
      await load();
    },
    [user, load],
  );

  const remove = useCallback(
    async (id: string) => {
      setNotes((cur) => cur.filter((n) => n.id !== id));
      await supabase.from("user_notes").delete().eq("id", id);
    },
    [],
  );

  return { notes, loading, add, remove, reload: load };
}
