import React, { useState } from "react";
import "./Cloudinary.css";

const Cloudinary = ({ onImageUpload }) => {
  const preset_name = "v8oot77t"; 
  const cloud_name = "dop92wdwk";

  const [fullUrl, setFullUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", preset_name);

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const file = await response.json();
      const url = file.secure_url;
      setFullUrl(url);
      setLoading(false);
      if (onImageUpload) {
        // Extraer lo que sigue del último "/" del URL
        const publicId = url.split("/").pop();
        onImageUpload(publicId);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const publicId = fullUrl ? fullUrl.split("/").pop() : "";
    navigator.clipboard
      .writeText(publicId)
      .then(() => alert("Public ID copiado al portapapeles!"))
      .catch((err) => console.error("Error al copiar la URL:", err));
  };

  return (
    <div className="cloudinary-container">
      <h1>Subir Imagen</h1>
      <input type="file" name="file" onChange={uploadImage} />
      {loading ? (
        <h3>Cargando...</h3>
      ) : (
        fullUrl && (
          <div className="url-container">
            <p>Public ID (lo que sigue del último "/"):</p>
            <input type="text" value={fullUrl.split("/").pop()} readOnly />
            <button onClick={copyToClipboard}>Copiar Public ID</button>
          </div>
        )
      )}
    </div>
  );
};

export default Cloudinary;
