const express = require('express');
const bodyParser = require('body-parser');
const { data } = require('./data/data.json');
const { projects } = data;
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
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

app.get('/project/:id', (req,res,next)=>{
   const { id } = req.params;
   if(Number.isNaN(id) && id >= projects.length && id < 0){
     // let errs = new Error("Page ID does not exists");
     // err.status = 500;
     // next(errs);
     let err = new Error("This project page doesn't exist");
     next(err);
   } else {
     const title = projects[id].name;
     const description = projects[id].description;
     const technologies = projects[id].technologies;
     const images = projects[id].image_urls;
     const liveLink = projects[id].live_link;
     const gitLink = projects[id].github_link;

    return res.render('project.pug', { id, title, description, technologies, images, liveLink, gitLink });
   }
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
  if (err.status >= 100 && err.status < 600)
    res.status(err.status);
  else{
    res.status(500);
    }
  res.render('error');
});
// setup the server
app.listen(3000, ()=>{console.log('app is running on port 3000')});
