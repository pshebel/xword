// GRPC
var PROTO_PATH = './protos/words.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

// MONGO
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var words_proto = grpc.loadPackageDefinition(packageDefinition).words;

function words(call, callback) {
  console.log(call)

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var xword = db.db("xword");
    var query = { address: "Park Lane 38" };
    
    dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });

  callback(null, {message: `user: ${call.request.user} word: ${call.request.word} definition: ${call.request.definition}`});
}

function main() {
  var server = new grpc.Server();
  server.addService(words_proto.Words.service, {words: words});
  server.bind('0.0.0.0:8000', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
