import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.utils.js';

const SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

export const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age, role } = req.body;
          if (!first_name || !last_name || !age || !password) {
            return done(null, false, { message: 'Todos los campos son obligatorios' });
          }
          const hashedPassword = await hashPassword(password);
          const newUser = await UserModel.create({
            first_name, last_name, email, age, password: hashedPassword, role: role || 'user',
          });
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          const isPasswordValid = await comparePassword(password, user.password);
          if (!isPasswordValid) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET,
      },
      async (payload, done) => {
        try {
          const user = await UserModel.findById(payload.id);
          if (!user) {
            return done(null, false, { message: 'Token inválido' });
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

