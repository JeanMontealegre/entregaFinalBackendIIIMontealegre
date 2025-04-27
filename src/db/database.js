import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backend2';

const connectDB = async () => {
  try {
    console.log('Intentando conectar a MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Base de datos conectada con éxito');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Detener la aplicación si no se puede conectar
  }
};

// Agregar eventos para capturar posibles errores en la conexión
mongoose.connection.on('connected', () => {
  console.log('Mongoose está conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión de Mongoose:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose se ha desconectado de MongoDB');
});

export default connectDB;
