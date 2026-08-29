export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const { name, email, org, message } = await request.json();

      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      let summary = "New contact form submission.";
      try {
        const summaryRes = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content:
                  "You summarize contact-form inquiries in 1-2 short sentences: what the person wants, and their organization if mentioned. Be concise and specific, no fluff, no preamble.",
              },
              {
                role: "user",
                content: `Name: ${name}\nOrganization: ${org || "Not provided"}\nMessage: ${message}`,
              },
            ],
            max_tokens: 120,
            temperature: 0.3,
          }),
        });
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          summary = summaryData.choices?.[0]?.message?.content?.trim() || summary;
        }
      } catch {
        // Fall back to the default summary if DeepSeek is unreachable.
      }

      const subject = `New inquiry${org ? ` from ${org}` : ` from ${name}`}`;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Upoma Contact Form <contact@upoma.one>",
          to: ["syednaved.abdullah@proton.me"],
          reply_to: email,
          subject,
          text: `Summary: ${summary}\n\n---\n\nName: ${name}\nEmail: ${email}\nOrganization: ${org || "Not provided"}\n\nMessage:\n${message}`,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        return new Response(JSON.stringify({ error: "Failed to send email", detail: errText }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Unexpected error", detail: String(err) }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
