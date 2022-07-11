const dataMono = require('../api/monobankAPI.js');
const dataPrivat = require('../api/privatbankAPI');
const dataPrivatNB = require('../api/privatbankNbuAPI.js');

let rateSellEur, rateBuyEur, rateSellUsd, rateBuyUsd;

const massage = async (currency, baseCurrency) => {
  let currencyMono,
    currencyMassage,
    baseCurrencyMono = 980;
  let rateSell, rateBuy;
  switch (currency) {
    case 'USD':
      currencyMono = 840;
      currencyMassage = 'долара США';
      rateSell = rateSellUsd;
      rateBuy = rateBuyUsd;
      break;
    case 'EUR':
      currencyMono = 978;
      currencyMassage = 'евро';
      rateSell = rateSellEur;
      rateBuy = rateBuyEur;
      break;
  }
  const date = new Date();
  const dateToday = date.toLocaleString('ru', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  const privat = await dataPrivat.getData(currency, baseCurrency);

  const privatNb = await dataPrivatNB.getData(
    currency,
    baseCurrency,
    dateToday
  );
  const mono = await dataMono.getData(currencyMono, baseCurrencyMono);
  if (mono.rateSell !== null && mono.rateBuy !== null) {
    rateSell = mono.rateSell;
    rateBuy = mono.rateBuy;
    switch (currency) {
      case 'USD':
        rateSellUsd = rateSell;
        rateBuyUsd = rateBuy;
        break;
      case 'EUR':
        rateSellEur = rateSell;
        rateBuyEur = rateBuy;
        break;
    }
  }

  let html = `<b> Курс ${currencyMassage}:</b> \n`;

  html += `   \n <b> Приватбанк:  </b> \n`;
  html += `     <b> Продажа - ${privat.sale} </b> \n`;
  html += `     <b> Покупка - ${privat.buy} </b> \n`;
  html += `   \n <b> Монобанк:  </b> \n`;
  html += `     <b> Продажа - ${rateSell} </b> \n`;
  html += `     <b> Покупка - ${rateBuy} </b> \n`;
  html += `   \n <b> Курс НБУ - ${privatNb.saleRateNB} </b> \n`;

  return `${html}`;
};

module.exports = { massage };
