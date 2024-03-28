var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

var PROTO_PATH = __dirname + "/../../../pb/helloworld.proto";
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  var target = "localhost:50051";
  var client = new hello_proto.Greeter(
    target,
    grpc.credentials.createInsecure()
  );
  var user;
  user = "world";
  client.sayHello({ name: user }, function (err, response) {
    if (err) {
      console.log("Error:", err.message);
    } else {
      console.log("Greeting:", response.message);
    }
  });
}

main();
