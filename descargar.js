
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const client = new GoogleGenAI({});

console.log("1. Creando el archivo en el entorno remoto...");

const interaction = await client.interactions.create({
  agent: "antigravity-preview-09-2026",
  input: "Crea el archivo /workspace/resumen.txt con una explicación sencilla de qué es la inteligencia artificial. Asegúrate de que el archivo exista en esa ruta.",
  environment: "remote",
}, { timeout: 300_000 });

console.log("Respuesta:", interaction.output_text);
console.log("2. Descargando resumen.txt...");

const bytes = await client.environments.files.download({
  environment: interaction.environment_id,
  path: "workspace/resumen.txt",
});

fs.writeFileSync("resumen.txt", Buffer.from(bytes));

console.log("3. ¡Archivo descargado correctamente!");
console.log("Ubicación:", process.cwd() + "\\resumen.txt");
