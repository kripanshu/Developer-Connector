const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const profile = require('./routes/api/profile')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')

const app = express();
// Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// config DB
const db = require('./config/keys').mongoURI;

// connect to mongoose
mongoose.connect(db).then(() => console.log('MongoDB Connected'))
.catch(err => console.log("Error in connceting to MongoDB ", err));

app.get('/', (req, res) => res.send("Forca Barca"));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port ', port));