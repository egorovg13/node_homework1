const http = require('http');
const Events = require('events');
const eventEmitter = new Events();

const server = http.createServer((req, res) => {

    if (req.url !== '/favicon.ico'){

    eventEmitter.emit('user_connected', 'user connected')
    eventEmitter.on('timestamp_sent', (string) => {
        let dateObj = new Date();
        
        res.end(`${dateObj.getUTCDate()}.${dateObj.getUTCMonth()+1}, ${dateObj.getUTCHours()}:${dateObj.getUTCMinutes()}:${dateObj.getUTCSeconds()}`)

    })}

    }).listen(7006);


eventEmitter.on('user_connected', (string) => {

    console.log(string);

    let timer = setInterval( () =>  {
        let dateObj = new Date();
        let currentTime = `${dateObj.getUTCDate()}.${dateObj.getUTCMonth()+1}, ${dateObj.getUTCHours()}:${dateObj.getUTCMinutes()}:${dateObj.getUTCSeconds()}`
        console.log(currentTime)
    }, 1000);
    
    let timeStop = setTimeout( () => {
        clearInterval(timer)
        eventEmitter.emit('timestamp_sent', 'timestamp sent')
    }, 3000);
});
