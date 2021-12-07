const User = require('../../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const {secret} = require('../../../config');

const generateAccessToken = (id) => {

    const payload = {
      id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
  }

module.exports.registrationUser = async (req, res) => {
    try {
      const error = validationResult(req)

      if (!error.isEmpty()){
          return res.status(400).json({message: "Ошибка при регистрации", errors: error.array()})
      }

      const {login, password} = req.body;
      const candidate = await User.findOne({login});
      
      if (candidate) {
          return res.status(422).send({message: "Пользователь с таким именем уже существует"})
      } else {
          id = uuidv4();
          const hashPassword = bcrypt.hashSync(password, 3);
          const user = new User({
              login: login,
              password: hashPassword,
              id
          })
          
          await user.save()
          const token = generateAccessToken(user.id)
          return res.json({token, id})
      }

    } catch {
      res.status(400).json({ message: 'Ошибка регистрации' })
    }
};

module.exports.authorizationUser = async (req, res) => {
    
    try {
        const { login, password } = req.body;
        const user = await User.findOne({ login })

        if (!user) {
            return res.status(402).json({ message: `Пользователя c логином ${login} не существует` });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Некоррекнтый пароль' });
        }

        const token = generateAccessToken(user.id)
        return res.status(202).json({token, id: user.id})

    } catch {
        res.status(400).json({ message: 'Ошибка авторизации' })
    }
};

