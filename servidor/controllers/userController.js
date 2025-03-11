const User = require('../models/User');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find(); // Obtener todos los usuarios
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: '❌ Error al obtener los usuarios', error: error.message });
  }
};

// Obtener un usuario por su ID
exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findById(id); // Buscar usuario por ID
    if (!usuario) {
      return res.status(404).json({ message: '❌ Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: '❌ Error al obtener el usuario', error: error.message });
  }
};

// Agregar un nuevo usuario
exports.agregarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    await nuevoUsuario.save();
    res.status(201).json({
      message: '✅ Usuario agregado correctamente',
      usuario: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al agregar el usuario', error: error.message });
  }
};

// Actualizar un usuario por su ID
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: '❌ Usuario no encontrado' });
    }

    // Solo actualizar el campo 'role'
    if (req.body.role) {
      usuario.role = req.body.role;
    }

    await usuario.save();
    res.json({
      message: '✅ Rol del usuario actualizado correctamente',
      usuario,
    });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al actualizar el usuario', error: error.message });
  }
};

// Eliminar un usuario por su ID
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: '❌ Usuario no encontrado' });
    }

    await User.deleteOne({ _id: id });
    res.json({ message: '✅ Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al eliminar el usuario', error: error.message });
  }
};
