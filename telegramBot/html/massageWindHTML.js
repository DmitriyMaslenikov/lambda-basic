const data = require('../api/openweathermapAPI.js');

const massage = async () => {
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
    })}, Скорость - ${dataArr.list[i].wind.speed}м/с, направление ${
      dataArr.list[i].wind.deg
    }°, порывы - ${dataArr.list[i].wind.gust}м/с </b> \n`;
    i += n;
  } while (i < 40);

  return `${html}`;
};
module.exports = { massage };
