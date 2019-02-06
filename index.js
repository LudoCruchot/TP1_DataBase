var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var crawler = require('js-crawler');

var firstUrl = "http://aonprd.com/Spells.aspx?Class=Wizard";
var secondUrl = "http://www.d20pfsrd.com/magic/spell-lists-and-domains/spell-lists-sorcerer-and-wizard/#TOC-8th-Level-Sorcerer-Wizard-Spells";
// var url = "http://wikipedia.org";

function FirstSpellsCrawling() {

    console.log("Crawling the page: " + firstUrl);

    request(firstUrl, (error, response, html) => {

        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const main = $('.main');

            // const output = main
            //     .find('b')
            //     .text();

            // console.log(output);

            $('.main b').each((i, element) => {
                const item = $(element).text();
                console.log(item);
            })

        }
        else {
            console.log('Code: ' + response.statusCode + ' Error: ' + error);
        }
    })
}

function SecondSpellsCrawling() {

    console.log("Crawling the page: " + secondUrl);

    request(secondUrl, (error, response, html) => {

        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $('.article-content table').each((i, element) => {
                const level = $(element)
                    .children('caption')
                    .text();

                const spells = [];

                $(element).children('tbody').each((i, element) => {

                    $(element).children('tr').each((i, element) => {
                        const spell = $(element)
                            .children('td')
                            .children('a')
                            .first()
                            .text();

                        spells.push(spell);
                        // console.log('spell ' + spell);
                        fs.appendFileSync('spells.txt', 'level: ' + level[0] + ' spell: ' + spell + '\n');
                    })
                })

                // console.log('level ' + level);
                // console.log('spell ' + spells);
            })
        }
        else {
            console.log('Code: ' + response.statusCode + ' Error: ' + error);
        }
    })
}

function JsCrawler() {
    new crawler().configure({ depth: 3 }).crawl("http://www.google.com", function onSucces(page) {
        console.log(page.content);
    })
}

//FirstSpellsCrawling();
SecondSpellsCrawling();
// JsCrawler();