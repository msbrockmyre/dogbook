var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models'),
    dog = require('../models/dog'),
    md5 = require('MD5');
    
module.exports = {
    index: function(req, res){
        var viewModel = {
            images: []
        };
        dog.findOne({ name: { $regex: req.params.dog_id } },
            function(err, dog) {
                if (err) { throw err; }
                if (dog) {
                    dog.views = dog.views + 1;
                    Models.Image.findOne({ filename: { $regex: dog.image_ids[0] } },
                    function(err, image) {
                        viewModel.images.push(image);
                        Models.Image.findOne({ filename: { $regex: dog.image_ids[1] } },
                        function(err, image) {
                            viewModel.images.push(image);
                            Models.Image.findOne({ filename: { $regex: dog.image_ids[2] } },
                            function(err, image) {
                                    viewModel.images.push(image);
                                    sidebar(viewModel, function(viewModel) {
                                        res.render('image', viewModel);
                                    });
                            });
                        });
                    });

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
  
          dog.find({ name: dog_name }, function(err, dogs) {
                if (dogs.length == 0) { 
                    var newDog = new dog({
                                name: dog_name,
                                image_ids: [image_id]
                            });
                            newDog.save(function(err, dog) {
                                console.log('Successfully created dog: ' + dog.name);
                                });
                }
                else {
                    dogs[0].image_ids.push(image_id);
                    dogs[0].save(function(err, dog) {
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