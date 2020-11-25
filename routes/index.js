var express = require('express');
var router = express.Router();
const SERVERS = require('../data/servers.json');
const { findServer, findServer_copy } = require("../controlers/serverAvailability");


/* GET home page. */
router.get('/', async (req, res, next) => {

  findServer_copy(SERVERS).then(response=>{
    res.send(response);
  }).catch((err)=>{
    res.status(500).send(err);
  })
});

module.exports = router;
