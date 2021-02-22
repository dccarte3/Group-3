fetch("games.json")
    .then(response => response.json())
    .then(json => addGames(json));

function addGames(j) {
    // takes json and loops thru and makes and adds elements to the DOM
    for (var i = 0; i < j.length; i++) {
        if(j[i].title != null) {
            let cell = document.createElement("div");
            cell.setAttribute('class', 'gameCell');
            
            let title = document.createElement("h2");
            title.innerHTML = j[i].title;
            title.setAttribute('class', 'celltitle label');
            
            let image = document.createElement("img");
            image.setAttribute('src', './Sample-images/' + j[i].img);
            console.log(j[i].img)
            image.setAttribute('class', 'thmbnail');
            
            let tier = document.createElement("h2");
            tier.setAttribute('class', 'celltitle label')
            tier.innerHTML = "Tier: " + j[i].tier;
            
            let delBtn = document.createElement('button')
            delBtn.setAttribute('class', 'delete')
            delBtn.addEventListener('click', () => {deleteGame(title.innerHTML)})
            delBtn.innerHTML = '&#9747'
            
            cell.appendChild(delBtn);
            cell.appendChild(title);
            cell.appendChild(image);
            cell.appendChild(tier);
            
            let listSection = document.getElementById('gamesList')
            listSection.appendChild(cell);
        }
    }
    gamesList = j;
}

function deleteGame(target) {
    // target is the title of the game to be deleted
    // fetch asks server for the current list of games and returns a json file called json
    fetch("games.json")
    .then(response => response.json())
    .then(json => {
        var newList = [];
        // loops thru json and adds any games that do not match to a new list
        for (var i = 0; i < json.length; i++) {
            let game = json[i]
            if (game.title != target) {
                newList.push(game)
            }
        }
        // gets the list of games in the DOM and clears them
        let listSection = document.getElementById('gamesList')
        listSection.innerHTML = ''
        addGames(newList)
        // uses fetch to send a POST req to update game list json
        fetch('/update',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newList)
        })
        .then(function(res){console.log(res)})
        .catch(function(res){console.log(res)})
        // location.reload();
    });
}