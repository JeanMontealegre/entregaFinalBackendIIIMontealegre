import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './db/database.js';
import authRouter from './routes/auth.routes.js';
import cartsRouter from './routes/carts.js';
import productsRouter from './routes/products.js';
import mocksRouter from './routes/mocks.router.js';
import path from 'path';
import { engine } from 'express-handlebars';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Conectar a MongoDB
connectDB().then(() => {
  console.log('✅ Base de datos conectada con éxito');
}).catch((error) => {
  console.error('❌ Error al conectar a MongoDB:', error.message);
  process.exit(1);
});

// Inicializar Passport
initializePassport();
app.use(passport.initialize());

// Middleware para compartir Socket.IO
app.use((req, res, next) => {
  req.app.set('io', io);
  next();
});

// Configuración Handlebars
const __dirname = path.resolve();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware general
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/auth', authRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/mocks', mocksRouter);

// Documentación Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'src/docs/swagger.yaml'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint vista en tiempo real
app.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts', { title: 'Productos en Tiempo Real' });
});

// Socket.IO conexión
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
