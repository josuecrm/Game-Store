const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;
  const newConsole = await Console.create({
    name,
    company,
  });

  res.status(201).json({
    status: 'success',
    newConsole,
  });
});

const getAllConsoles = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll({
    attributes: ['id', 'name', 'company', 'status'],
    include: [{ model: Game, attributes: ['id', 'title', 'genre', 'status'] }],
  });

  res.status(200).json({
    status: 'success',
    consoles,
  });
});

const updateConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  const { name } = req.body;

  await console.update({ name });

  res.status(201).json({ status: 'success', console });
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  await console.update({ status: 'inactive' });
  res.status(201).json({ status: 'success', console });
});

module.exports = {
  getAllConsoles,
  createConsole,
  updateConsole,
  deleteConsole,
};
