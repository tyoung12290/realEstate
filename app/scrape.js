const cheerio = require('cheerio');
let json = {price : ""}
let scrape = function (content){
  let $ = cheerio.load(content);
  //finally, we'll define the variables we're going to capture
  let title, release, rating;


  $('.margin-left-4 gallery-line-two').filter(function(){
    //store the data we filter
    let data = $(this);
    //jQuery navigation
    price = data.children().first().text();
    json.price = price
  })
  console.log(json)
  return json
}
module.exports = {
  scrape:scrape
}
