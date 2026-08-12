import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { NutriForm, NutriPlan } from "@/lib/pdf";

/** Carrega a avaliação e o cardápio salvos do usuário. */
export function useNutriPlan() {
  const { user } = useAuth();
  const [form, setForm] = useState<NutriForm | null>(null);
  const [plan, setPlan] = useState<NutriPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setForm(null);
      setPlan(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("nutri_plans")
      .select("form_data, plan, objetivo")
      .eq("user_id", user.id)
      .maybeSingle();
    if (data) {
      setForm(data.form_data as unknown as NutriForm);
      setPlan(data.plan as unknown as NutriPlan);
    } else {
      setForm(null);
      setPlan(null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  return { form, plan, loading, reload: load };
}
