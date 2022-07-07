const express = require('express');

const {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  reviewGame,
  assignGameToConsole,
} = require('../controllers/games.controller');

const {
  createGameValidators,
  createReviewValidators,
} = require('../middlewares/validators.middleware');

const { gameExists } = require('../middlewares/games.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.use(protectSession);

gamesRouter.post('/', createGameValidators, createGame);

gamesRouter.post('/assignGameToConsole', assignGameToConsole);

gamesRouter.post(
  '/reviews/:gameId',
  createReviewValidators,
  gameExists,
  reviewGame
);

gamesRouter
  .use('/:id', gameExists)
  .route('/:id')
  .patch(updateGame)
  .delete(deleteGame);

module.exports = { gamesRouter };
