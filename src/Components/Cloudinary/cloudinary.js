import React, { useState } from 'react';

const Cloudinary = () => {
  const preset_name = "v8oot77t"; // Nombre del preset de Cloudinary
  const cloud_name = "dop92wdwk"; // Nombre del Cloudinary

  const [image, setImage] = useState(''); // Estado para la URL de la imagen
  const [loading, setLoading] = useState(false); // Estado para indicar carga

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', preset_name);

    setLoading(true);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const file = await response.json();
      setImage(file.secure_url); // Guardamos la URL de la imagen
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  // Función para copiar la URL al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(image).then(() => {
      alert("URL copiada al portapapeles!");
    }).catch(err => {
      console.error("Error al copiar la URL:", err);
    });
  };

  return (
    <div>
      <h1>Subir Imagen</h1>
      <input type="file" name="file" onChange={uploadImage} />

      {loading ? (
        <h3>Cargando...</h3>
      ) : (
        image && (
          <div>
            <img src={image} alt="Imagen subida" style={{ maxWidth: '300px', marginTop: '10px' }} />
            <p>URL de la imagen:</p>
            <input type="text" value={image} readOnly style={{ width: '100%' }} />
            <button onClick={copyToClipboard}>Copiar URL</button>
          </div>
        )
      )}
    </div>
  );
};

export default Cloudinary;
