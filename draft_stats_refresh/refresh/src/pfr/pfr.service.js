const request = require('request-promise');
const { scrapeDraftPageData } = require('@desainr/htmlscraper');

const createPfrUrl = (year) => {
  return `https://www.pro-football-reference.com/years/${year}/draft.htm`
};

const getDraftData = async (year) => {
  const webpageUrl = createPfrUrl(year);

  return request(webpageUrl)
    .then(html => scrapeDraftPageData(html, year))
    .catch(ex => console.log(ex));
}


const getDraftHistory = async (context, years) => {
  context.log(`Beginning gathering draft data for years ` + years.toString());

  const draftDataPromises = [];

  for (const year of years) {
    draftDataPromises.push(getDraftData(year));
  }

  return Promise.all(draftDataPromises);
}

module.exports = {
  getDraftHistory,
}
