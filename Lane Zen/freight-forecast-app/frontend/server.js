const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const chalk = require('chalk');

// Determine the environment from command line args
const getEnvironment = () => {
  const envArg = process.argv.find(arg => arg.startsWith('--env='));
  if (envArg) {
    return envArg.replace('--env=', '');
  }
  return process.env.NODE_ENV || 'development';
};

const environment = getEnvironment();
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '4000', 10);

// Create the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Print environment banner
const printEnvironmentBanner = () => {
  const envColors = {
    development: 'blue',
    qa: 'yellow',
    production: 'red',
  };
  
  const color = envColors[environment] || 'blue';
  
  console.log(chalk[color]('┌───────────────────────────────────────────────────┐'));
  console.log(chalk[color](`│ Lane Zen - Running in ${environment.toUpperCase()} mode                │`));
  console.log(chalk[color]('└───────────────────────────────────────────────────┘'));
};

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    
    printEnvironmentBanner();
    
    console.log(`> Ready on http://${hostname}:${port}`);
    
    // Log network URLs for easy access from other devices
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const results = Object.create(null);
    
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
          console.log(`> Network URL: http://${net.address}:${port}`);
        }
      }
    }
  });
}); 