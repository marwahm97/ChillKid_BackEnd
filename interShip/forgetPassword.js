/*import validator from 'validator';
const sendMail = require('./sendMail')
import models from '../models';
import { hashPassword, jwtToken, comparePassword } from '../utils';

const { User } = models;

const auth = {
  

 

  async sendResetLink(req, res, next) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!email) {
        return res.status(400).send({ error: 'Email is required' });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).send({ error: 'Invalid email' });
      }
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      const token = jwtToken.createToken(user);
      const link = ${req.pr+otocol}://localhost:5000/reset_password/${token};
      await sendMail(
        email,
        'noreply@todo.com',
        'Best To Do password reset',
        `
        <div>Click the link below to reset your password</div><br/>
        <div>${link}</div>
        `
      );
      return res.status(200).send({ message: 'Password reset link has been successfully sent to your inbox' });
    } catch (e) {
      return next(new Error(e));
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { password } = req.body;
      const { token } = req.params;
      const decoded = jwtToken.verifyToken(token);
      const hash = hashPassword(password);
      const updatedUser = await User.update(
        { password: hash },
        {
          where: { id: decoded.userId },
          returning: true,
          plain: true,
        }
      );
      const { id, name, email } = updatedUser[1];
      return res.status(200).send({ token, user: { id, name, email } });
    } catch (e) {
      return next(new Error(e));
    }
  }
};

export default auth;*/