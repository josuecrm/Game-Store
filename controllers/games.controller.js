const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');
const { Console } = require('../models/console.model');
const { GameInConsole } = require('../models/gameInConsole.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;
  const newGame = await Game.create({
    title,
    genre,
  });

  res.status(201).json({
    status: 'success',
    newGame,
  });
});

const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    attributes: ['id', 'title', 'genre', 'status'],
    include: [
      {
        model: Console,
        attributes: ['id', 'name', 'company', 'status'],
      },
      {
        model: Review,
        attributes: ['id', 'userId', 'gameId', 'comment', 'status'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    games,
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { game } = req;
  const { title } = req.body;

  await game.update({ title });

  res.status(201).json({ status: 'success', game });
});

const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;
  await game.update({ status: 'inactive' });
  res.status(201).json({ status: 'success', game });
});

const reviewGame = catchAsync(async (req, res, next) => {
  const { sessionUser, game } = req;
  const { comment } = req.body;

  const newReview = await Review.create({
    userId: sessionUser.id,
    gameId: game.id,
    comment,
  });

  res.status(201).json({
    status: 'success',
    newReview,
  });
});

const assignGameToConsole = catchAsync(async (req, res, next) => {
  const { gameId, consoleId } = req.body;

  const gameInConsole = await GameInConsole.create({ gameId, consoleId });

  res.status(201).json({
    status: 'success',
    gameInConsole,
  });
});

module.exports = {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  reviewGame,
  assignGameToConsole,
};
