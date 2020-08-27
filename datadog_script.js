const express = require('express');
const StatsD = require('hot-shots');
const dogstatsd = new StatsD();
const app = express();
const fs = require('fs');

const port = 8080;


app.use(express.json());



function writeLog(name, data){

	fs.appendFileSync(name, data, err =>{
		if(!err){
			fs.readFile(name, 'utf8',(err, data)=>{
				consolo.log(data);
			});
		}

	});

}

app.post('/datadogv1',(req,res) =>{

	//console.log(req.body);
	//console.log(req.body.stringify(req.body));

	console.log(req.body['status']);
	console.log(req.body['id']);

	if(req.body['status'] == 'processing'){
		
		dogstatsd.increment('woo.order_status.processing');
	}else if(req.body['status'] == 'failed'){
		dogstatsd.increment('woo.order_status.failed');
	}

	writeLog('order_status.log', JSON.stringify(req.body));

	res.status(200).send('OK')

});


app.listen(port, () => {

	console.log('scirpt listening at localhost port 8888...');

});
