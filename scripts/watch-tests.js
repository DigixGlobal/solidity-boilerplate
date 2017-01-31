const path = require('path');
const chokidar = require('chokidar');
const exec = require('child_process').exec;

let running = false;

console.log('watching...', process.env.PWD);

chokidar.watch([
  path.join(process.env.PWD, 'test/**/*'),
  path.join(process.env.PWD, 'contracts/**/*'),
], {
  ignored: /[\/\\]\./, // Ignore files prefixed with "."
  ignoreInitial: false,
}).on('all', () => {
  if (running) { return; }
  running = true;
  const startTime = new Date();
  process.stdout.write('Running Tests...\n');
  const truffleTests = exec('npm run run-tests');
  truffleTests.stdout.on('data', (data) => {
    process.stdout.write(data);
  });
  truffleTests.stdout.on('end', () => {
    running = false;
    const seconds = ((new Date() - startTime) / 1000).toFixed(2);
    process.stdout.write(`\nTests complete, took ${seconds}s\n`);
  });
});
