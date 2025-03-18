import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPreguntas.css"; // Asegúrate de tener el archivo de estilos

const AdminPreguntas = () => {
  const [faqs, setFaqs] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [respuestas, setRespuestas] = useState({}); // Estado para manejar respuestas individuales

  // Obtener todas las preguntas desde el backend
  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const response = await axios.get("https://backend-xi-ashen-51.vercel.app/faqs");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error al obtener preguntas:", error);
      }
    };

    obtenerPreguntas();
  }, []);

  // Función para actualizar el estado de una respuesta
  const manejarCambioRespuesta = (id, valor) => {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
  };

  // Función para responder una pregunta
  const responderPregunta = async (id) => {
    const nuevaRespuesta = respuestas[id];

    if (!nuevaRespuesta || nuevaRespuesta.trim() === "") {
      setMensaje("❌ La respuesta no puede estar vacía.");
      return;
    }

    try {
      await axios.put(`https://backend-xi-ashen-51.vercel.app/faqs/${id}`, { respuesta: nuevaRespuesta });
      setMensaje("✅ Pregunta respondida con éxito.");

      // Recargar las preguntas después de responder
      const response = await axios.get("https://backend-xi-ashen-51.vercel.app/faqs");
      setFaqs(response.data);
      setRespuestas((prev) => ({ ...prev, [id]: "" })); // Limpiar respuesta después de enviar
    } catch (error) {
      console.error("Error al responder la pregunta:", error);
      setMensaje("❌ Hubo un error al responder la pregunta.");
    }
  };

  return (
    <div className="admin-preguntas-container">
      <h2>Administrar Preguntas Frecuentes</h2>
      <p>Solo los administradores pueden responder preguntas.</p>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="preguntas-lista">
        {faqs.length === 0 ? (
          <p>No hay preguntas pendientes.</p>
        ) : (
          faqs.map((faq) => (
            <div key={faq._id} className="pregunta-item">
              <p className="pregunta-texto"><strong>❓ {faq.pregunta}</strong></p>
              <p className="respuesta-texto">✅ {faq.respuesta || "Aún no respondida"}</p>

              {!faq.respuesta && (
                <div className="respuesta-form">
                  <input
                    type="text"
                    placeholder="Escribe la respuesta..."
                    value={respuestas[faq._id] || ""}
                    onChange={(e) => manejarCambioRespuesta(faq._id, e.target.value)}
                  />
                  <button onClick={() => responderPregunta(faq._id)}>Responder</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPreguntas;
