import { emit } from "cluster";

mongoose.connect('mongodb://localhost/tp1_database');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function () {
    console.log('Connection successful');
});

db.spells.mapReduce(
    mapFunction,
    reduceFunction,
    {
        query: { components: "V" },
        out: "filtered_spells"
    }
)

var mapFunction = () => {
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
    return Array.sum(values);
}