const express = require('express');
const fetch = require("node-fetch");
const keys = require('./config/keys');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello Weather!!');
})

let fetchData = async url => {
	try {
		const res = await fetch(url);
		const json = await res.json();
		return json;
	} catch(error) {
		console.log(error);
	}
}

app.get('/:data', async (req,res) => {
	let data = req.params.data;
	dataList = data.split(',');
	let myRes = []
	let temp = await dataList.map(async (item) => {
		itemRes = await fetchData(`${keys.openWeatherURL}=${item}&appid=${keys.openWeatherKey}`);
		myRes.push(itemRes);
	});
	
	await Promise.all(temp)
	res.send(myRes);
})


const PORT = process.env.PORT || 2021;

app.listen(PORT, () => {
	console.log('Server started on :', PORT)
});