const express = require('express');
const bodyParser = require('body-parser');
const { data } = require('./data/data.json');
const { projects } = data;
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
// to setup pug middleware
app.set('view engine', 'pug');
// static route to serve the static files located in the public folder
app.use('/static',express.static('public'));

app.get('/', (req,res)=>{
   // const pname = projects[0].name;
   res.render('index',{projects});
});

app.get('/about', (req,res)=>{
   res.render('about.pug');
});

app.get('/project/:id', (req,res)=>{
   const { id } = req.params;
   const title = projects[id].name;
   const description = projects[id].description;
   const technologies = projects[id].technologies;
   const images = projects[id].image_urls;
   const liveLink = projects[id].live_link;
   const gitLink = projects[id].github_link;
   res.render('project.pug', { id, title, description, technologies, images, liveLink, gitLink });
});

// Middleware to handle 404 Error
app.use((req, res, next)=> {
   const err = new Error('The page you are looking for is not available');
   err.status = 404;
   next(err);
});

//Error Handler
app.use((err, req, res, next)=>{
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});
// setup the server
app.listen(3000, ()=>{console.log('app is running on port 3000')});
