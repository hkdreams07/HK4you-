export default async function handler(req, res) {
  const userInput = req.body.message;

  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: userInput })
  });

  const data = await response.json();
  const reply = data[0]?.generated_text || "Sorry, I’m confused!";
  res.status(200).json({ reply });
}