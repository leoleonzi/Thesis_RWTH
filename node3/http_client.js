async function http_client(IP_server, filepath, filename, port) {

  var fs = require('fs'), request = require('request');

  // export NODE_TLS_REJECT_UNAUTHORIZED='0'
  
  // if (process.argv[2] == '-h' || process.argv[2] == '--help' || process.argv.length < 4){
  //   console.log("\nSYNTAX HELP")
  //   console.log("\nUsage: node http_client.js IP(server) filename.ext\n")
  //   return
  // }

  var download = function (uri, filename, callback) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  };

  download('https://' + IP_server + ':' + port + '/', './transfer_resources/' + filepath + filename, function () {
    console.log('\nGET operation successfully done\n');
    console.log(filename + " stored in " + filepath)
  });
  request('https://' + IP_server + ':' + port + '/quit')
  return 200

}

module.exports={http_client}
