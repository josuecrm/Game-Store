const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map(err => err.msg);

    const message = errorMsgs.join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isAlphanumeric()
    .withMessage('Password must contain letters and numbers'),
  checkResult,
];

const createGameValidators = [
  body('title')
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isString()
    .withMessage('Title must be a string'),
  body('genre')
    .notEmpty()
    .withMessage('Genre cannot be empty')
    .isString()
    .withMessage('Genre must be a string'),
  checkResult,
];

const createReviewValidators = [
  body('comment')
    .notEmpty()
    .withMessage('Comment cannot be empty')
    .isString()
    .withMessage('Comment must be a string'),
  checkResult,
];

const createConsoleValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Name must be a string'),
  body('company')
    .notEmpty()
    .withMessage('Company cannot be empty')
    .isString()
    .withMessage('Company must be a string'),
  checkResult,
];

module.exports = {
  createUserValidators,
  createGameValidators,
  createReviewValidators,
  createConsoleValidators,
};
