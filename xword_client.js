
var PROTO_PATH = './protos/words.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enum: String,
    defaults: true,
    oneofs: true
  });

var words_proto = grpc.loadPackageDefinition(packageDefinition).words;

function main() {
  var client = new words_proto.Words('localhost:8000', grpc.credentials.createInsecure());
  client.words({word: 'bug', definition: 'lives in code', user: 'phs'}, function(err, response) {
    console.log(response.message);
  });
}

main();
