const fetch = require('node-fetch');
const prompt = require('prompt-sync')();

const getPostcode = async () => {
    const input = prompt('Please enter a postcode: ');
    const url = `https://api.postcodes.io/postcodes/${input}`;
    try{
        const response = await fetch (url);
        if (response.ok){
            const jsonResponse = await response.json();
            const result = {
            longitude: jsonResponse.result.longitude,
            latitude: jsonResponse.result.latitude
            };
           //console.log(result); 
           return result;
        }
        throw new Error ('Request failed!')
    }
    catch (error) {(console.log(error))
    }
}

module.exports = {getPostcode}
getPostcode();