console.log('Hey')
var gamesList;
fetch("games.json")
    .then(response => response.json())
    .then(json => addGames(json));

function addGames(j) {
    for (var i = 0; i < j.length; i++) {
        let cell = document.createElement("div");
        cell.setAttribute('class', 'gameCell');
        
        let title = document.createElement("h2");
        title.innerHTML = j[i].title;
        title.setAttribute('class', 'celltitle label');
        
        let image = document.createElement("img");
        image.setAttribute('src', './Sample-images/' + j[i].img);
        image.setAttribute('class', 'thmbnail');
        
        let tier = document.createElement("h3");
        tier.setAttribute('class', 'celltitle label')
        tier.innerHTML = "Tier: " + j[i].tier;
        
        cell.appendChild(title);
        cell.appendChild(image);
        cell.appendChild(tier)
        
        let listSection = document.getElementById('gamesList')
        listSection.appendChild(cell);
    }
}