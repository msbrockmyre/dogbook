//this is copied from image.js.  Need to update to work with dog profiles
var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models'),
    md5 = require('MD5');
    
module.exports = {
    index: function(req, res){
        var viewModel = {
            images: []
        };
        Models.Dog.findOne({ name: { $regex: req.params.dog_id } },
            function(err, dog) {
                if (err) { throw err; }
                if (dog) {
                    dog.views = dog.views + 1;
                    viewModel.images = dog.images;
                    image.save();

                } else {
                    res.redirect('/');
                }
            });
    },
    // sidebar(viewModel, function(viewModel){
    //        res.render('image', viewModel);
    //    });
    //    
    //},
    create: function(req, res) {//todo next
        var saveImage = function() {
          console.log(req);
            var dogName = req.body.dog_name;

  
          Models.Dog.find({ name: dogName }, function(err, dogs) {
                if (dogs.length == 0) { 
                    var newDog = new Models.Dog({
                                name: req.body.title,
                                image_ids: [req.body.image_id]
                            });
                            newImg.save(function(err, image) {
                                console.log('Successfully inserted image: ' + image.filename);
                                res.redirect('/images/' + image.uniqueId);
                                });
                }
                else {
                    dogs[0].
                }
          });
        };

        saveImage();
    }/*,
    remove: function(req, res) {
        Models.Image.findOne({ filename: { $regex: req.params.image_id } },
            function(err, image) {
                if (err) { throw err; }

                fs.unlink(path.resolve('./public/upload/' + image.filename),
                    function(err) {
                        if (err) { throw err; }

                        Models.Comment.remove({ image_id: image._id},
                            function(err) {
                                image.remove(function(err) {
                                    if (!err) {
                                        res.json(true);
                                    } else {
                                        res.json(false);
                                    }
                                });
                        });
                });
            });
    }*/
}; 