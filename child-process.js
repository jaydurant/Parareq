const child = require('child_process');

const forkCount =  parseInt(process.argv[2]);
const intervalTime = parseInt(process.argv[3]);

for (var i = 0 ; i < forkCount; i++){
	process.stdout.write(`Process: ${i} at work`);
	var childProcess = child.fork('get-request.js',['www.google.com', intervalTime]);

	childProcess.on('close', (code) => {`child process exited with code ${code}`})
}