if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//Initializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));//El servidor interpretará los datos del formulario como si fuera un json
app.use(express.json());//El servidor entiende las peticiones AJAX
app.use(cors());

// Routes
app.use('/api/books', require('./routes/books.js'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start the Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});