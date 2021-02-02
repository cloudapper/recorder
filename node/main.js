const axios = require('axios');
const log = require('simple-node-logger').createSimpleLogger();

const getProgress = (origin) => {
    const currentDate = new Date();
    let progress = currentDate.getFullYear() + currentDate.getMonth() + currentDate.getDay() + currentDate.getHours() + currentDate.getMinutes()
    return Math.round((progress * origin)/10000);
};

log.info('recorder: reading default file');
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

log.info('recorder: data collected - start sending...')

const {NODE_BACKEND_API_URL, NODE_API_USER, NODE_API_PW, NODE_ACCOUNT_API_URL} = process.env;

const config = {
    auth: {
        username: NODE_API_USER,
        password: NODE_API_PW
    }
};

axios.get(NODE_ACCOUNT_API_URL, config).then(res => {
    res.data.forEach(fin => {
        axios.post(NODE_BACKEND_API_URL, {
            fin,
            data : carDataDTO.data 
        }, config).then((res) => {
            log.info('recorder: data for fin ' + fin + ' transmitted succesfully!');
        }).catch(err => log.error('recorder: sending to ' + NODE_BACKEND_API_URL + ' for fin ' + fin + ' failed: ' + err.message));
    });
})