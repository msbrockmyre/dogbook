var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/image'),
    dog = require ('../controllers/dog');
    
module.exports = function(app){
     router.get('/', home.index);
     router.get('/images/:image_id', image.index);
     router.get('/dogs/:dog_id', dog.index);
     router.post('/images', image.create);
     //router.post('/dogs', dog.create);
     router.post('/images/:image_id/like', image.like);
     router.post('/images/:image_id/rate/:rating', image.rate);
     router.post('/images/:image_id/comment', image.comment);
     router.delete('/images/:image_id', image.remove);
     app.use(router);
};