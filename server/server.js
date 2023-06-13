let express = require('express');
let http = require('http');
let cors = require('cors');
let app = express();
let xml2js = require('xml2js');
const routes = require('./Routes/routes');
let xmlparser = require('express-xml-bodyparser');


app.use(express.json());
app.use(xmlparser());
app.use(cors());

app.use('/api', cors(), routes);
app.get('/test',(req,res)=>{res.json({"status":"api_Visionaria_Dream"})});

app.post('/EXECUTEOPERATORPROVISIONINGPRODUCT',async (req,res)=>{
    let xml_body,result,operatorUserID,providerUserID,min,max;
    try{
    xml_body = req.rawBody.replace(/soapenv:/g,"");
    xml_body = xml_body.replace(/xmlns:/g,"");
    xml_body = xml_body.replace(/ns1:/g,"");
    result = await xml2js.parseStringPromise(xml_body);

    min = 1000; // Rango mínimo de 4 dígitos
    max = 9999; // Rango máximo de 4 dígitos
  
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    operatorUserID = result.Envelope.Body[0].executeOperatorProvisioningProduct[0].operatorUser[0].operatorUserID[0];
    providerUserID =  result.Envelope.Body[0].executeOperatorProvisioningProduct[0].operatorUser[0].operatorUserID[0]+`${numeroAleatorio}`;
}catch{
    providerUserID=0
    operatorUserID=0
}
    let string_xml =  `<?xml version="1.0" encoding="UTF-8"?>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="urn:server" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
       <SOAP-ENV:Body>
          <ns1:executeOperatorProvisioningProductResponse xmlns:ns1="http://www.csapi.org/schema/parlayx/postactivationsb/v1_0/local">
             <result xsi:type="tns:Result">
                <responseCode xsi:type="xsd:short">0</responseCode>
                <responseMessage xsi:type="xsd:string">success</responseMessage>
             </result>
             <nbTransID xsi:type="xsd:string">2016061506084155271</nbTransID>
             <operatorUserID xsi:type="xsd:string">${operatorUserID}</operatorUserID>
             <childUserID xsi:nil="true" xsi:type="xsd:string" />
             <providerUserID xsi:type="xsd:string">${providerUserID}</providerUserID>
             <extensionInfo xsi:nil="true" xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="tns:NamedParameter[0]" />
          </ns1:executeOperatorProvisioningProductResponse>
       </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`;

      res.header('Content-Type','text/xml');
      res.send(string_xml)
});
app.post('/EXECUTECANCELLATION',async (req,res)=>{
    let xml_body,result,operatorUserID,providerUserID,min,max;
    try{
    xml_body = req.rawBody.replace(/soapenv:/g,"");
    xml_body = xml_body.replace(/xmlns:/g,"");
    xml_body = xml_body.replace(/ns1:/g,"");
    result = await xml2js.parseStringPromise(xml_body);

    min = 1000; // Rango mínimo de 4 dígitos
    max = 9999; // Rango máximo de 4 dígitos
    // console.log(result.Envelope.Body[0].executeCancellation[0].providerUserID)
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    // operatorUserID = result.Envelope.Body[0].executeOperatorProvisioningProduct[0].operatorUser[0].operatorUserID[0];
    providerUserID =  result.Envelope.Body[0].executeCancellation[0].providerUserID+`${numeroAleatorio}`;
}catch(e){
    console.log(e)
    providerUserID=0
}
    let string_xml =  `<?xml version="1.0" encoding="UTF-8"?>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="urn:server" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
       <SOAP-ENV:Body>
          <ns1:executeCancellationResponse xmlns:ns1="http://www.csapi.org/schema/parlayx/postactivationsb/v1_0/local">
             <result xsi:type="tns:Result">
                <responseCode xsi:type="xsd:short">0</responseCode>
                <responseMessage xsi:type="xsd:string">success</responseMessage>
             </result>
             <providerUserID xsi:type="xsd:string">${providerUserID}</providerUserID>
             <extensionInfo xsi:nil="true" xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="tns:NamedParameter[0]" />
          </ns1:executeCancellationResponse>
       </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`;

      res.header('Content-Type','text/xml');
      res.send(string_xml)
});


let httpServ = http.createServer(app);
httpServ.listen(5050,()=>console.log('servidor en puerto: 5050'));

module.exports = app;

