import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { WorkoutExercise, WorkoutGoal, WorkoutLevel, WorkoutRegion } from "@/data/workouts";

export interface WorkoutLog {
  id: string;
  log_date: string;
  objetivo: string;
  region: string;
  level: string;
  exercises: WorkoutExercise[];
  created_at: string;
}

const today = () => new Date().toISOString().slice(0, 10);

/** Histórico de treinos salvo na conta do usuário. */
export function useWorkoutLogs() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setWorkouts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("workout_logs")
      .select("id, log_date, objetivo, region, level, exercises, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setWorkouts(
      (data ?? []).map((w) => ({
        ...w,
        exercises: (w.exercises as unknown as WorkoutExercise[]) ?? [],
      })),
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const save = useCallback(
    async (
      objetivo: WorkoutGoal,
      region: WorkoutRegion,
      level: WorkoutLevel,
      exercises: WorkoutExercise[],
    ): Promise<WorkoutLog | null> => {
      if (!user) return null;
      const { data } = await supabase
        .from("workout_logs")
        .insert({
          user_id: user.id,
          log_date: today(),
          objetivo,
          region,
          level,
          exercises: exercises as unknown as never,
        })
        .select("id, log_date, objetivo, region, level, exercises, created_at")
        .maybeSingle();
      if (!data) return null;
      const log = { ...data, exercises: (data.exercises as unknown as WorkoutExercise[]) ?? [] };
      setWorkouts((cur) => [log, ...cur]);
      return log;
    },
    [user],
  );

  const updateExercises = useCallback(
    async (id: string, exercises: WorkoutExercise[]) => {
      setWorkouts((cur) => cur.map((w) => (w.id === id ? { ...w, exercises } : w)));
      if (!user) return;
      await supabase
        .from("workout_logs")
        .update({ exercises: exercises as unknown as never })
        .eq("id", id)
        .eq("user_id", user.id);
    },
    [user],
  );

  const remove = useCallback(
    async (id: string) => {
      setWorkouts((cur) => cur.filter((w) => w.id !== id));
      if (!user) return;
      await supabase.from("workout_logs").delete().eq("id", id).eq("user_id", user.id);
    },
    [user],
  );

  return { workouts, loading, save, updateExercises, remove, reload: load };
}
