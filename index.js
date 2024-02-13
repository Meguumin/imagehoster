const express = require('express');
const hb = require ('handlebars');
const fs = require('fs')
const path = require('path')
const FormData = require('form-data');
const PocketBase = require('pocketbase/cjs')
const pb = new PocketBase('http://127.0.0.1:8090');
const authData = pb.admins.authWithPassword('aidenloktong@gmail.com', 'wm52QCjcsJjkfy2');
const app = express();  

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'));
});



app.get("/gallery/:number", (req, res) => {
  const imageNumber = req.params.number;
  try {
    res.sendFile(path.join(__dirname,'HTMLFilesHosted','image'+imageNumber+'.html'));
  }
  catch(err) {
    res.sendFile(path.join(__dirname,'HTMLFilesHosted','error.html'));
  }
 });


 app.get('/upload', async (req, res) => {
  const records = await pb.collection('File_ImagesStoring').getFullList({
    sort: '-created',
    });
 const latestRecord = records[0];
 const recordId = latestRecord.id; 
 const fileName = latestRecord.image; 
 const imageSource = "http://127.0.0.1:8090/api/files/melztzaiw6ah3fa/" + recordId + '/' + fileName;
 const template = fs.readFileSync('views/layouts/main.handlebars','utf8');
 const compiled = hb.compile(template);
 const html = compiled({imageSource}); 
 const length = fs.readdirSync('./HTMLFilesHosted').length + 1;
 const lengthstring =  "image"+ length +".html";
 console.log(lengthstring);
fs.writeFileSync('HTMLFilesHosted/' + lengthstring, html);
res.sendFile(path.join(__dirname,'HTMLFilesHosted','image'+length+'.html'));
});


app.use(express.static(__dirname + "/public"));
app.listen(3000, () => {
  console.log('server started at 3000');
});"";


 