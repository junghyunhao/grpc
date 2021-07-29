let PROTO_PATH = __dirname + "/helloworld.proto";

let parseArgs = require("minimist");
let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");
let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
let hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  let argv = parseArgs(process.argv.slice(2), {
    string: "target",
  });
  let target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = "localhost:50051";
  }
  let client = new hello_proto.Greeter(
    target,
    grpc.credentials.createInsecure()
  );
  let user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = "world";
  }
  client.sayHello({ name: user }, function (err, response) {
    console.log("Greeting:", response.message);
  });
  client.sayHelloAgain({ name: user }, function (err, response) {
    console.log("Greeting:", response.message);
  });
}

main();
