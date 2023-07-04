const express = require('express')
var axios = require("axios").default;
const path=require("path")
const app = express()
const port = 3000

app.get('/', (req, res) =>{
    console.log(path.join(__dirname,'public'))
    app.use(express.static(__dirname + '/public'));
    return res.sendFile('public/index.html' , {root:__dirname});

})

app.get('/searchword', (req, res) => {
  console.log(req.params)
  
var options = {
  method: 'GET',
  url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
  params: {word: req.query.word},
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_API_KEY,
    // 'X-RapidAPI-Key': 'b75ced1511msh9c551f30cb73c24p10a6d3jsn560f2f07826d',
    'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
  res.json(response.data)
}).catch(function (error) {
  console.error(error);
});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} - http://localhost:3000`)
})