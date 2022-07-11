const axios = require('axios').default;

let rateSell, rateBuy;

const getData = async (currencyCodeA, currencyCodeB) => {
  try {
    const resp = await axios.get('https://api.monobank.ua/bank/currency');
    resp.data.forEach((item) => {
      if (
        item.currencyCodeA == currencyCodeA &&
        item.currencyCodeB == currencyCodeB
      ) {
        rateBuy = item.rateBuy;
        rateSell = item.rateSell;
      }
    });
  } catch (e) {
    if (e.request.res.statusCode === 429) {
      rateBuy = null;
      rateSell = null;
    }
  }
  return { rateSell, rateBuy };
};

module.exports = { getData };
