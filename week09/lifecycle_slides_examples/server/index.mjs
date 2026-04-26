import express from 'express';
import cors from 'cors';
import flip from 'flip-text';

const PORT = 3001;

const app = express();
app.use(cors());

app.get('/number',  (req,res)=>{
    const n = Math.floor(Math.random()*100)+1 ;
    res.json({number:n}) ;
}) ;

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}

const delay = 1000;
app.get('/flip', (req, res) => {
   const text = req.query.text ;
   const flipped = flip(text) ;
   //res.json({text: flipped});
   //setTimeout(()=>res.json({text: flipped}), delay);
   setTimeout(()=>res.json({text: flipped}), delay+getRandomNumber(-500,500) ) ;
});

app.listen(PORT, (err)=>{err ? console.log(err): console.log(`running on port ${PORT}`)})
