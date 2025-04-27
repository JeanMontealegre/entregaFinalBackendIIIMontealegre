import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/backend2';

const testConnection = async () => {
  try {
    console.log('⏳ Intentando conectar a MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 
    });
    console.log('✅ Conectado a MongoDB desde Node.js');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar la prueba de conexión
testConnection();
