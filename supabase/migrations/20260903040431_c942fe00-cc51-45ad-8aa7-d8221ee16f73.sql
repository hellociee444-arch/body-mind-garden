ALTER TABLE public.favorites
  ADD CONSTRAINT favorites_user_recipe_key UNIQUE (user_id, recipe_id);