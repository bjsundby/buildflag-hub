const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

var targets = [
]

function getTimeStamp() {
  return Math.round(+new Date() / 1000);
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
    targets[index].timestamp = getTimeStamp()
  }
  else {
    targets.push({ name: name, link: link, timestamp: getTimeStamp() })
  }

  notifyChangedTargets()
  res.json('OK')
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

function processTargets() {
  var limitTime = getTimeStamp() - 60 * 15;
  targets = targets.filter((target) => {
    return target.timestamp > limitTime
  })
  notifyChangedTargets()
}

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  setInterval(function () {
    processTargets();
  }, 10000);
});

/* --- Client push setup and functions ---------------------------------- */

const io = require('socket.io')(server);

function notifyChangedTargets() {
  io.emit("targets", targets)
}
