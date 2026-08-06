import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Utensils, Sparkles } from "lucide-react";

/**
 * Discreet "Continue de onde parou" strip shown on the home page for signed-in
 * users, linking to their last saved report and menu.
 */
const ContinueWhereYouLeft = () => {
  const { user } = useAuth();
  const [hasPlan, setHasPlan] = useState(false);
  const [objetivo, setObjetivo] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      setChecked(true);
      return;
    }
    supabase
      .from("nutri_plans")
      .select("objetivo")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setHasPlan(Boolean(data));
        setObjetivo(data?.objetivo ?? null);
        setChecked(true);
      });
  }, [user]);

  if (!user || !checked) return null;

  return (
    <section className="border-b border-border bg-accent/20">
      <div className="container mx-auto px-4 py-5">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <p className="text-sm text-muted-foreground truncate">
                <strong className="text-foreground font-heading">Continue de onde parou</strong>
                {objetivo ? ` — objetivo: ${objetivo}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:ml-auto">
              {hasPlan ? (
                <>
                  <Button asChild size="sm" variant="outline" className="gap-2">
                    <Link to="/minha-conta">
                      <FileText className="h-4 w-4" /> Meu último relatório
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="gap-2">
                    <Link to="/minha-conta">
                      <Utensils className="h-4 w-4" /> Meu último cardápio
                    </Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="sm" variant="outline" className="gap-2">
                  <Link to="/nutri-assistente">
                    Fazer minha avaliação <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContinueWhereYouLeft;
