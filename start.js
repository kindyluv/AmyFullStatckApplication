const { spawn } = require('child_process');

const clientProcess = spawn('npm', ['start'], { cwd: './Frontend', shell: true });
const serverProcess = spawn('npm', ['start'], { cwd: './Backend', shell: true });

clientProcess.stdout.on('data', (data) => {
  console.log(`[CLIENT]: ${data}`);
});

serverProcess.stdout.on('data', (data) => {
  console.log(`[SERVER]: ${data}`);
});
