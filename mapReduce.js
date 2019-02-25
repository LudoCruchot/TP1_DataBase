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
    emit(this._id, this.components);
}

var reduceFunction = () => {

}