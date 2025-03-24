import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FormularioPreguntas.css";

const FormularioPreguntas = () => {
  const [pregunta, setPregunta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const preguntasPorPagina = 3;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const response = await axios.get(
          "https://backend-xi-ashen-51.vercel.app/faqs"
        );
        setFaqs(response.data);
      } catch (error) {
        console.error("Error al obtener preguntas:", error);
      }
    };

    obtenerPreguntas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    if (!pregunta.trim()) {
      setMensaje("❌ La pregunta no puede estar vacía.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://backend-xi-ashen-51.vercel.app/faqs", { pregunta });
      setMensaje("✅ Tu pregunta ha sido enviada con éxito.");
      setPregunta("");
      const response = await axios.get("https://backend-xi-ashen-51.vercel.app/faqs");
      setFaqs(response.data);
    } catch (error) {
      console.error("❌ Error al enviar la pregunta:", error);
      setMensaje("❌ Hubo un error al enviar la pregunta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
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

  const faqsPaginados = faqs.slice(
    (paginaActual - 1) * preguntasPorPagina,
    paginaActual * preguntasPorPagina
  );

  const totalPaginas = Math.ceil(faqs.length / preguntasPorPagina);

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="formulario-preguntas-grid">
      <div className="formulario-preguntas-col">
        <h2>❓ ¿Tienes alguna pregunta?</h2>
        <p className="descripcion">
          Déjanos tu duda y un administrador te responderá pronto.
        </p>

        <form onSubmit={handleSubmit} className="formulario-preguntas">
          <textarea
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            required
          ></textarea>

          {mensaje && <p className="mensaje">{mensaje}</p>}

          <button type="submit" disabled={loading}>
            {loading ? (
              <div className="spinner-wrapper">
                <span className="spinner" /> Enviando...
              </div>
            ) : (
              "Enviar Pregunta"
            )}
          </button>
        </form>
      </div>

      <div className="preguntas-frecuentes-col">
        <h3>📚 Preguntas Frecuentes</h3>
        {faqs.length === 0 ? (
          <p>No hay preguntas aún. ¡Sé el primero en preguntar! 😊</p>
        ) : (
          <>
            {faqsPaginados.map((faq) => (
              <div key={faq._id} className="faq-item">
                <p className="pregunta">❓ {faq.pregunta}</p>
                <p className="respuesta">
                  ✅ {faq.respuesta ? (
                    <span
                      className="ver-respuesta"
                      onClick={() => abrirModal(faq.respuesta)}
                    >
                      Ver respuesta
                    </span>
                  ) : (
                    "Aún no respondida"
                  )}
                </p>
              </div>
            ))}

            <div className="paginacion">
              <button onClick={irPaginaAnterior} disabled={paginaActual === 1}>
                ⬅ Atrás
              </button>
              {[...Array(totalPaginas)].map((_, i) => (
                <button
                  key={i + 1}
                  className={paginaActual === i + 1 ? "activo" : ""}
                  onClick={() => setPaginaActual(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas}>
                Siguiente ➡
              </button>
            </div>
          </>
        )}
      </div>

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

export default FormularioPreguntas;