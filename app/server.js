const express = require('express');
const fs = require('fs');
const request = require('request');
const phantom = require('phantom');
const app = express();

app.get('/scrape', function(req,res){
  let url = 'https://homescout.homescouting.com/gallery?EntityRoleId=5716137&Location=Saint+Louis%2C+MO&MapWidth=754&MaxLatitude=39.01255303830478&MaxLongitude=-89.83698778710936&MaxPrice=150000&MinLatitude=38.21960970420315&MinLongitude=-90.87244921289061&Page=1&SearchViewType=gallery&SelectedCity=C%3A24189%2CH%3A12837%2CM1%3A38.402237%2CM2%3A38.831475%2CM3%3A-90.530828%2CM4%3A-90.178609&SortBy=ListDateDesc&TeamId=5136873';
  const phantom = require("phantom");
  let _ph, _page, _outObj;
  phantom.create().then(function(ph){
      _ph = ph;
      return _ph.createPage();
  }).then(function(page){
      _page = page;
      return _page.open(url);
  }).then(function(status){
      console.log(status);
      console.log(_page)
      return _page.property('content')
  }).then(function(content){
    const parser = require('./scrape')
    let json =  parser.scrape(content)
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('success')
    })
    res.send('check your console')
      _page.close();
      _ph.exit();
  }).catch(function(e){
     console.log(e);
  });



})

app.listen(8081)

exports = module.exports = app;
