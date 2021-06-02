// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
const printPassTimes = function(passTimes) {
  for (const items of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(items.risetime);
    const time = items.duration;
    console.log(`Next pass at ${datetime} for ${time} seconds!`);
  }
}
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          console.log("It did not work!", error);
          return;
        }
        nextISSTimesForMyLocation((error,passTimes) => {
          if (error) {
            console.log("It did not work!", error);
            return;
          }
          printPassTimes(passTimes);
        })
      })
      
    });
  }
});
