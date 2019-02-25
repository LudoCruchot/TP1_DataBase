var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var mongoose = require('mongoose');
var promise = require('promise');


function SpellsCrawling() {


    // var $ = cheerio.load(html);   pour le vrai code

    var $ = cheerio.load(fs.readFileSync('page_sort_test.html'));

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
    var levelTEST = '';

    level = $('.article-content')
        .children('p')
        .first()
        .text();

    if (level.includes('wizard')) {
        levelTab = level.split('wizard');
        level = levelTab[1].trim();
        level = level[0];
        levelTEST = level[level.length - 1]
    }
    else if (level.includes('Level')) {
        levelTab = level.split('Level');
        level = levelTab[1].trim();
        level = level[level.length - 1];
    }
    else {
        level = null;
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

    if (spell_resistance.includes('Resistance')) {
        spell_resistanceTab = spell_resistance.split('Resistance');
        spell_resistanceTab2 = spell_resistanceTab[1].trim().split(' ');
        spell_resistance = spell_resistanceTab2[0];
    }


    console.log(name, level[0], levelTEST);
}

SpellsCrawling();
