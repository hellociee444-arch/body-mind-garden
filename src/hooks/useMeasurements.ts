import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Measurement {
  id: string;
  measured_at: string;
  weight: number | null;
  waist: number | null;
  hip: number | null;
  arm: number | null;
  notes: string | null;
}

export type MeasurementInput = Omit<Measurement, "id">;

/** Medidas corporais registradas pelo usuário. */
export function useMeasurements() {
  const { user } = useAuth();
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setMeasurements([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("measurements")
      .select("id, measured_at, weight, waist, hip, arm, notes")
      .eq("user_id", user.id)
      .order("measured_at", { ascending: true });
    setMeasurements(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const add = useCallback(
    async (input: MeasurementInput) => {
      if (!user) return { error: "Entre na sua conta para registrar." };
      const { error } = await supabase.from("measurements").insert({ ...input, user_id: user.id });
      if (error) return { error: error.message };
      await load();
      return {};
    },
    [user, load],
  );

  const remove = useCallback(
    async (id: string) => {
      if (!user) return;
      await supabase.from("measurements").delete().eq("id", id);
      await load();
    },
    [user, load],
  );

  return { measurements, loading, add, remove, reload: load };
}
