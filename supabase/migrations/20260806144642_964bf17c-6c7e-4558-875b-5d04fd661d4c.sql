CREATE TABLE public.recipes_made (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, recipe_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recipes_made TO authenticated;
GRANT ALL ON public.recipes_made TO service_role;

ALTER TABLE public.recipes_made ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own made recipes" ON public.recipes_made
FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);