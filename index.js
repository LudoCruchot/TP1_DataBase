var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = "http://www.d20pfsrd.com/magic/spell-lists-and-domains/spell-lists-sorcerer-and-wizard/#TOC-8th-Level-Sorcerer-Wizard-Spells";

function SpellsCrawling() {

    console.log("Crawling the page: " + url);

    request(url, (error, response, html) => {

        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const toJSON = {
                spells: []
            }

            $('.article-content table').each((i, element) => {
                const level = $(element)
                    .children('caption')
                    .text();

                $(element).children('tbody').each((i, element) => {
                    $(element).children('tr').each((i, element) => {
                        const spell = $(element)
                            .children('td')
                            .children('a')
                            .first()
                            .text();

                        toJSON.spells.push(
                            {
                                name: spell,
                                level: level,
                                components: ["V", "S", "M"],
                                spell_resistance: false
                            }
                        );
                    })
                })
            })

            let jsonSpells = JSON.stringify(toJSON);
            fs.writeFileSync('spells.json', jsonSpells);
        }
        else {
            console.log('Code: ' + response.statusCode + ' Error: ' + error);
        }
    })
}

SpellsCrawling();