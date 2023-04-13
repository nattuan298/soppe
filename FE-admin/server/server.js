const express = require('express');
const app = express();
const path = require('path');

//serve static path
//https://expressjs.com/en/api.html#example.of.express.static
var options = {
    etag: true,
    //maxAge: 3600000, //in ms i.e 1 hr in this case
    redirect: true,
    setHeaders: function (res, path, stat) {
      //any other header in response
      res.set({
          'Cache-Control' : 'no-cache, no-store, must-revalidate'
        });
    }
}
app.disable('x-powered-by');
app.use('/', express.static(path.join(__dirname, '../build'), options));
app.use('/*', express.static(path.join(__dirname, '../build'), options));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server started at 3000');
});
