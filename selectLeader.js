const express = require('express');
const router = express.Router();
const axios = require('axios');

var leadearElection = false;
var isLeader = true;
var idServer = 9;
var leaderId = 9;

var ipList = ["http://localhost:3031", "http://localhost:3032"];

var serverList = [];

router.get('/coordinator', function(req, res) {
    for (let index = 0; index < ipList.length; index++) {
        axios.get(ipList[index] + '/get_serverId')
            .then(response => {
                if (response.data.participation == true) {
                    serverList.push([ipList[index], response.data.id]);
                }
            }).catch(error => {
                console.log(error);
            });
    }
    evaluateId();
});

function evaluateId() {
    var leader = true;
    for (let index = 0; index < serverList.length; index++) {
        if (serverList[index][1] > idServer) {
            leader = false;
            sendMessage(serverList[index][0]);
        }
    }
    if (leader == true) {
        leaderId = idServer;
        isLeader = true;
        console.log(leaderId + " - : - " + idServer)
    }
}

function sendMessage(ipS) {
    axios.get(ipS + '/coordinator')
    .then(response => {
        console.log('Ok');
    }).catch(error => {
        console.log('error');
    });
}

router.get('/forefitFromLeader', function(req, res) {
    leadearElection=false;
    axios.get(ipList[0] + '/coordinator')
        .then(response => {
            console.log('Election in progress');
        })
        .catch(error => {
            res.send('error');
        });
});

router.get('/get_serverId', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({id:idServer, participation:leadearElection});
});

module.exports = router;