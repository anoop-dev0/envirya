var express = require('express');
var router = express.Router();

router.get('/working',(req,res)=>{
    res.status(200).send("Working");
})
router.get('/workingsame',(req,res)=>{
    res.status(200).send("Working");
})
router.get('/notworking',(req,res)=>{
    res.status(500).send("Not Working");
})
router.get('/againnotworking',(req,res)=>{
    res.status(500).send("Not Working");
})

module.exports = router;
