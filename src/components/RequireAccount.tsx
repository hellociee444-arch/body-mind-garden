import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

/** Aviso acolhedor para áreas que precisam de conta. */
export default function RequireAccount({ message }: { message?: string }) {
  return (
    <Card className="border-primary/40 bg-primary/5">
      <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm">
          {message ||
            "Crie sua conta gratuita para salvar suas informações. Assim você não precisa preencher nada de novo quando voltar."}
        </p>
        <Button asChild size="sm" className="shrink-0">
          <Link to="/auth">
            <LogIn className="h-4 w-4 mr-1" /> Criar conta ou entrar
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
