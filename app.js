const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require("body-parser");
const mgb = require("./mgb.js");
const { title } = require('process');
const app = express();
const PORT = 3000

var server = app.listen(PORT, () => {
    console.log('App is listening on port: ' + PORT)
});

app.use(express.static(__dirname + '/website'));
app.set('views', path.join(__dirname, 'website'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './Sample-images/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/signup', (req, res) => {
    res.render('signup.html')
})

app.get('/login', (req, res) => {
    res.render('login.html')
})

app.get('/addgames', (req, res) => {
    res.render('addgames.html')
})

app.get('/review/', (req, res) => {
    res.send('Get smoked idiot')
})

app.get('/review/:title/:user', (req, res) => {
    var gameTitle = req.params.title
    var userName = req.params.user
    res.render('review', {title: gameTitle, user: userName})
})

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + "/website/" + "styles.css");
});

app.get('/index.js', function(req, res) {
    res.sendFile(__dirname + "/website/" + "index.js");
})

app.get('/games.json', function(req, res) {
    res.sendFile(__dirname + "\\games.json")
})

app.get('/reviews.json', function(req, res) {
    res.sendFile(__dirname + "\\reviews.json")
})

app.get('/image/:title', function(req, res) {
    res.sendFile(__dirname + "\\Sample-images/" + req.params.title)
})

app.post('/newgame', function (req, res) {
    console.log('File: ' + req.file)
    console.log('Body: ' + req.body)
    let upload = multer({storage: storage}).single('img')
    console.log('Uno') // <---------------------------------------------
    upload(req, res, function(err) {
        console.log('Dos') // <---------------------------------------------
        let data = req.body
        let games = getList();
        tempGame = {
            "title": data.title,
            "img": req.file.originalname,
            "tier": data.tier
        }
        // data.img = 
        games.push(tempGame)
        console.log(games)
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

app.post('/newuser', function (req, res) {
    var data = req.body
    console.log(data.username)
    mgb.saveUser(data)
    res.send('User added?<a href="./">click here</a>')
})

app.post('/userlogin', function (req, res) {
    let uname = req.body.username
    let upass = req.body.password
    mgb.validateUser(uname, upass)
    res.send('Jobs done')
})

app.post('/addreview', function(req, res) {
    var newRev = req.body
    reviews = getReviews()
    tempRev = {
        "title": newRev.gtitle,
        "Username": newRev.user,
        "subject": newRev.rtitle,
        "content": newRev.content
    }
    reviews.push(tempRev)
    saveReviews(reviews)
    res.redirect('/')
})

function getList() {
    try {
        let data = fs.readFileSync('./games.json');
        let games = JSON.parse(data);
        return games;
    }
    catch {
        console.log('oopsies')
    }
}

function newList(games) {
    if (games != null) {
        console.log('Tres') // <---------------------------------------------
        let newGames = JSON.stringify(games);
        fs.writeFile('./games.json', newGames, (err) => {
            if(err) {
                console.log(err);
            }
        })
    }
}

function getReviews() {
    let data = fs.readFileSync('./reviews.json');
    let reviews = JSON.parse(data);
    return reviews;
}

function saveReviews(data) {
    let reviews = JSON.stringify(data);
    fs.writeFile('./reviews.json', reviews, (err) => {
        if (err) {
            console.log(err)
        }
    })
}