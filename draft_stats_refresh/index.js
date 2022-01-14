require('dotenv').config();

const refresh = require('./refresh');

module.exports = async function (context, myTimer) {
    context.log('starting!')
    const timeStamp = new Date().toISOString();

    if (true)
    {
        await refresh(context);
        context.log('Successfully ran refresh', timeStamp);
    }
};
