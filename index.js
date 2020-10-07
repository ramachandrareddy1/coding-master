const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 8080;

app.use(bodyParser.json());
app.use('/pets', require('./router/index.router'));

app.listen(port, (err) => {
    if (err) console.log('Error in server starting ', err);
    else console.log(`Server running on the port: ${port}`);
});

module.exports = app;