const axios = require('axios');
const log = require('simple-node-logger').createSimpleLogger();

const getProgress = (origin) => {
    const currentDate = new Date();
    let progress = currentDate.getFullYear() + currentDate.getMonth() + currentDate.getDay() + currentDate.getHours() + currentDate.getMinutes()
    return Math.round((progress * origin)/100000);
};

log.info('recorder:reading default file');
const dataset = require('./default.json');

let carDataDTO = 
{
    fin: "",
    data : [] 
};
log.info('recorder: collecting data');
for (const key in dataset) {
    if (key === "fin") {
        carDataDTO.fin = dataset[key];
    } else {
        value = dataset[key];
        carDataDTO.data.push(key + ": " + (parseFloat(getProgress(value)) + parseFloat(value)));
    }
}

console.log(carDataDTO);

log.info('recorder: data collected - start sending...')

const {NODE_API_URL, NODE_API_USER, NODE_API_PW} = process.env;

const config = {
    auth: {
        username: NODE_API_USER,
        password: NODE_API_PW
    }
};

axios.post(NODE_API_URL, carDataDTO, config).then((res) => {
    log.info('recorder: data for fin ' + carDataDTO.fin + ' transmitted succesfully!');
}).catch(err => log.error('recorder: sending to ' + NODE_API_URL + ' failed: ' + err.message));