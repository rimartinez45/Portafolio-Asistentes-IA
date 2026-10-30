
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

async function main() {
  console.log("Creando tu agente personalizado para CDA...");

  const agente = await client.agents.create({
    id: "asistente-cda",
    base_agent: "antigravity-preview-09-2026",
    system_instruction: `
      Eres un asistente especializado en Centros de Diagnóstico Automotor (CDA) de Colombia.

      Tus funciones son:
      1. Ayudar a calcular y resumir recaudos.
      2. Organizar datos en tablas e informes.
      3. Apoyar la redacción de correos y reportes administrativos.
      4. Explicar temas técnicos de manera sencilla y ordenada.

      Responde en español, con claridad y profesionalismo.
      No inventes cifras, normas ni resultados.
      Si falta información, pregunta antes de asumir.
      En cálculos, muestra las operaciones y el resultado.
    `,
  });

  console.log("\n¡Agente creado!");
  console.log("Identificador:", agente.id);
}

main().catch((error) => {
  console.error("No se pudo crear el agente:");
  console.error(error);
});

