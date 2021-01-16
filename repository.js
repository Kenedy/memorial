const JSONdb = require('simple-json-db');
const db = new JSONdb('public/results.json');

const maxIdKey = '_maxId';
var maxId = db.get(maxIdKey) || 0;

const repo = {
    addRacer: (racer) => {
        maxId += 1;
        db.set(maxId.toString(), racer);
        db.set(maxIdKey, maxId);
    }
}

module.exports = repo;