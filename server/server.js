let express = require('express');
let http = require('http');
let cors = require('cors');
let app = express();
const routes = require('./Routes/routes');


app.use(express.json());
app.use(cors());

app.use('/api/VD', cors(), routes);
app.get('/test',(req,res)=>{res.json({"status":"api_Visionaria_Dream"})})



let httpServ = http.createServer(app);
httpServ.listen(5052,()=>console.log('servidor en puerto: 5052'));

module.exports = app;