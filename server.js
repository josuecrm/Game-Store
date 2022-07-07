const { app } = require('./app');

const { User } = require('./models/user.model');
const { Console } = require('./models/console.model');
const { Game } = require('./models/game.model');
const { Review } = require('./models/review.model');

const { db } = require('./utils/database.util');

db.authenticate()
  .then(() => console.log('Db authenticated'))
  .catch(err => console.log(err));

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(Game);

Game.belongsToMany(Console, {
  foreignKey: 'consoleId',
  through: 'gameInConsoles',
});

Console.belongsToMany(Game, {
  foreignKey: 'gameId',
  through: 'gameInConsoles',
});

db.sync()
  .then(() => console.log('Db synced'))
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log('Express app running!!');
});
