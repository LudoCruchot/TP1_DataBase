var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var mongoose = require('mongoose');
var promise = require('promise');


function SpellsCrawling() {


    // var $ = cheerio.load(html);   pour le vrai code

    var $ = cheerio.load(fs.readFileSync('page_sort_test3.html'));

    var nbLevels = $('.article-content')
        .children('p')
        .first()
        .children('a')
        .length;

    var nbB = $('.article-content')
        .children('p')
        .first()
        .children('b')
        .length;


    var name = $('section')
        .children('article')
        .children('h1')
        .text();

    var level = '';

    level = $('.article-content')
        .children('p')
        .first()
        .text();

    if (nbB > 2) {
        levelTab = level.split('Level');

        // console.log('Level ', level);
        // console.log('LevelTab ', levelTab);
        // console.log('LevelTab[1] ', levelTab[1]);

        levelTab2 = levelTab[1].split(';');
        level = levelTab2[0];

        // console.log('LevelTab2 ', levelTab2);
        // console.log('LevelTab2[0] ', levelTab2[0]);
    }
    if (nbB == 2) {
        levelTab = level.split('Level');
        level = levelTab[1]
    }

    var components = '';
    components = $('.article-content')
        .children('p')
        .eq(2)
        .text();

    componentsTab = components.split('Components');
    components = componentsTab[1];

    componentsToJSON = components.split(',');
    for (i = 0; i < componentsToJSON.length; i++) {
        componentsToJSON[i] = componentsToJSON[i].trim();
    }


    var spell_resistance = '';
    spell_resistance = $('.article-content')
        .children('p')
        .eq(4)
        .text();

    spell_resistanceTab = spell_resistance.split('Resistance');
    spell_resistance = spell_resistanceTab[1];
    spell_resistanceTab2 = spell_resistance.split(' ');
    spell_resistance = spell_resistanceTab2[1].trim();


    console.log(spell_resistance);
}

SpellsCrawling();
