const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

var targets = [
  { name: "target1", link: "http://www.sundbysoft.com", timestamp: getTimestamp() },
  { name: "target2", link: "https://www.nrk.no/", timestamp: getTimestamp() }
]

function getTimestamp() {
  return Math.round(+new Date()/1000);
}

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api/getTargets', function (req, res) {
  res.json({
    targets: targets
  });
});

app.get('/api/updateTarget', function (req, res) {
  var name = req.query.name
  var link = req.query.link
  var index = targets.findIndex((target) => {
    return target.name === name;
  })
  if (index >= 0) {
    targets[index].link = link
    targets[index].timestamp = getTimestamp()
  }
  else {
    targets.push({ name: name, link: link, timestamp: getTimestamp()})
  }

  notifyChangedTargets()
  res.json('OK')
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

/* --- Client push setup and functions ---------------------------------- */

const io = require('socket.io')(server);

function notifyChangedTargets() {
  io.emit("targets", targets)
}
