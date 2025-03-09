const User = require('../models/User');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find(); // Obtener todos los usuarios
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "❌ Error al obtener los usuarios", error: error.message });
  }
};

// Obtener un usuario por su ID
exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findById(id); // Buscar usuario por ID
    if (!usuario) {
      return res.status(404).json({ message: "❌ Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "❌ Error al obtener el usuario", error: error.message });
  }
};

// Agregar un nuevo usuario
exports.agregarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body); // Crear un nuevo usuario con los datos del cuerpo de la solicitud
    await nuevoUsuario.save(); // Guardar el usuario en la base de datos
    res.status(201).json({
      message: "✅ Usuario agregado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al agregar el usuario", error: error.message });
  }
};

// Actualizar un usuario por su ID
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findById(id); // Buscar el usuario por su ID
    if (!usuario) {
      return res.status(404).json({ message: "❌ Usuario no encontrado" });
    }

    // Actualizar los datos del usuario
    usuario.username = req.body.username || usuario.username;
    usuario.email = req.body.email || usuario.email;
    usuario.phone = req.body.phone || usuario.phone;
    usuario.role = req.body.role || usuario.role;

    await usuario.save(); // Guardar los cambios

    res.json({
      message: "✅ Usuario actualizado correctamente",
      usuario,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al actualizar el usuario", error: error.message });
  }
};


// Eliminar un usuario por su ID
exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await User.findById(id); // Buscar el usuario por su ID
      if (!usuario) {
        return res.status(404).json({ message: "❌ Usuario no encontrado" });
      }
  
      await User.deleteOne({ _id: id }); // Eliminar el usuario usando deleteOne
      res.json({ message: "✅ Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "❌ Error al eliminar el usuario", error: error.message });
    }
  };
