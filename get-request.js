const https = require('https');

const options = {
	hostname: process.argv[2],
	path: '/',
	method: 'GET',
	headers:{
		'Accept': '*/*'
	}
};

const bids = [
	'ZyBnHSGLqPSnhM%2F95ehFLg%3D%3D',
	'UJyfMBEsf%2BXP425crU7j4w%3D%3D',
	's6lgGPUqkTqvzaXJCua9lg%3D%3D',
	'YaXE19Fuygtmq%2F7s5l25yQ%3D%3D',
	'0qmsj78C04BSLQ6a2QRdQw%3D%3D'
];

const events = [
	'error',
	'pageview',
	'conversion',
	'lead',
	'addtocart',
	'search',
	'buttonclick'
];


let count = 0;
const limit = parseInt(process.argv[3]);
const intervalTime = Number(process.argv[4]) ? parseInt(process.argv[4]) : 	Math.ceil(Math.random() * 100);

function loop(){
	setTimeout(() => {
		let randBID = bids[Math.floor(Math.random() * 5)];
		let randEvent = events[Math.floor(Math.random() * 7)];
		let eventURIString = eventSelection(randEvent);
		options.path = `/?b=test_${randBID}&p=${randBID.substring(0,8)}&u=https://test.fuelx.com&t=${Date.now()}&v=1${eventURIString}`;
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

function eventSelection(selectedEvent){
	let queryURI;

	switch (selectedEvent){
		case 'error':
			queryURI = `&y=ex&exm=window%20is%20not%20defined`;
			break;
		case 'pageview':
			let pageArray = [
				'&y=js&l=%5B%7B%22ev%22%3A%22pageview%22%2C%22pn%22%3A%22general%22%7D%5D',
				'&y=js&l=%5B%7B%22ev%22%3A%22pageview%22%2C%22pn%22%3A%22testingpage%22%7D%5D',
				'&y=js&l=%5B%7B%22ev%22%3A%22pageview%22%2C%22pn%22%3A%22testingpage2%22%7D%5D'
			];
			queryURI = pageArray[Math.floor(Math.random() * 3)];
			break;
		case 'conversion':
			let conversionEmail = Math.round(Math.random()) ? '&em=loadtesting%40fuelx.com' : '' ;
			let products = function(l){
				let productsArray = [];
				for(let i = 0;i < l; i++){
					let singleProd = `prod${Math.floor(Math.random() * 100000) + 100000}`;
					productsArray.push(singleProd);
				}
				return productsArray.join('%3B');
			}(Math.random() * 10 + 1); 
			queryURI = `&y=qs&ev=conversion&oid=${parseInt(Math.random() * 1000000000) + 100000}&ov=${(Math.random() * 1000).toFixed(2)}&pr=${products}${conversionEmail}`;
			break;
		case 'lead':
			let businessArray = [
				'BTB',
				'BTC',
				'website_signup'
			];
			let leadEmail = Math.round(Math.random()) ? '&em=loadtesting%40fuelx.com' : '' ;
			queryURI = `&y=qs&ev=lead&lid=${parseInt(Math.random() * 1000000000 + 100000)}&lt=${businessArray[Math.floor(Math.random() * 3)]}${leadEmail}`;
			break;
		case 'addtocart':
			queryURI = `&y=qs&ev=add_to_cart&pid=${Math.ceil(Math.random() * 100000000)}&va=${(Math.random() * 100).toFixed(2)}&qt=${parseInt((Math.random() * 10)) + 1}`;
			break;
		case 'search':
			queryURI = '&y=qs&ev=search&kw=fuelx;load;testing;new;pixel';
			break;
		case 'buttonclick':
			let buttonArray = [
				'&y=qs&ev=button_click&bn=homepage%20signup',
				'&y=qs&ev=button_click&bn=marketing%20page%20signup',
				'&y=qs&ev=button_click&bn=registration'
			];
			queryURI = buttonArray[Math.floor(Math.random() * 3)];
			break;
	}

	return	queryURI;
}

loop();


//first 8 characters for pixelID and use the same for the bid


