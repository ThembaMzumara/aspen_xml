const 
    fs = require('fs'),
    xml2js = require('xml-js'),
    xmlData = fs.readFileSync('HealthDataSample.xml', 'utf-8'),
    jsonData = xml2js.xml2json(xmlData, {compact: true, spaces: 4});

    try {
        fs.writeFileSync('OutputJsonData.json', jsonData, 'utf-8')
    } catch (error) { 
        console.log(error)
    }
  
    console.log('Done')   