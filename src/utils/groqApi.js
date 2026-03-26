const apiKey = import.meta.env.VITE_GROQ_API_KEY;

export const askGroq = async (patientName, patientAge, message, history = []) => {
  try {
    if (!message) {
      console.error("Message is empty");
      return null;
    }

    const historyMessages = history
      .filter((msg) => msg && typeof msg.text === "string" && msg.text.trim())
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text.replace(/<[^>]*>/g, "").trim(),
      }));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are AI Health Assistant, a knowledgeable and empathetic medical AI.
You are currently assisting a patient named ${patientName}, aged ${patientAge} years.

When responding to health queries, always format your reply using clean HTML like this:

<p>Brief intro sentence addressing the patient by name.</p>

<h4>🩺 Possible Conditions</h4>
<ul>
  <li><strong>Condition name:</strong> Short description.</li>
</ul>

<h4>⚠️ Precautions</h4>
<ul>
  <li>Precaution item.</li>
</ul>

<h4>💊 Common Medicines</h4>
<ul>
  <li><strong>Medicine:</strong> Usage note.</li>
</ul>

<h4>🏥 When to See a Doctor</h4>
<ul>
  <li>Warning sign.</li>
</ul>

<p><em>⚕️ Disclaimer: This is general information only and not a substitute for professional medical advice.</em></p>

Use only these HTML tags: p, h4, ul, li, strong, em, br. Do not use markdown, code blocks, or any other tags.`,
          },
          ...historyMessages,
          {
            role: "user",
            content: String(message),
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR RESPONSE:", data);
      throw new Error(data.error?.message || "API request failed.");
    }

    return data.choices?.[0]?.message?.content || "No response received.";
  } catch (error) {
    console.error("FETCH ERROR:", error);
    throw error;
  }
};