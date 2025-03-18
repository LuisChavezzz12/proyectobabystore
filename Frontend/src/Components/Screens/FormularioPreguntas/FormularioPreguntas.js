import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FormularioPreguntas.css"; // Estilos

const FormularioPreguntas = () => {
  const [pregunta, setPregunta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [faqs, setFaqs] = useState([]); // Estado para almacenar preguntas y respuestas

  // 🔹 Cargar preguntas desde el backend al cargar el componente
  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const response = await axios.get("https://backend-xi-ashen-51.vercel.app/faqs");
        setFaqs(response.data); // Guardamos las preguntas en el estado
      } catch (error) {
        console.error("Error al obtener preguntas:", error);
      }
    };

    obtenerPreguntas();
  }, []); // Se ejecuta solo una vez al montar el componente

  // 🔹 Manejar el envío de nuevas preguntas
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!pregunta.trim()) {
      setMensaje("❌ La pregunta no puede estar vacía.");
      return;
    }

    try {
      await axios.post("https://backend-xi-ashen-51.vercel.app/faqs", { pregunta });
      setMensaje("✅ Tu pregunta ha sido enviada con éxito.");
      setPregunta(""); // Limpiar el input

      // 🔄 Actualizar la lista de preguntas después de enviar una nueva
      const response = await axios.get("https://backend-xi-ashen-51.vercel.app/faqs");
      setFaqs(response.data);
    } catch (error) {
      console.error("❌ Error al enviar la pregunta:", error);
      setMensaje("❌ Hubo un error al enviar la pregunta. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="formulario-preguntas-container">
      <h2>¿Tienes alguna pregunta?</h2>
      <p>Déjanos tu pregunta y te responderemos lo antes posible.</p>
      
      <form onSubmit={handleSubmit} className="formulario-preguntas">
        <textarea
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Escribe tu pregunta aquí..."
          required
        ></textarea>
        
        {mensaje && <p className="mensaje">{mensaje}</p>}
        
        <button type="submit">Enviar Pregunta</button>
      </form>

      {/* 🔹 Mostrar las preguntas frecuentes */}
      <div className="preguntas-frecuentes">
        <h3>Preguntas Frecuentes</h3>
        {faqs.length === 0 ? (
          <p>No hay preguntas aún. ¡Sé el primero en preguntar! 😊</p>
        ) : (
          faqs.map((faq) => (
            <div key={faq._id} className="faq-item">
              <p><strong>❓ {faq.pregunta}</strong></p>
              <p>✅ {faq.respuesta || "Aún no respondida"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FormularioPreguntas;
