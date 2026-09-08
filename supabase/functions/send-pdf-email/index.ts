import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const BodySchema = z.object({
  to: z.string().email().max(254),
  subject: z.string().min(1).max(150),
  label: z.string().min(1).max(80),
  filename: z.string().regex(/^[a-z0-9-_]+\.pdf$/i).max(120),
  // ~6 MB em base64
  pdfBase64: z.string().min(100).max(8_000_000),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método não permitido" }, 405);

  // Autenticação: apenas usuários logados, e somente para o próprio e-mail.
  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return json({ error: "Faça login para enviar PDFs." }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user?.email) return json({ error: "Sessão inválida. Entre novamente." }, 401);

  let parsed;
  try {
    parsed = BodySchema.safeParse(await req.json());
  } catch {
    return json({ error: "Corpo inválido" }, 400);
  }
  if (!parsed.success) return json({ error: "Dados inválidos", details: parsed.error.flatten().fieldErrors }, 400);
  const { to, subject, label, filename, pdfBase64 } = parsed.data;

  if (to.toLowerCase() !== userData.user.email.toLowerCase()) {
    return json({ error: "Por segurança, o PDF só pode ser enviado para o e-mail da sua conta." }, 403);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return json({ error: "Envio de e-mail não configurado (RESEND_API_KEY ausente)." }, 503);
  const from = Deno.env.get("EMAIL_FROM") ?? "Viva Leve <onboarding@resend.dev>";

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#1f2937;max-width:560px;margin:auto">
      <div style="background:#4A7C59;color:#fff;padding:16px 20px;border-radius:10px 10px 0 0">
        <strong style="font-size:18px">VIVA LEVE</strong><br/><span style="font-size:12px">Coma bem. Viva leve.</span>
      </div>
      <div style="padding:20px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 10px 10px">
        <p>Olá!</p>
        <p>Segue em anexo o seu PDF: <strong>${label}</strong>.</p>
        <p style="color:#6b7280;font-size:12px">Este material é educativo e não substitui a avaliação de um nutricionista.</p>
      </div>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text: `Viva Leve — segue em anexo o seu PDF: ${label}.`,
      attachments: [{ filename, content: pdfBase64 }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("resend error", res.status, detail);
    return json({ error: "O serviço de e-mail recusou o envio. Tente novamente mais tarde." }, 502);
  }

  return json({ ok: true });
});
