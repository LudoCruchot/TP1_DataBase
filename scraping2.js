var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var mongoose = require('mongoose');
var promise = require('promise');

var BASE_URL = 'http://legacy.aonprd.com/coreRulebook/';
var LIST_URL = 'http://legacy.aonprd.com/coreRulebook/spellLists.html'

function SpellsCrawling() {

    var counter = 0;

    request(LIST_URL, (error, response, html) => {
        console.log('Start scraping ...');

        if (!error) {
            var $ = cheerio.load(html);

            $('p').each((i, element) => {
                var spellUrl = $(element)
                    .children('b')
                    .children('a')
                    .attr('href');

                // counter++;
                // console.log('Spell url ' + BASE_URL + spellUrl + ' ' + counter);

                return new Promise((resolve, reject) => {
                    request(BASE_URL + spellUrl, (error, response, html) => {
                        if (!error) {
                            var $ = cheerio.load(html);

                            // console.log('Scraping spell ' + BASE_URL + spellUrl);
                            counter++;

                            // console.log('Amount of spells ' + counter);

                            var name = $('.body .stat-block-title')
                                .first()
                                .text();

                            var level = $('.stat-block-1')
                                .first()
                                .children('b');

                            var components = '';
                            var spell_resistance = '';

                            var jsonSpell = {
                                name: name,
                                level: level,
                                components: components,
                                spell_resistance: spell_resistance
                            }

                            if (name) {
                                console.log('Name ' + name + ' Level ' + level + ' ' + counter);
                            }
                            else {
                                console.log(name + ' UNDEFINED ' + counter);
                            }


                            // resolve(jsonSpell);
                        }
                        else {
                            counter++;
                            console.log('Error ' + error + ' amount ' + counter);
                        }
                    })
                })
            })
        }
    })
}

SpellsCrawling();