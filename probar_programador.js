
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

async function main() {
  const respuesta = await client.interactions.create({
    agent: "programador-pro",
    input: "Explícame qué es una variable en Java y dame un ejemplo sencillo para un principiante.",
    environment: "remote"
  }, { timeout: 300000 });

  console.log("\nRespuesta de Java Mentor Pro:\n");
  console.log(respuesta.output_text);
}

main().catch((error) => {
  console.error("Ocurrió un error:", error.message);
});
