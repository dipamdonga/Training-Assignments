const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

let users = [];

//#region read json file
fs.readFile('./data.json', 'utf-8', (error, data) => {
    if(error) console.log('error while reading file');
    else users = JSON.parse(data);
});
//#endregion read json file

//#region Get APIs
app.get('/', (req, res) => {
    res.send('Hello World from nodejs...');
});

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get('/api/users/:id', (req, res) => {
    const findUser = users.find(u => u.id === parseInt(req.params.id));
    // console.log(findUser);
    if(!findUser) return res.status(400).send(`User not found for id: ${req.params.id}.`);

    res.send(findUser);
});
//#endregion Get APIs

//#region Post API
app.post('/api/users', (req, res) => {
    const user = req.body;
    users.push(user);
    // console.log(typeof(JSON.stringify(user)));
    fs.writeFile('./data.json', JSON.stringify(users), 'utf8', (error) => {
        if(error) { 
            console.log(error); 
        } else {
            console.log(`data with id: ${user.id} is added successfully.`); 
            res.send(`user ${user.name} data added successfully.`);
        }
    });
});
//#endregion Post API

//#region Put API
app.put('/api/users/:id', (req, res) => {
    // console.log(users);
    const findUser = users.find(u => u.id === parseInt(req.params.id));
    if(!findUser) return res.status(404).send(`User with id: ${req.params.id} dose not exist!`);

    // const index = users.indexOf(findUser);
    // users.splice(index, 1);
    
    // update data
    findUser.name = req.body.name;
    findUser.password = req.body.password;
    findUser.gender = req.body.gender;
    findUser.birthdate = req.body.birthdate;
    findUser.age = req.body.age;
    findUser.country = req.body.country;
    findUser.phone = req.body.phone;

    // users.push(findUser);

    const newState = users.map(obj =>
        obj.id === req.params.id ? { ...obj, findUser } : obj
    );
    // console.log(newState);

    fs.writeFile('./data.json', JSON.stringify(newState), 'utf8', (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log(`data with id: ${req.params.id} is updated successfully.`)
            res.send(`user (${findUser.name}) data updated successfully.`);
        }
    });

});
//#endregion Put API

//#region Delete API
app.delete('/api/users/:id', (req, res) => {
    const findUser = users.find(u => u.id === parseInt(req.params.id));
    if(!findUser) return res.status(404).send(`User with id: ${req.params.id} dose not exist!`);

    const index = users.indexOf(findUser);
    users.splice(index, 1);

    fs.writeFile('./data.json', JSON.stringify(users), 'utf8', (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log(`data with id: ${req.params.id} is deleted successfully.`)
            res.send(`user (${findUser.name}) data deleted successfully.`);
        }
    });
});
//#endregion Delete API

app.listen(30, () => {
    console.log('Listing on port http://localhost:80...');
});