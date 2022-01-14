const {updateStats} = require("./db/draftHistory.service");
const {getDraftHistory} = require("./pfr/pfr.service");
const {getActivePlayers} = require("./db/draftHistory.service");

const refresh = async (context) => {
  const activePlayers = await getActivePlayers(context);

  const draftsToPull = new Set(activePlayers.map(p => p.year))

  const draftData = await getDraftHistory(context, draftsToPull)

  const allPlayers = draftData.map(d => d.playerData).flat();

  const updates = allPlayers.filter(p => activePlayers.some(ap => ap.id === p.id));

  try {
    context.log(`Updating ${updates.length} active players`);

    await updateStats(context, updates)

    context.log('Completed player updates');
  } catch (ex) {
    context.log({message: 'An error occurred while updating players', error: ex.message});
  }
}

module.exports = refresh;
