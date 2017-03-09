var got = require('got');
var hum_time = require('english-time-mirror');
var omit = require('object.omit');

module.exports = function(arg){

  if(!arg.url || !arg.webhook){
    throw new Error('Url and Webhook must be set');
  }

  var ignore = ['url','webhook','time'];
  var check_time = hum_time(arg.time) || hum_time('5 minute');
  var params = omit(arg,ignore);

  var send = true;

  setInterval(function(){
  	isdown(arg.url).then(response => {
      if(response){
      	send = true;
      }
    }).catch(err => {
      if(send){
      	sendWebhook(arg.webhook, params);
      	send = false;
      }
    });
  }, check_time);


};


function sendWebhook(url, params){
  got(url,{body:params}).then(function(){
    // it's okay!
  }).catch(err => {
    // Houston we have a problem!
  })
}

function isdown(url){

  return new Promise(function(resolve,reject){

    got(url).then(response => {

      if(response.headers['content-length'] == 0){
        reject('Something Happen!');
      } else {
        resolve(true);
      }

    }).catch(err => {
        reject(err);
    });

  });

}
