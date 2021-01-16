var express = require('express');
var router = express.Router();
var multer = require('multer');

const imageFilter = function(req, file, cb) {
    cb(null, !!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/));
};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/photos');
    },
    filename: function (req, file, cb) {
        console.log(JSON.stringify(file));
        var fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName)
    }
});


var photos = multer({ storage: storage, fileFilter: imageFilter });

router.post('/uploadResult',
    photos.single('photo'),
    (req, res, next) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Vyberte fotku ve formátu JPG nebo PNG');
        }

        // TODO: Implement

        const file = req.file;
        console.log(file.filename);
        console.log(`name: ${req.body.name}`);
        console.log(`comment: ${req.body.comment}`);

        //res.send();
        res.send('upload ok');
    });

module.exports = router;
