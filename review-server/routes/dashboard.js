var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const reviewItem = require('../model/reviewItem');
const bodyParser = require('body-parser');

router.get('/histlastmonthatemp', function (req, res, next) {
    mongoose.connect('mongodb://review:zkzkdh500$#@localhost:27017/reviewDB', {useNewUrlParser: true})
    .then(() => {
        var date  = new Date();
            var year  = date.getFullYear();
            var month = ("0"+(date.getMonth())).slice(-2);
            var dateCondition = year+'-'+month;
            reviewItem.countDocuments({ status:'완료' , date : { $regex: '.*' + dateCondition + '.*' } }, 
                function(err, cnt) {
                    res.json({count:cnt});
            });
    })
});

router.put('/:id', function (req, res, next) {
    mongoose.connect('mongodb://review:zkzkdh500$#@localhost:27017/reviewDB', {useNewUrlParser: true})
    .then(() => {
        reviewItem.update({ _id : req.params.id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'review not found' });
            res.json( { message: 'review updated' } );
        })
    })
});

router.delete('/:id', function (req, res, next) {
    mongoose.connect('mongodb://review:zkzkdh500$#@localhost:27017/reviewDB', {useNewUrlParser: true})
    .then(() => {
        reviewItem.deleteOne({ _id : req.params.id }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'review not found' });
            res.json( { message: 'review deleted' } );
        })
    })
});

router.post('/',function(req,res,next){
    mongoose.connect('mongodb://review:zkzkdh500$#@localhost:27017/reviewDB', {useNewUrlParser: true})
    .then(() => {
        var newItem = new reviewItem();
        newItem.srno      = req.body.srno
        newItem.srtitle   = req.body.srtitle,
        newItem.developer = req.body.developer
        newItem.charger   = req.body.charger
        newItem.date      = req.body.date
        newItem.site      = req.body.site
        newItem.risk      = req.body.riskß
        newItem.status    = req.body.status

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