
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();

// Utilizar la API key configurada en Windows
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const PORT = 3000;

// Cada asistente tendrá su propio agente
const agentes = {
  cda: "asistente-cda",
  cdaPro: "asistente-cda-pro",
  java: "programador-pro"
};

// Historial independiente por asistente y sesión
const conversaciones = new Map();

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  try {

    const { mensaje, sessionId, asistente } = req.body;

    // Validar información recibida
    if (
      typeof mensaje !== "string" ||
      !mensaje.trim() ||
      typeof sessionId !== "string" ||
      !/^[a-zA-Z0-9-]{1,100}$/.test(sessionId) ||
      !Object.hasOwn(agentes, asistente)
    ) {
      return res.status(400).json({
        error: "El mensaje, la sesión o el asistente no son válidos."
      });
    }

    // Identificador independiente para cada asistente
    const claveConversacion = `${asistente}:${sessionId}`;

    const anterior = conversaciones.get(claveConversacion);

    const parametros = {
      agent: agentes[asistente],
      input: mensaje.trim(),
      environment: anterior
        ? anterior.environmentId
        : "remote"
    };

    // Continuar solamente la conversación correspondiente
    if (anterior) {
      parametros.previous_interaction_id =
        anterior.interactionId;
    }

    const resultado = await client.interactions.create(
      parametros,
      { timeout: 300_000 }
    );

    // Guardar el historial de esta conversación
    conversaciones.set(claveConversacion, {
      interactionId: resultado.id,
      environmentId: resultado.environment_id
    });

    res.json({
      respuesta:
        resultado.output_text || "El agente no devolvió texto."
    });

  } catch (error) {
    console.error("Error del agente:", error);

    res.status(500).json({
      error: "No pude consultar al agente. Revisa CMD para ver el error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Centro de Asistentes IA disponible en http://localhost:${PORT}`);
});

