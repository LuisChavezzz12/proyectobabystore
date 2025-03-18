import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditAbout.css";

const EditAbout = () => {
  const [aboutData, setAboutData] = useState({
    mision: "",
    vision: "",
    historia: "",
    valores: [], // Asegúrate de que sea un arreglo vacío
    equipo: [], // Asegúrate de que sea un arreglo vacío
    contacto: { email: "", telefono: "", direccion: "" }, // Asegúrate de que contacto esté correctamente inicializado
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "https://backend-xi-ashen-51.vercel.app/nosotros",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Verifica la respuesta de la API
        console.log("Datos recibidos del backend: ", data);

        // Asegúrate de que 'valores' sea un arreglo
        if (typeof data.valores === "string") {
          data.valores = data.valores.split(",").map((val) => val.trim());
        }

        // Verifica que 'contacto' esté correctamente definido
        if (!data.contacto) {
          console.log("¡Error! El objeto 'contacto' no está definido.");
          data.contacto = { email: "", telefono: "", direccion: "" }; // Si no existe 'contacto', lo inicializamos
        }

        // Si 'contacto' está vacío o no tiene propiedades, inicializamos
        if (!data.contacto.email) data.contacto.email = "";
        if (!data.contacto.telefono) data.contacto.telefono = "";
        if (!data.contacto.direccion) data.contacto.direccion = "";

        setAboutData(data);
        setLoading(false);
      } catch (err) {
        setError("No se pudo cargar los datos.");
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Aquí manejas el estado de la edición de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "valores") {
      setAboutData((prevData) => ({
        ...prevData,
        valores: value.split(",").map((val) => val.trim()), // Convierte el string a arreglo
      }));
    } else if (name === "equipo") {
      setAboutData((prevData) => ({
        ...prevData,
        equipo: value.split(",").map((member) => member.trim()), // Convierte el string a arreglo
      }));
    } else {
      setAboutData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "https://backend-xi-ashen-51.vercel.app/nosotros",
        aboutData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Datos actualizados con éxito");
    } catch (err) {
      setError("Hubo un error al actualizar los datos.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Editar Acerca De</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Misión:
          <textarea
            name="mision"
            value={aboutData.mision}
            onChange={handleChange}
          />
        </label>
        <label>
          Visión:
          <textarea
            name="vision"
            value={aboutData.vision}
            onChange={handleChange}
          />
        </label>
        <label>
          Historia:
          <textarea
            name="historia"
            value={aboutData.historia}
            onChange={handleChange}
          />
        </label>
        <label>
          Valores (separados por comas):
          <input
            type="text"
            name="valores"
            value={aboutData.valores.join(", ")} // Usamos join para mostrar como cadena
            onChange={handleChange}
          />
        </label>

        <button type="submit">Actualizar Datos</button>
      </form>
    </div>
  );
};

export default EditAbout;
