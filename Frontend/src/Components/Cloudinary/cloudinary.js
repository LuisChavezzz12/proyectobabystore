import React, { useState } from 'react';
import './Cloudinary.css';  // Importar el CSS

const Cloudinary = () => {
  const preset_name = "v8oot77t"; 
  const cloud_name = "dop92wdwk";

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

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
      setImage(file.secure_url);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(image).then(() => {
      alert("URL copiada al portapapeles!");
    }).catch(err => {
      console.error("Error al copiar la URL:", err);
    });
  };

  return (
    <div className="cloudinary-container">
      <h1>Subir Imagen</h1>
      <input type="file" name="file" onChange={uploadImage} />

      {loading ? (
        <h3>Cargando...</h3>
      ) : (
        image && (
          <div className="url-container">
            <img src={image} alt="Imagen subida" />
            <p>URL de la imagen:</p>
            <input type="text" value={image} readOnly />
            <button onClick={copyToClipboard}>Copiar URL</button>
          </div>
        )
      )}
    </div>
  );
};

export default Cloudinary;
