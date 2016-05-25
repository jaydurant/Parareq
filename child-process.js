const child = require('child_process');

const forkCount =  parseInt(process.argv[2]);
const forkCalls =  parseInt(process.argv[3])
const intervalTime = parseInt(process.argv[4]);

for (var i = 0 ; i < forkCount; i++){
	process.stdout.write(`Process: ${i} at work`);
	let childProcess = child.fork('get-request.js',['www.reddit.com',forkCalls ,intervalTime]);

	childProcess.on('close', (code) => {`child process exited with code ${code}`})
}