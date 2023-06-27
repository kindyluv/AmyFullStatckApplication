const spawn = require('cross-spawn');
const path = require('path');

const cmdPath = path.join(process.env.SystemRoot, 'System32', 'cmd.exe');

const clientProcess = spawn(cmdPath, ['/c', 'npm', 'run', 'build'], { cwd: './client', shell: true });
const serverProcess = spawn(cmdPath, ['/c', 'npm', 'run', 'build'], { cwd: './server', shell: true });

clientProcess.stdout.on('data', (data) => {
  console.log(`[CLIENT]: ${data}`);
});

serverProcess.stdout.on('data', (data) => {
  console.log(`[SERVER]: ${data}`);
});
