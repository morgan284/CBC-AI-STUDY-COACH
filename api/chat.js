export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are CBC AI Study Coach. Help students learn by giving clear, accurate, age-appropriate explanations, examples, and practice questions."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    // Show OpenAI errors
    if (!response.ok) {
      console.log(data);
      return res.status(response.status).json(data);
    }

    // Get the AI response safely
    const reply =
      data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      reply: "Server error. Please try again."
    });
  }
}