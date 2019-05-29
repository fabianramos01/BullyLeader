const express = require('express');
const router = express.Router();
const axios = require('axios');

var leadearElection = true;
var isLeader = true;
var idServer = 9;
var leaderId = 9;

var ipList = ["http://192.168.1.19:3030", "http://192.168.1.19:3031"]

router.post('/selectLeader', function(req, res) {
    console.log(req.body.id);
    for (let index = 0; index < ipList.length; index++) {
        axios.get(ipList[index] + '/get_serverId')
        
    }
});

function sendId(idServ, res) {
    axios.post(ip + '/selectLeader', {id: idServ})
        .then(response => {
            console.log('Election in progress');
        })
        .catch(error => {
            res.send('error');
        });
}

router.get('/forefitFromLeader', function(req, res) { //isLeader to false - leaderElection to false
    leadearElection=false;
    axios.post(ip + '/selectLeader', {id: 0})
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
    res.send({id:leaderId});
});

module.exports = router;