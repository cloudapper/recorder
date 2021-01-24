const log = require('simple-node-logger').createSimpleLogger();

const getprogress = (origin) => {
    const currentDate = new Date();
    let progress = currentDate.getFullYear() + currentDate.getMonth() + currentDate.getDay() + currentDate.getHours() + currentDate.getMinutes()
    return Math.round((progress * origin)/1000000);
};

log.info('recorder started reading default file');
const dataset = require('./default.json');
let fin;
let data = [];
for (const key in dataset) {
    if (key === "fin") {
        fin = dataset[key];
    } else {
        value = dataset[key];
        data.push(key + ": " + (value + getprogress(value)))
    }
}

console.log(fin);
console.log(data);
