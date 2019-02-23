var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var mongoose = require('mongoose');
var promise = require('promise');

var BASE_URL = 'http://aonprd.com/Spells.aspx?Class=Wizard';
var LIST_URL = 'http://aonprd.com/Spells.aspx?Class=Wizard';

function SpellsCrawling() {

    var counter = 0;

    request(LIST_URL, (error, response, html) => {
        console.log('Start scraping ...');

        if (!error) {
            var $ = cheerio.load(html);

            $('tbody')
                .children('tr')
                .children('td')
                .children('span')
                .children('a')
                .each((i, element) => {
                    var spellUrl = $(element).attr('href');

                    counter++;

                    console.log('Spell url ' + spellUrl + ' ' + counter);
                })
        }
    })

}

SpellsCrawling();