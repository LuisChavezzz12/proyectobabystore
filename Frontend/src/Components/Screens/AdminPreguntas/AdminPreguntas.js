import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPreguntas.css";

const AdminPreguntas = () => {
  const [faqs, setFaqs] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [respuestas, setRespuestas] = useState({});
  const [modalAbierto, setModalAbierto] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");

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

  const manejarCambioRespuesta = (id, valor) => {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
  };

  const responderPregunta = async (id) => {
    const nuevaRespuesta = respuestas[id];

    if (!nuevaRespuesta || nuevaRespuesta.trim() === "") {
      setMensaje("❌ La respuesta no puede estar vacía.");
      return;
    }

    try {
      await axios.put(`https://backend-xi-ashen-51.vercel.app/faqs/${id}`, { respuesta: nuevaRespuesta });
      setMensaje("✅ Pregunta respondida con éxito.");
      const response = await axios.get("https://backend-xi-ashen-51.vercel.app/faqs");
      setFaqs(response.data);
      setRespuestas((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Error al responder la pregunta:", error);
      setMensaje("❌ Hubo un error al responder la pregunta.");
    }
  };

  const abrirModal = (respuesta) => {
    setRespuestaSeleccionada(respuesta || "Aún no respondida");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setRespuestaSeleccionada("");
  };

  return (
    <div className="admin-preguntas-container">
      <h2>Administrar Preguntas Frecuentes</h2>
      <p>Solo los administradores pueden responder preguntas.</p>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <table className="tabla-preguntas">
        <thead>
          <tr>
            <th>Pregunta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {faqs.length === 0 ? (
            <tr>
              <td colSpan="2">No hay preguntas pendientes.</td>
            </tr>
          ) : (
            faqs.map((faq) => (
              <tr key={faq._id}>
                <td>{faq.pregunta}</td>
                <td>
                  <button onClick={() => abrirModal(faq.respuesta)}>Ver</button>
                  {!faq.respuesta && (
                    <>
                      <input
                        type="text"
                        placeholder="Escribe la respuesta..."
                        value={respuestas[faq._id] || ""}
                        onChange={(e) => manejarCambioRespuesta(faq._id, e.target.value)}
                      />
                      <button onClick={() => responderPregunta(faq._id)}>Responder</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalAbierto && (
        <div className="modal">
          <div className="modal-contenido">
            <span className="cerrar" onClick={cerrarModal}>
              &times;
            </span>
            <h3>Respuesta</h3>
            <p>{respuestaSeleccionada}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPreguntas;
