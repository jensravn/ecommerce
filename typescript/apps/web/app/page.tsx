import ProductOverview from "./product-overview";

export default function Page(): JSX.Element {
  return (
    <main>
      <ProductOverview />
    </main>
  );
}

// ./node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=pb/ ../../../pb/*.proto

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../pb/helloworld";

var PROTO_PATH = __dirname + "/../../../../../../pb/helloworld.proto";
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var hello_proto = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).helloworld;

function main() {
  var target = "localhost:50051";
  var client = new hello_proto.Greeter(
    target,
    grpc.credentials.createInsecure()
  );
  var user;
  user = "world";
  var err;
  var response;
  client.sayHello({ name: user }, function (err: any, response: any) {
    if (err) {
      console.log("Error:", err.message);
    } else {
      console.log("Greeting:", response.message);
    }
  });
  return { err, response };
}

main();
