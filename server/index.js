const express = require('express');
const cors = require('cors');
const port = 3015;
const app = express();
const docketData = require('./data.json');

app.use(cors());
app.use(express.json());

app.get('/api/getdocketinfo/:docketID', (req, res, next) => {

  docketData.data.filter((value, index) => {
    if(parseInt(req.params.docketID) === value.props_id) {
      return res.status(200).send(value)
    } else {
      return res.send("Invalid docket ID or unable to find ID. Try again!")
    }
  });

});

app.listen(port, () => console.log("Server is up and listen to port on "  + port));

