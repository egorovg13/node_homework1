const http = require('http');
const Events = require('events');
const eventEmitter = new Events();
const INTERVAL = parseInt(process.env.INTERVAL) || 1000;
const TIME = parseInt(process.env.TIME) || 3000;

const server = http.createServer((req, res) => {

    if (req.url !== '/favicon.ico'){

        const isInteger = Number.isInteger(INTERVAL)
        if (isInteger === false) {
            console.log('interval is not an integer')
        }

    eventEmitter.emit('user_connected', `user connected with Interval ${INTERVAL} and Time ${TIME}`)
    eventEmitter.on('timestamp_sent', (string) => {
        let dateObj = new Date();
        
        res.end(`${dateObj.getUTCDate()}.${dateObj.getUTCMonth()+1}, ${dateObj.getUTCHours()}:${dateObj.getUTCMinutes()}:${dateObj.getUTCSeconds()}`)

    })}

    }).listen(3000);


eventEmitter.on('user_connected', (string) => {

    console.log(string);

    let timer = setInterval( () =>  {
        let dateObj = new Date();
        let currentTime = `${dateObj.getUTCDate()}.${dateObj.getUTCMonth()+1}, ${dateObj.getUTCHours()}:${dateObj.getUTCMinutes()}:${dateObj.getUTCSeconds()}`
        console.log(currentTime)
    }, INTERVAL);
    
    let timeStop = setTimeout( () => {
        clearInterval(timer)
        eventEmitter.emit('timestamp_sent', 'timestamp sent')
    }, TIME);
});
