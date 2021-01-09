//config? dotenv(preferable) express mongoose   shortid valid-url, i -D nodemon
// `npm run dev` to start nodemon
const express = require('express'),
PORT = 5000,
connectDB = require('./config/db'),
bodyParser = require('body-parser'),
app = express();

// Mongo Connection 
connectDB();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//app UI
/** Serve static assets  */
app.use(express.static(__dirname + "/UI/public"));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/UI/views/main.html');
});
// set up routes:
app.use('/api/shorturl', require('./routes/urlRouter'));

app.listen(process.env.PORT || PORT, () => {
    console.log('Listening on port 3000');
});