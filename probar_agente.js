
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

async function main() {
  console.log("Consultando a mi agente personalizado...\n");

  const resultado = await client.interactions.create({
    agent: "asistente-cda",
    input: "Calcula el recaudo total de estos tres días: lunes $150.000, martes $200.000 y miércoles $175.000. Presenta una tabla y una conclusión administrativa breve.",
    environment: "remote",
  }, {
    timeout: 300_000,
  });

  console.log("RESPUESTA DEL ASISTENTE CDA:\n");
  console.log(resultado.output_text);
}

main().catch((error) => {
  console.error("Ocurrió un error:");
  console.error(error);
});
