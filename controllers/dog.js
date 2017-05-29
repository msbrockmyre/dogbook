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
    create: function(dog_name, image_id) {//todo next
        var saveImage = function() {
          console.log(req);
            var dogName = req.body.dog_name;

  
          Models.Dog.find({ name: dogName }, function(err, dogs) {
                if (dogs.length == 0) { 
                    var newDog = new Models.Dog({
                                name: dog_name,
                                image_ids: [image_id]
                            });
                            newDog.save(function(err, dog) {
                                console.log('Successfully created dog: ' + dog.name);
                                res.redirect('/dogs/' + dog.name);
                                });
                }
                else {
                    dogs[0].image_ids.push(image_id);
                    dog[0].save(function(err, dog) {
                                console.log('Successfully updated dog: ' + dog.name);
                                });
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