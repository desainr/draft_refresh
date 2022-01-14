const {client, pg} = require('./db');

const getActivePlayers = async (context) => {
  const today = new Date();

  let activeYear = today.getFullYear();

  // if we are at the beginning of a year, "active year" still refers to the year prior
  if (today.getMonth() < 3) {
    activeYear--
  }

  // query the active year and all players drafted this year (rookies active_year might be 0 or empty)
  const query =  `SELECT p.id as id, dp.year as year FROM players p LEFT JOIN draft_picks dp ON p.ID = dp.player_id WHERE p.last_active >= ${activeYear - 1} OR dp.year = ${activeYear}`;

  return client.query(query);
};

const updateStats = (context, playersToUpdate) => {

  const columnSet = new pg.helpers.ColumnSet([
    '?id', 'age', 'games', 'pass_cmp', 'pass_att', 'pass_tds',
    'pass_ints', 'rush_att', 'rush_yds', 'rush_tds', 'recs', 'rec_yds', 'rec_tds', 'tackles', 'def_ints',
    'sacks', 'pass_yds', 'last_active'], {table: 'players'})


  const query = () => pg.helpers.update(playersToUpdate, columnSet, 'players') + ' WHERE t.id = v.id';

  return client.none(query());
}

module.exports = {
  getActivePlayers,
  updateStats,
}
