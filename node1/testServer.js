http_client("172.25.2.2", "", "testament.txt.enc", 3014)


function http_client(IP_server, filepath, filename, port) {

  var fs = require('fs'), request = require('request');

  // if (process.argv[2] == '-h' || process.argv[2] == '--help' || process.argv.length < 4){
  //   console.log("\nSYNTAX HELP")
  //   console.log("\nUsage: node http_client.js IP(server) filename.ext\n")
  //   return
  // }

  var download = function (uri, filename, callback) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      console.log("passou")
  };

  download('http://' + IP_server + ':' + port + '/', './transfer_resources/' + filepath + filename, function () {
    console.log('\nGET operation successfully done\n');
    console.log(filename + " stored")
  });
  request('http://' + IP_server + ':' + port + '/quit')

}
