CREATE TABLE public.nutri_plan_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  objetivo text,
  form_data jsonb NOT NULL,
  plan jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.nutri_plan_history TO authenticated;
GRANT ALL ON public.nutri_plan_history TO service_role;

ALTER TABLE public.nutri_plan_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own plan history" ON public.nutri_plan_history
FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX nutri_plan_history_user_created_idx ON public.nutri_plan_history (user_id, created_at DESC);