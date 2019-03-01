const mongoose = require('mongoose');

// var db = mongoose.connection;
mongoose.connect('mongodb://localhost/tp1_database');

// db.on('error', console.error.bind(console, 'connection error: '));

// db.once('open', () => {
//     console.log('Connection successful');
//     spellsMapReduce();
// });

mongoose.connection.collection('spells').mapReduce(
    mapFunction,
    reduceFunction,
    {
        query: { components: "V" },
        out: "filtered_spells"
    }
)

var spellsMapReduce = () => {
    db.spells.mapReduce(
        mapFunction,
        reduceFunction,
        {
            query: { components: "V" },
            out: "filtered_spells"
        }
    )
}

var mapFunction = () => {
    console.log('Map Function');
    if (this.level < 5 && this.components[0] == 'V') {
        if (this.components.length > 1) {
            emit('Pas le bon sort', 1);
        }
        else {
            emit(this.name, 1);
        }
    }
    else {
        emit('Pas le bon sort', 1);
    }
}

var reduceFunction = (key, values) => {
    console.log('Reduce Function');
    return Array.sum(values);
}