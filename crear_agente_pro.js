
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

async function main() {
  console.log("Creando Asistente CDA Pro con una habilidad especializada...");

  const agente = await client.agents.create({
    id: "asistente-cda-pro",
    base_agent: "antigravity-preview-09-2026",

    system_instruction: `
      Eres un asistente especializado en la gestión técnica
      y administrativa de Centros de Diagnóstico Automotor de Colombia.
      Responde en español, de forma clara y profesional.
      No inventes normas, numerales ni resultados de auditoría.
    `,

    base_environment: {
      type: "remote",
      sources: [
        {
          type: "inline",
          target: ".agents/AGENTS.md",
          content: `
# Instrucciones del Asistente CDA

- Distingue hechos, observaciones y recomendaciones.
- No inventes datos ni requisitos normativos.
- Si faltan datos, solicita aclaraciones.
- Protege la información confidencial de clientes y empleados.
- Presenta los informes con títulos y conclusiones claras.
          `
        },
        {
          type: "inline",
          target: ".agents/skills/auditoria-cda/SKILL.md",
          content: `---
name: auditoria-cda
description: Elaborar observaciones de auditoría para procesos de un CDA.
---

# Habilidad de auditoría CDA

Cuando el usuario solicite una observación de auditoría:

1. Identifica el proceso o actividad evaluada.
2. Separa los hechos observados de las conclusiones.
3. Redacta una observación positiva o una no conformidad,
   según la evidencia suministrada.
4. Propón acciones de mejora cuando sean pertinentes.
5. No declares incumplimientos sin evidencia suficiente.
6. No inventes numerales de normas ni requisitos legales.

Entrega el resultado con:
- Tipo de observación.
- Redacción propuesta.
- Evidencia que debe respaldarla.
- Recomendación, si aplica.
`
        }
      ]
    }
  });

  console.log("\nAgente creado:", agente.id);
  console.log("\nProbando la nueva habilidad...");

  const prueba = await client.interactions.create({
    agent: "asistente-cda-pro",
    environment: "remote",
    input: `
      Redacta una observación positiva de auditoría para un inspector
      de un CDA que verificó correctamente el estado del frenómetro
      y los registros de mantenimiento. No inventes numerales de normas.
    `
  }, { timeout: 300_000 });

  console.log("\nRESPUESTA DEL AGENTE:\n");
  console.log(prueba.output_text);
}

main().catch((error) => {
  console.error("Se presentó un error:");
  console.error(error.message);
});
