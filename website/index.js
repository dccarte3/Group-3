var selectedGame = '';
var reviews;

fetch("games.json")
.then(response => response.json()) // response.json()
.then(json => addGames(json));

fetch("reviews.json")
    .then(response => response.json())
    .then(json => reviews = json)


function addGames(j) {
    // takes json and loops thru and makes and adds elements to the DOM
    var listSection = document.getElementById('gamesList')
    for (var i = 0; i < j.length; i++) {
        if(j[i].title != null) {
            let cell = document.createElement("div");
            cell.setAttribute('class', 'gameCell');
            let game = j[i].title
            cell.addEventListener('click', () => {selectGame(game, cell)})
            
            let title = document.createElement("h2");
            title.textContent = j[i].title;
            title.setAttribute('class', 'celltitle label');
            
            let image = document.createElement("img");
            image.setAttribute('src', './image/' + j[i].img);
            // image.setAttribute('src', './Sample-images/' + j[i].img);
            image.setAttribute('class', 'thmbnail');
            
            let tier = document.createElement("h2");
            tier.setAttribute('class', 'celltitle label')
            tier.textContent = "Tier: " + j[i].tier;
            
            let delBtn = document.createElement('button')
            delBtn.setAttribute('class', 'delete')
            delBtn.addEventListener('click', () => {deleteGame(title.innerHTML)})
            delBtn.innerHTML = '&#9747'
            
            cell.appendChild(delBtn);
            cell.appendChild(title);
            cell.appendChild(image);
            cell.appendChild(tier);
            
            let reviewContainer = document.createElement('div')
            reviewContainer.setAttribute('id', j[i].title + "_reviews")
            reviewContainer.setAttribute('class', 'container')
            console.log(j[i].title + "_reviews")
            reviewContainer.style.display = 'none'
            var mainReviewSection = document.getElementById('mainReviews')
            mainReviewSection.appendChild(reviewContainer)
            
            listSection.appendChild(cell);
        }
    }
    selectGame(j[0].title, listSection.children[0])
    // gamesList = j;
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

function selectGame(game, elem) {
    selectedGame = game
    let link = document.getElementById("reviewLink")
    link.setAttribute('href', '/review/' + game + '/default')
    
    var main = document.getElementById("gamesList")
    for (child of main.children) {
        child.style.backgroundColor = '#44475a'
    }
    
    var allSections = document.getElementsByClassName('container')
    for (section of allSections) {
        section.style.display = 'none'
    }
    
    getReviews(game)
    var reviewsSection = document.getElementById(game + '_reviews')
    reviewsSection.style.display = 'inline-block'
    
    elem.style.backgroundColor = "#6272a4"
}

function getReviews(title) {
    var filteredReviews = []
    for (review of reviews) {
        if (review.title == title) {
            reviewBlock = document.createElement('div')
            reviewBlock.setAttribute('class', 'reviewblock')
            
            var subject = document.createElement('h2')
            subject.textContent = review.title
            reviewBlock.appendChild(subject)
            
            var author = document.createElement('h3')
            author.textContent = review.Username
            reviewBlock.appendChild(author)
            
            var content = document.createElement('p')
            content.textContent = review.content
            reviewBlock.appendChild(content)
            
            // document.body.appendChild(reviewBlock)
            var container = document.getElementById(title + '_reviews')
            container.appendChild(reviewBlock)
        }
    }
    
}