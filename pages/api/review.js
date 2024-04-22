// pages/api/review.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code, language } = req.body; // Destructure language from the request body

    // Construct the system message based on the selected language
    const systemMessage = `Code review in ${
      language.charAt(0).toUpperCase() + language.slice(1)
    }`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4-turbo",
          messages: [
            {
              role: "system",
              content: systemMessage, // Use dynamic system message
            },
            {
              role: "user",
              content: code,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Send the OpenAI response back to the client
      res.status(200).json(response.data);
    } catch (error) {
      console.error("OpenAI API error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
