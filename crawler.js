var request = require('request');
var cheerio = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors')
var fs = require('fs');
var mongoose = require('mongoose');

var LIST_URL = 'http://www.d20pfsrd.com/magic/spell-lists-and-domains/spell-lists-sorcerer-and-wizard/#TOC-8th-Level-Sorcerer-Wizard-Spells'

function SpellsCrawling() {

    var counter = 0;

    mongoose.connect('mongodb://localhost/tp1_database');
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error: '));

    db.once('open', function () {
        console.log('Connection successful');
    });

    request(LIST_URL, (error, response, html) => {
        console.log('Start scraping ...');

        if (!error) {
            var $ = cheerio.load(html);

            $('.article-content table').each((i, element) => {

                $(element).children('tbody').each((i, element) => {
                    $(element).children('tr').each((i, element) => {
                        var spellUrl = $(element)
                            .children('td')
                            .children('a')
                            .first()
                            .attr('href');

                        return new Promise((resolve, reject) => {
                            request(spellUrl, (error, response, html) => {
                                if (!error && response.statusCode == 200) {
                                    var $ = cheerio.load(html);

                                    //utils
                                    var nbB = $('.article-content')
                                        .children('p')
                                        .first()
                                        .children('b')
                                        .length;

                                    //name
                                    var name = $('section')
                                        .children('article')
                                        .children('h1')
                                        .text();

                                    //level
                                    var level = '';
                                    level = $('.article-content')
                                        .children('p')
                                        .first()
                                        .text();
                                    if (nbB > 2) {
                                        levelTab = level.split('Level');
                                        levelTab2 = levelTab[1].split(';');
                                        level = levelTab2[0];
                                    }
                                    else if (nbB == 2) {
                                        levelTab = level.split('Level');
                                        level = levelTab[1]
                                    }

                                    //components
                                    var components = '';
                                    components = $('.article-content')
                                        .children('p')
                                        .eq(2)
                                        .text();

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
                                    var spell_resistance = '';
                                    spell_resistance = $('.article-content')
                                        .children('p')
                                        .eq(4)
                                        .text();

                                    if (spell_resistance.includes('Resistance')) {
                                        spell_resistanceTab = spell_resistance.split('Resistance');
                                        spell_resistanceTab2 = spell_resistanceTab[1].trim().split(' ');
                                        spell_resistance = spell_resistanceTab2[0];
                                    }
                                    else {
                                        spell_resistance = 'no';
                                    }

                                    //json
                                    var nameToJSON = name.trim();
                                    var levelToJSON = level.trim();
                                    if (components == null) {
                                        var componentsToJSON = components;
                                    }
                                    else {
                                        var componentsToJSON = components.split(',');

                                        for (i = 0; i < componentsToJSON.length; i++) {
                                            componentsToJSON[i] = componentsToJSON[i].trim();
                                        }
                                    }
                                    var spell_resistanceToJSON = false;
                                    if (spell_resistance === 'yes') {
                                        spell_resistanceToJSON = true
                                    }

                                    var json = {
                                        name: nameToJSON,
                                        level: levelToJSON,
                                        components: componentsToJSON,
                                        spell_resistance: spell_resistanceToJSON
                                    }

                                    resolve(json);
                                }
                                else {
                                    resolve(null);
                                }
                            })
                        })
                            .then((spell) => {

                                if (spell != null) {
                                    db.collection('spells').insertOne({
                                        spell
                                    })
                                    counter++;
                                    console.log(spell, ' inserted ', counter);
                                }
                            })
                    })
                })
            })
        }
        else {
            console.log(error);
        }
    })
}

SpellsCrawling();