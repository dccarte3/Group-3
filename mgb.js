const fs = require('fs');

function saveUser(data) {
    let users = getUserList();
    let newUser = {
        "id": data.displayname[0] + data.username[0] + users.length ,// made from name + number?
        "Display_Name": data.displayname,
        "Username": data.username,
        "password": data.password,
        "admin": false
    }
    
    users.push(newUser)
    
    newUsers = JSON.stringify(users)
    fs.writeFile('./users.json', newUsers, (err) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log('New user added!')
        }
    })
}

function getUserList() {
    let u = fs.readFileSync('./users.json')
    let users = JSON.parse(u)
    
    return users;
}

function validateUser(username, password) {
    console.log(username)
    console.log(password)
    let users = getUserList();
    for (user of users) {
        console.log(user.Username)
    }
}

module.exports = {
    saveUser,
    getUserList,
    validateUser
}
