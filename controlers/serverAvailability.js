const http = require('http');

const axios = require('axios').create({
    timeout: 5000,
});;


// Method to find online server that is having lowest priority
module.exports.findServer = function findServer(serverList) {
    return new Promise((resolve,reject)=>{

      // sort the serverList based on priority
        sortedServers = serverList.sort((url1,url2)=>url1.priority-url2.priority);

        // Promise.allSettled will resolve into a array with response and promise status i.e. fullfilled/rejected
        Promise.allSettled(sortedServers.map(server => {
          return axios.get(server.url);
        }))
          .then(responses => {
            // finding index of 1st server (lowest priority) which is online 
            const fullfilledServer = responses.findIndex((response) => response.status!=="rejected");
            // check fullfilledServer, if it is not -1, then there is atleast one server which is online
            if(fullfilledServer >= 0)
              resolve({'success':true,'server': sortedServers[fullfilledServer]});
            else
              reject({'success':false, 'message':"No servers are online"});
          }).catch(err => {
            console.log(err)
            reject({'success':false, 'err':"Some error occured"});
          });
    })
}

// Method to find online server that is having lowest priority ---another way
module.exports.findServer_copy = function findServer_copy(serverList) {
  return new Promise((resolve,reject)=>{

      Promise.allSettled(serverList.map(server => {
        return axios.get(server.url);
      }))
        .then(responses => {
          // get servers that are online by checking if they are fullfilled or rejected promise
          const fullfilledServer = responses.filter((response) => response.status!=="rejected").map(server=> server.value.config.url)
          //const index = responses.findIndex((response) => response.status!=="rejected" && response.value.status>=200 && response.value.status<=299);
          
          // to store the server with minimum priority
          let minimum={};
          // loop through list of servers and compare their priorities if they are online i.e. in fullfilledServer array
          serverList.forEach(server=>{
            if(fullfilledServer.includes(server.url))
              if(minimum.priority)
                minimum=minimum.priority>server.priority?{priority:server.priority, url: server.url}:minimum;
              else
                 minimum={priority:server.priority, url: server.url};
          })
          // if minimum has a key-value pair then there is atleast one server online, so resolve with server information, otherwise reject the promise.
          if(Object.keys(minimum).length > 0)
            resolve({'success':true,'server': minimum});
          else
            reject({'success':false, 'message':"No servers are online"});
        }).catch(err => {
          console.log(err)
          reject({'success':false, 'err':"Some error occured"});
        });
  })
}