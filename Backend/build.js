const { spawn } = require('child_process');

const runBuild = () => {
  const buildProcess = spawn('npm', ['run', 'build'], { shell: true });

  buildProcess.stdout.on('data', (data) => {
    console.log(`[BUILD]: ${data}`);
  });

  buildProcess.stderr.on('data', (data) => {
    console.error(`[BUILD ERROR]: ${data}`);
  });

  buildProcess.on('error', (error) => {
    console.error(`[BUILD ERROR]: ${error.message}`);
  });

  buildProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Build process completed successfully.');
    } else {
      console.error(`Build process exited with code ${code}.`);
    }
  });
};

runBuild();
