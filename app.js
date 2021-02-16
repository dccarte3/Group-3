var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
const PORT = 3000

var server = app.listen(PORT, () => {
    console.log('App is listening on port: ' + PORT)
});

app.use(express.static('website'));

app.get('/newgame', function (req, res) {
    let data = req.query
    let games = getList();
    // let game = JSON.stringify(data)
    games.push(data);
    let newGames = JSON.stringify(games);
    fs.writeFile('website/games.json', newGames, (err) => {
        console.log("Game saved");
    })
    res.redirect('/');
})

function getList() {
    let data = fs.readFileSync('website/games.json');
    let games = JSON.parse(data);
    return games;
}