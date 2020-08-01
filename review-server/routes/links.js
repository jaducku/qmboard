var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const linklItem = require('../model/linkItem');
const bodyParser = require('body-parser');
require('dotenv').config();

router.get('/', function (req, res, next) {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => {
        linklItem.find({}, function(err, datas) {
            if(err) console.log(datas);
            res.send(datas);
        });
    })
});

router.post('/',function(req,res,next){
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => {
        var newItem = new linkItem();
        newItem.link      = req.body.link
        newItem.title      = req.body.title

        newItem.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
                res.json({result: 1});
        });
    })
})

module.exports = router;