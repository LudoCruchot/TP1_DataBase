const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const mongoUtils = require('../utils/mongo');

const { BASE_URL } = require('../config.json');

let counter = 0;

const launchScrapping = () => {
  request(BASE_URL, (error, response, html) => {
    console.log('>>HTTP REQUEST SENT');

    if (error) {
      console.log(">>Error while retrieving the main url data", error);
      // process.exit(0);
      html = fs.readFileSync('data/base.html');
    }

    const secondaryPayloads = getSecondaryPayloads(html);
    const secondaryPromises = secondaryPayloads.map((payload) => asPromise(payload));

    Promise.all(secondaryPromises).then((values) => {
      console.log("results", values);
      console.log(">>Scrapping scripts has ended");
      process.exit();
    });
  })
};

const getSecondaryPayloads = (html) => {
  const $ = cheerio.load(html);

  const urls = [];

  // for each table where the data is contained
  $('.article-content table').each((i, element) => {

    // foreach body of these tables
    $(element).children('tbody').each((i, element) => {

      // for each row of data
      $(element).children('tr').each((i, element) => {
        urls.push(
          $(element)
            .children('td')
            .children('a')
            .first()
            .attr('href')
        );
      });
      // end row

    });
    // end tbody

  });
  // end table
  console.log(">>SECONDARY PAYLOADS:", urls.length);
  return urls;
};

const asPromise = (url) => new Promise((resolve, reject) => {
  request(url, (error, response, html) => {

    if (!error && response.statusCode == 200) {

      const $ = cheerio.load(html);

      //utils
      const nbB = $('.article-content').children('p').first().children('b').length;

      //name
      let name = $('section').children('article').children('h1').text();

      //level
      let level = $('.article-content').children('p').first().text();

      if (nbB > 2) {
        levelTab = level.split('Level');
        levelTab2 = levelTab[1].split(';');
        level = levelTab2[0];
      } else if (nbB == 2) {
        levelTab = level.split('Level');
        level = levelTab[1]
      }

      //components
      let components = $('.article-content').children('p').eq(2).text();

      if (components == undefined) {
        components = null;
      }
      else if (components.includes('Components')) {
        componentsTab = components.split('Components');
      }
      else {
        componentsTab = components.split('Component:');
      }

      components = componentsTab[1];

      //spell_resistance
      let spell_resistance = $('.article-content').children('p').eq(4).text();

      if (spell_resistance.includes('Resistance')) {
        spell_resistanceTab = spell_resistance.split('Resistance');
        spell_resistanceTab2 = spell_resistanceTab[1].trim().split(' ');
        spell_resistance = spell_resistanceTab2[0];
      } else {
        spell_resistance = 'no';
      }

      //json
      const nameToJSON = name.trim();
      const levelToJSON = level.trim();

      let componentsToJSON;
      if (components == null) {
        componentsToJSON = components;
      } else {
        componentsToJSON = components.split(',');

        for (i = 0; i < componentsToJSON.length; i++) {
          componentsToJSON[i] = componentsToJSON[i].trim();
        }
      }

      const spell_resistanceToJSON = (spell_resistance === 'yes') ? true : false;

      const result = {
        name: nameToJSON,
        level: levelToJSON,
        components: componentsToJSON,
        spell_resistance: spell_resistanceToJSON
      };

      resolve(result);
    }
    else {
      return reject('');
    }
  })
})
  .then((spell) => {
    if (spell !== null) {
      counter++;
      console.log(spell, counter);
      mongoUtils.insert(spell);
      console.log(spell, ' inserted ', counter);
    }
  })
  .catch((e) => {
    console.log('Catch', e);
  });


module.exports = launchScrapping;