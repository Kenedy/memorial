const express = require('express');
const router = express.Router();
const multer = require('multer');
const repo = require('../repository');
const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid').nanoid;
const photosDir = 'public/images/photos';

if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir, { recursive: true });
}

const imageFilter = function(req, file, cb) {
    cb(null, !!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/));
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, photosDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const newFileName = nanoid() + ext;
        req.fileName = newFileName;
        cb(null, req.fileName)
    }
});

const photos = multer({ storage: storage, fileFilter: imageFilter });

router.post('/uploadResult',
    photos.single('photo'),
    (req, res, next) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Vyberte fotku ve formátu JPG nebo PNG');
        }

        if (!req.body.name) {
            fs.rm(req.file.filename);
            return res.status(400).send('Jméno musí být vyplněno');
        }

        repo.addRacer({
            name: req.body.name,
            comment: req.body.comment,
            fileName: req.fileName
        });

        return res.redirect('racers.html');
    });

module.exports = router;
