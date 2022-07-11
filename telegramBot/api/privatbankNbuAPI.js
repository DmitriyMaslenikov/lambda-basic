const axios = require('axios').default;

let saleRateNB, purchaseRateNB;

const getData = async (currency, baseCurrency, date) => {
  const resp = await axios.get(
    `https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`
  );

  resp.data.exchangeRate.forEach((item) => {
    if (item.currency === currency && item.baseCurrency === baseCurrency) {
      purchaseRateNB = item.purchaseRateNB;
      saleRateNB = item.saleRateNB;
    }
  });

  return { saleRateNB, purchaseRateNB };
};

module.exports = { getData };
