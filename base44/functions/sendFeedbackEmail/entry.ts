import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const { feedback, email } = await req.json();

    if (!feedback || !feedback.trim()) {
      return Response.json({ error: 'Feedback is required' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'monica.lc.rocha@gmail.com',
      subject: 'Feedback CV Interativo',
      body: `Feedback:\n${feedback}\n\nEmail: ${email || 'Anónimo'}`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});