import express from 'express';

const app: express.Application = express()

app.get('/', function (req, res) {
    res.send('Hello World! + 3')
})

app.listen(3000, function () {
    console.log('App is listening on port 3000!')
})