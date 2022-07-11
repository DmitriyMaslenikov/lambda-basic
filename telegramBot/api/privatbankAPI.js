const axios = require('axios').default;

let sale, buy;

const getData = async (ccy, base_ccy) => {
  const resp = await axios.get(
    'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
  );

  resp.data.forEach((item) => {
    if (item.ccy === ccy && item.base_ccy === base_ccy) {
      buy = item.buy;
      sale = item.sale;
    }
  });

  return { sale, buy };
};
module.exports = { getData };
