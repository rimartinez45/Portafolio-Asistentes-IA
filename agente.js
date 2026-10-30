
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

console.log("Iniciando el agente...\n");

const stream = await client.interactions.create({
  agent: "antigravity-preview-09-2026",
  input: "Crea un archivo llamado resumen.txt con una explicación sencilla de qué es la inteligencia artificial. Después, lee el archivo y explica brevemente su contenido.",
  environment: "remote",
  stream: true,
});

for await (const event of stream) {
  console.log("Evento recibido:", event);

  if (event.event_type === "step.stop" && event.usage) {
    console.log("Uso registrado:", event.usage);
  }
}

console.log("\nTransmisión finalizada.");
