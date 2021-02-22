const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000

var server = app.listen(PORT, () => {
    console.log('App is listening on port: ' + PORT)
});

app.use(express.static(__dirname + '/website'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'website/Sample-images/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

app.post('/newgame', function (req, res) {
    console.log('File: ' + req.file)
    
    let upload = multer({storage: storage}).single('img')
    upload(req, res, function(err) {
        let data = req.body
        let games = getList();
        data.img = req.file.originalname
        games.push(data)
        newList(games)
        if (req.fileValidationError) {
            return res.send(req.fileValidationError)
        }
        else if (!req.file) {
            return res.send('Please select an image to upload')
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err)
        }
        console.log(req.file.path)
    })
    
    res.redirect('/');
})

app.post('/update', function (req, res) {
    let data = req.body;
    newList(data)
    // let newGames = JSON.stringify(data);
    // fs.writeFile('website/games.json', newGames, (err) => {
    //     console.log('Deleted Game')
    // })
})

function getList() {
    let data = fs.readFileSync('website/games.json');
    let games = JSON.parse(data);
    return games;
}

function newList(games) {
    if (games != null) {
        console.log('Hiiiiiiii')
        let newGames = JSON.stringify(games);
        fs.writeFile('website/games.json', newGames, (err) => {
            console.log("Game List saved");
        })
    }
}