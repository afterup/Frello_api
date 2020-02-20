const { User } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const passport = require('passport');
import { checkExistId } from '../../utillities/utillity';
require('dotenv').config();

export function loginUser(req, res) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
      if(err || !user) { return res.status(400).send({ error: { message: info.message, user } }); }

      req.login(user, { session: false }, (err) => {
          if(err) { res.send(err); }

          const userObject = new User();
          const { user_id, username, email } = user;
          userObject.username = username;
          userObject.email = email;
          
          const loginUser = userObject.toAuthJSON(user_id);
          return res.status(201).json({ user: loginUser });
      });
  })(req, res);
}

export function fetchUser(req, res, next) {
  User.findByPk(req.user.user_id, 
      { attributes: ['user_id', 'email', 'username'] })
      .then((user) => {
          if(!user) { return res.sendStatus(401); }
          return res.json({ user: user });
      });
}

export async function createUser(req, res) {
  async function validateDuplicate(username, email) { 
      const duplicateEmail = await User.findOne({ where: { email }});
      if(duplicateEmail) return res.status(400).send({error: { message:'DUPLICATE_EMAIL'}});

      const duplicateUsername = await User.findOne({ where: { username }});
      if(duplicateUsername) return res.status(400).send({error: { message:'DUPLICATE_USERNAME'}});

      return;
  }

  try{
      const { username, email, password } = req.body.user;
      const userObject = new User();

      validateDuplicate(username, email);
      
      await userObject.hashPassword(password);
      await User.create({ email, username, password: userObject.password });

      return res.status(201).json({ message: 'SUCCESSS' });
  }catch(err) {
      console.log(err);
      return res.status(500).send({ error: { message: 'register error' } });
  }
}

export async function updateUser(req, res) {
  try{
      const user = await User.findByPk(req.user.user_id);
      if(!user) {
          return res.status(406).send({ error: { message: 'not exist user' } }); 
      }

      const { username, email, password } = req.body.user;
      const newUser = new User();
      await newUser.hashPassword(password);

      User.update(
          {
              username: username,
              email: email,
              password: newUser.password
          },
          { where: { user_id: req.user.user_id } }
      ).then((user) => {
          console.log(user);
          res.status(201).send({
              message: 'success'
          });
      });
  }catch(err) {
      console.log(err);
      res.status(500).send({ error: { message: 'update error' } });
  }
}

export async function deleteUser(req, res, next) {
  try{
    await User.destroy({ where: { user_id: req.user.user_id }});
    return res.status(200).send({message: 'SUCCESS'});
  }catch(err){
    return res.status(500).send({error: { message: 'delete error'}});
  }
}
