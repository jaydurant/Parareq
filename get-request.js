const https = require('https');

const options = {
	hostname: process.argv[2],
	path: '/',
	method: 'GET',
	headers:{
		'Accept': '*/*'
	}
};

let count = 0;
const limit = parseInt(process.argv[3]);
const intervalTime = Number(process.argv[4]) ? parseInt(process.argv[4]) : 	Math.ceil(Math.random() * 100);

function loop(){
	setTimeout(() => {
		let randNumber = parseInt(Math.random() * 10000000 + 10000);
		options.path = `/?bid=test${randNumber}&pid=test${randNumber}`;
		let request = https.request( options , (res) => {
			console.log(`Status: ${res.statusCode} , Count: ${++count}`);
			console.log(options.path);
			if(count < limit){
				loop();
			}
		});

		request.on('error', (e) => {
			console.log(`Error: ${e.message}`);
		})

		request.end();

	}, intervalTime);
}

loop();



