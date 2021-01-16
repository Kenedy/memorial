const fs = require('fs');
const filePath = 'public/results.json';

const loadData = () => {
    try {
        const dataAsJson = fs.readFileSync(filePath, { encoding: 'utf8'});
        return JSON.parse(dataAsJson);
    } catch (err) {
        return null;
    }
}

const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

const repo = {
    addRacer: (racer) => {
        let data = loadData() || { results: [] };
        data.results.push(racer);
        saveData(data);
    }
}

module.exports = repo;