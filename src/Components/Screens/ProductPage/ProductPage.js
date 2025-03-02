import React from "react";
import TarjetaProds from "../../CardProductos/TarjetaProds";
import "../ProductPage/ProductPage.css";

import img1 from "../../Imgs/cunainteligente.jpg";
import img2 from "../../Imgs/almohadaparabebe.png";
import img3 from "../../Imgs/pelucheinteractivo.png";
import img4 from "../../Imgs/cunadeviaje.png";
import img5 from "../../Imgs/sillamesedora.png";
import img6 from "../../Imgs/ropaparabebe.png";
import img7 from "../../Imgs/mantaparabebe.png";



function ProductPage() {
  const productos = [
    {
      id: 1,
      imagen: img1,
      nombre: "Cuna inteligente",
      descripcion: "Cuna inteligente con sensores para monitoreo del bebé",
      precio: 1000,
      descripcionExtra:
        "Cuna con sensores de movimiento y temperatura, ideal para bebés desde recién nacidos hasta los 2 años.",
      caracteristicas: [
        "Sensores de movimiento y temperatura",
        "Conexión Bluetooth para monitoreo remoto",
        "Diseño cómodo y moderno",
        "Material resistente y seguro para bebés",
      ],
      comentarios: [
        {
          usuario: "Juan",
          texto:
            "Excelente producto! Me ayudó a mantener un monitoreo constante de mi bebé.",
        },
        {
          usuario: "Maria",
          texto:
            "Muy útil para los primeros meses, el monitoreo remoto es increíble.",
        },
      ],
      imagenesAdicionales: [img1, img2],
    },
    {
      id: 2,
      imagen: img2,
      nombre: "Almohada para bebé",
      descripcion: "Almohada para bebé Memory Foam",
      precio: 300,
      descripcionExtra:
        "Almohada ergonómica para proporcionar un apoyo adecuado al cuello y cabeza del bebé mientras duerme.",
      caracteristicas: [
        "Material Memory Foam",
        "Cubre con tela suave y lavable",
        "Ideal para recién nacidos",
      ],
      comentarios: [
        {
          usuario: "Carlos",
          texto: "Muy cómoda para mi bebé, parece dormir mucho mejor.",
        },
        { usuario: "Ana", texto: "Excelente calidad y muy suave al tacto." },
      ],
      imagenesAdicionales: [img2],
    },
    {
      id: 3,
      imagen: img3,
      nombre: "Peluche interactivo para bebé",
      descripcion: "Peluche interactivo Flappy el Elefante",
      precio: 450,
      descripcionExtra:
        "Peluche interactivo que canta canciones y produce sonidos divertidos para entretener a tu bebé.",
      caracteristicas: [
        "Canta canciones y emite sonidos",
        "Material suave y seguro para bebés",
        "Ideal para el desarrollo del bebé",
      ],
      comentarios: [
        {
          usuario: "Luis",
          texto:
            "Mi bebé lo adora! Siempre se ríe cuando escucha las canciones.",
        },
        {
          usuario: "Sofia",
          texto:
            "Es un excelente regalo para bebés, me encanta el sonido suave.",
        },
      ],
      imagenesAdicionales: [img3],
    },
    {
      id: 4,
      imagen: img4,
      nombre: "Cuna de viaje",
      descripcion: "Cuna portátil Graco Pack 'n Play",
      precio: 1200,
      descripcionExtra:
        "Cuna portátil fácil de montar y perfecta para viajes. Incluye cambiador y accesorios.",
      caracteristicas: [
        "Fácil de montar y transportar",
        "Incluye cambiador y almohadilla",
        "Diseño compacto y liviano",
      ],
      comentarios: [
        {
          usuario: "Pedro",
          texto: "Es perfecta para los viajes, se monta en minutos.",
        },
        { usuario: "Carla", texto: "Muy cómoda y fácil de transportar." },
      ],
      imagenesAdicionales: [img4],
    },
    {
      id: 5,
      imagen: img5,
      nombre: "Silla mecedora",
      descripcion: "Silla mecedora portátil Ingenuity",
      precio: 600,
      descripcionExtra:
        "Silla mecedora que se convierte en columpio portátil para el bebé, ideal para relajarse.",
      caracteristicas: [
        "Convertible en columpio portátil",
        "Ahorro de batería",
        "Diseño cómodo para el bebé",
      ],
      comentarios: [
        {
          usuario: "Jorge",
          texto: "Le encanta a mi bebé, se duerme en minutos.",
        },
        {
          usuario: "Laura",
          texto: "Una silla muy práctica y cómoda para el bebé.",
        },
      ],
      imagenesAdicionales: [img5],
    },
    {
      id: 6,
      imagen: img6,
      nombre: "Ropa para bebé",
      descripcion: "Set de 6 pañaleros para bebé",
      precio: 150,
      descripcionExtra:
        "Set de 6 pañaleros de manga larga para bebé, suaves y cómodos.",
      caracteristicas: [
        "Set de 6 pañaleros",
        "Tamaño adecuado para bebés de 0 a 6 meses",
        "Material 100% algodón",
      ],
      comentarios: [
        { usuario: "Elena", texto: "Me encantaron, son muy suaves y cómodos." },
        {
          usuario: "Ricardo",
          texto: "Muy buen precio para la calidad que tienen.",
        },
      ],
      imagenesAdicionales: [img6],
    },
    {
      id: 7,
      imagen: img7,
      nombre: "Manta suave",
      descripcion: "Manta de apego para bebé",
      precio: 200,
      descripcionExtra:
        "Manta suave y calentita para el bebé, ideal para el descanso y la comodidad.",
      caracteristicas: [
        "Material suave y cálido",
        "Mordedera y sonaja en uno",
        "Ideal para bebés desde el nacimiento",
      ],
      comentarios: [
        {
          usuario: "Luis",
          texto: "A mi bebé le encanta, la usa todo el tiempo.",
        },
        {
          usuario: "Sandra",
          texto: "Es muy suave y mi bebé está encantado con la sonaja.",
        },
      ],
      imagenesAdicionales: [img7],
    },
  ];

  return (
    <div className="product-container">
      {productos.map((producto) => (
        <TarjetaProds
          key={producto.id}
          id={producto.id}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={producto.precio}
          descripcionExtra={producto.descripcionExtra}
          caracteristicas={producto.caracteristicas}
          comentarios={producto.comentarios}
          imagen={producto.imagen}
          imagenesAdicionales={producto.imagenesAdicionales}
        />
      ))}
    </div>
  );
}

export default ProductPage;
