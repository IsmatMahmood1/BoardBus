const fetch = require('node-fetch');
const prompt = require('prompt-sync')();
const getPostcode = require ('./getPostcode.js');

//const stopType = NaptanPublicBusCoachTram

async function run(closestStops) {
    let id = prompt(console.log("Please enter the stop code"));    

    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${closestStops[0].id}/Arrivals`);
    const body = await response.json();
    const buses = [];
    body.forEach(bus => {
        let coach = {};
        coach["lineID"] = bus.lineId;
        coach["destinationName"] = bus.destinationName;
        coach["timeToStation"] = Math.ceil((bus.timeToStation) / 60);
        //console.log(coach);

        buses.push(coach);
    })
    const sortedBuses = buses.sort(coach = (a,b)=>{return (a['timeToStation']-b['timeToStation'])});

    console.log(sortedBuses.slice(4));

    // const arrivalPrediction = await fetch(`https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`)
    //     .then(response => response.json()) 
    //     .then(body => {
            
    //         //console.log(buses);
    //     })
}

// async function getPostcode(){
//     const postcode = prompt('Please enter your postcode: ');
    
//     const coordinated = await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
//     const body = await coordinated.json();
//     const longitude = body.result.longitude;
//     const latitude = body.result.latitude;
//     const coordinates = [longitude, latitude];
        
//     return coordinates;
// } 

async function getStopPoints(coordinates){
    const stopPoints = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${coordinates[1]}&lon=${coordinates[0]}&stopTypes=NaptanPublicBusCoachTram&radius=500`)
    const body = await stopPoints.json()

    return body;
    //console.log(body);
    
 

}

async function getClosest2Stops(body) {
    stops = [];

    body.stopPoints.forEach(point => {
        let stop = {};
        stop["id"] = point.id;
        stop["distance"] = Math.ceil(point.distance);
        stop["name"] = point.commonName;
        //console.log(coach);

        stops.push(stop);
    });
    const top2Stops = [stops[0], stops[1]];
    return top2Stops;
    
}

async function main() {
    const coordinates =  getPostcode //await getPostcode()
    .catch(err=>(err));
    const stopPoints = await getStopPoints(coordinates);
    const closestStops = await getClosest2Stops(stopPoints);
    console.log (closestStops);
    

    
    
} 


main();
