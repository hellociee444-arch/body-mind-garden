import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { capturePdf } from "@/lib/pdf";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface PdfEmailOption {
  /** Nome exibido para o usuário (ex.: "Cardápio semanal"). */
  label: string;
  /** Reutiliza o gerador de PDF já existente. */
  run: () => void | Promise<void>;
}

interface Props {
  options: PdfEmailOption[];
  className?: string;
}

/**
 * Bloco discreto "Enviar PDF para meu e-mail".
 * Reaproveita os geradores de PDF existentes e envia o arquivo como anexo.
 */
export default function SendPdfEmail({ options, className }: Props) {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");
  const [selected, setSelected] = useState(0);
  const [sending, setSending] = useState(false);

  // Mantém o e-mail da conta como padrão quando ele carrega depois.
  if (!email && user?.email) setEmail(user.email);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const send = async () => {
    const opt = options[selected];
    if (!opt || !valid) return;
    setSending(true);
    try {
      const pdf = await capturePdf(opt.run);
      if (!pdf) throw new Error("Não foi possível gerar o PDF.");
      const { data, error } = await supabase.functions.invoke("send-pdf-email", {
        body: {
          to: email.trim(),
          subject: `Viva Leve — ${opt.label}`,
          label: opt.label,
          filename: pdf.filename,
          pdfBase64: pdf.base64,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`PDF enviado para ${email.trim()}.`);
    } catch (e) {
      const msg = (e as Error).message || "";
      toast.error(
        msg.includes("não configurado") || msg.includes("RESEND")
          ? "O envio de e-mails ainda não foi configurado."
          : msg || "Não foi possível enviar o PDF.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={cn("rounded-lg border border-dashed border-border bg-muted/30 p-3 text-sm", className)}>
      <p className="flex items-center gap-2 font-medium mb-2">
        <Mail className="h-4 w-4 text-primary" /> Enviar PDF para meu e-mail
      </p>
      {!user ? (
        <p className="text-xs text-muted-foreground">Entre na sua conta para enviar PDFs para o seu e-mail.</p>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2">
          {options.length > 1 && (
            <Select value={String(selected)} onValueChange={(v) => setSelected(Number(v))}>
              <SelectTrigger className="sm:w-56 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {options.map((o, i) => (
                  <SelectItem key={o.label} value={String(i)}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Input
            type="email"
            className="h-9 flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            aria-label="Seu e-mail"
          />
          <Button size="sm" className="h-9" onClick={send} disabled={!valid || sending}>
            {sending ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Mail className="h-4 w-4 mr-1" />}
            Enviar
          </Button>
        </div>
      )}
    </div>
  );
}
