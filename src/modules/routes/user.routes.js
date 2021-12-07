const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
    registrationUser,
    authorizationUser
} = require('../controllers/user.controller');

router.post('/saveUser', [
    check('login')
    .isLength({min: 6})
    .withMessage("Логин не должен быть меньше 6 символов")
    .isAlphanumeric(['en-US'])
    .withMessage("Логин должен содержать только латинские буквы"),
    check('password')
        .isLength({min: 6})
        .withMessage("Длина пароля не должна быть меньше 6 символов")
        .isAlphanumeric(['en-US'])
        .withMessage("Пароль должен содержать только латинские буквы")
        .matches(/\d/)
        .withMessage("Пароль должен содержать минимум 1 цифру"),
], registrationUser);
router.post('/entryUser', authorizationUser);

module.exports = router;