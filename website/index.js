fetch("games.json")
    .then(response => response.json())
    .then(json => addGames(json));

function addGames(j) {
    for (var i = 0; i < j.length; i++) {
        if(j[i] != null) {
            let cell = document.createElement("div");
            cell.setAttribute('class', 'gameCell');
            
            let title = document.createElement("h2");
            title.innerHTML = j[i].title;
            title.setAttribute('class', 'celltitle label');
            
            let image = document.createElement("img");
            image.setAttribute('src', './Sample-images/' + j[i].img);
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
    fetch("games.json")
    .then(response => response.json())
    .then(json => {
        var newList = [];
        for (var i = 0; i < json.length; i++) {
            let game = json[i]
            if (game.title != target) {
                newList.push(game)
            }
            // if (game.title == target) {
            //     delete json[i]
            // }
        }
        let listSection = document.getElementById('gamesList')
        // console.log(listSection)
        listSection.innerHTML = ''
        addGames(newList)
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

function test(text) {
    console.log(text)
}