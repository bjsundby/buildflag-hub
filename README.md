# Buildflag Hub
Software development for hub

Control panel at port 3000.
Rest API at port 3001.

By SundbySoft.com

## Deploy to Heroku

```bash
heroku create
git push heroku master
```

## Local Development

### Run the API Server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```
