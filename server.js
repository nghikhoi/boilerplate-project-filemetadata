var express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload')
require('dotenv').config()

var app = express();

app.use(cors());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.route('/api/fileanalyse')
    .post((req, res) => {    
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      upfile = req.files.upfile;
      if (!upfile) {
        res.sendStatus(500)
        return
      }

      res.json({
        name: upfile.name,
        type: upfile.mimetype,
        size: upfile.size
      })
    })

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
