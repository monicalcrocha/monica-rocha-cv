import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, company, phone, reason } = await req.json();

    if (!name || !email || !company) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'monica.lc.rocha@gmail.com',
      subject: 'Pedido de contacto — CV Interativo',
      body: `Nome: ${name}\nEmail: ${email}\nEmpresa: ${company}\nTelefone: ${phone || 'N/A'}\nMotivo: ${reason || 'N/A'}`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});