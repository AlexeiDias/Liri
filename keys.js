var colors = require('colors');
 var lines = process.stdout.getWindowSize()[1];
        for(var i = 0; i < lines; i++) {
        console.log('\r\n');
        
        }
console.log(colors.green('\nHello, welcome to\n'));
console.log(colors.yellow.bold("Liri!\n"));
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };
  