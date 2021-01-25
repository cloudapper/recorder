const axios = require('axios');
const log = require('simple-node-logger').createSimpleLogger();

const getprogress = (origin) => {
    const currentDate = new Date();
    let progress = currentDate.getFullYear() + currentDate.getMonth() + currentDate.getDay() + currentDate.getHours() + currentDate.getMinutes()
    return Math.round((progress * origin)/1000000);
};

log.info('recorder:reading default file');
const dataset = require('./default.json');

let body = 
{
    fin: "",
    data : [] 
};
log.info('recorder: collecting data');
for (const key in dataset) {
    if (key === "fin") {
        body.fin = dataset[key];
    } else {
        value = dataset[key];
        body.data.push(key + ": " + (value + getprogress(value)))
    }
}

log.info('recorder: data collected - start sending...')

const {NODE_API_URL} = process.env;
axios.post(NODE_API_URL, {body}).then((res) => {
    log.info('recorder: data for fin ' + body.fin + ' transmitted succesfully!');
}).catch(err => log.error('recorder: sending to ' + NODE_API_URL + 'failed: ' + err.message));