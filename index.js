var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = "http://aonprd.com/Spells.aspx?Class=Wizard";
// var url = "http://wikipedia.org";

function SpellsCrawling() {
    console.log("Crawling the page: " + url);
    request(url, (error, response, body) => {

        if (error) {
            console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);
        if (response.statusCode === 200) {
            var $ = cheerio.load(body);
            console.log("Page title: " + $('title').text());

            $('title').each(() => {
                var spell = $(this).text();
                console.log("spell" + spell);
                // fs.appendFileSync('spells.txt', spell + '\n');
            })
        }
    })
}

SpellsCrawling();