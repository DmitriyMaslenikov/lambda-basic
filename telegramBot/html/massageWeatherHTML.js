const data = require('../api/openweathermapAPI.js');
const degrees = (value) => {
  const degr = Math.round(value);
  if (Math.sign(degr) > 0) {
    return `+${degr}`;
  } else {
    return degr;
  }
};
const massage = async (n) => {
  const dataArr = await data.getData;
  let html = '<b>Погода в Днепре:</b> \n';
  let tempDate;
  let i = 0;
  do {
    const date = new Date(dataArr.list[i].dt_txt);
    let dateElement = date.getDate();
    if (tempDate !== dateElement) {
      tempDate = dateElement;
      html += `\n  <b> ${date.toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      })}</b>  \n`;
    }
    html += `   <b>  ${date.toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric',
    })}, ${degrees(dataArr.list[i].main.temp)}°C, ощущается: ${degrees(
      dataArr.list[i].main.feels_like
    )}°C, ${dataArr.list[i].weather[0].description}</b> \n`;
    i += n;
  } while (i < 40);

  return `${html}`;
};
module.exports = { massage };
