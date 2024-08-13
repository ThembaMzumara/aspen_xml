const 
    fs = require('fs'),
    xml2js = require('xml-js'),
    keys = jsonObj => {

        let keys = [];
        const traverse = obj => {
            keys.push(...Object.keys(obj))

            for(let key in obj){
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        traverse(obj[key]); 
                    }
                }
            }
        }
        
        traverse(jsonObj)
        return keys
    },
    flatten = (jsonObj, result ={}) => {
        for (let key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                if (typeof jsonObj[key] === 'object' && jsonObj[key] !== null && !Array.isArray(jsonObj[key])) {
                    flatten(jsonObj[key], result);
                } else {
                    result[key] = jsonObj[key];
                }
            }
        }
        return result;
    },
    extractTables = jsonObj => {
        let tables = [];
    
        function traverse(obj) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (key === 'table') {
                        tables.push({ [key]: obj[key] });
                    }
    
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        traverse(obj[key]);
                    }
                }
            }
        }
    
        traverse(jsonObj);
        return tables;
    };

try {
    const
    // jsonData = xml2js.xml2json( fs.readFileSync('HealthDataSample.xml', 'utf-8'), {compact: true, spaces: 4}),
    jsonData = xml2js.xml2json( fs.readFileSync('./xmlBits/ComponentD.xml', 'utf-8'), {compact: true, spaces: 4}),
    tableData = extractTables(JSON.parse( fs.readFileSync('OutputJsonData.json', 'utf-8') ));

    fs.writeFileSync('OutputJsonData.json', jsonData, 'utf-8');
    fs.writeFileSync('OutputTableData.js', JSON.stringify(tableData, null, 2));
    
    // console.log(keys(JSON.parse( fs.readFileSync('OutputJsonData.json', 'utf-8') )))       
    // console.log(flatten(JSON.parse( fs.readFileSync('OutputJsonData.json', 'utf-8') )))       
} catch (error) { 
    console.log(error)
}

console.log('Done')   