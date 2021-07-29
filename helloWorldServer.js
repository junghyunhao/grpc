let PROTO_PATH = __dirname + "/helloworld.proto";

let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");

// 아래 두번째 parameter에 option을 넣어줄 수 있음
let packageDefinition = protoLoader.loadSync(PROTO_PATH);
let proto = grpc.loadPackageDefinition(packageDefinition).planzHelloWorld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, { message: "Hello " + call.request.name });
}

function sayHelloAgain(call, callback) {
  callback(null, { message: "Hello Again " + call.request.name });
}

function bye(call, callback) {
  callback(null, { message: "Bye " + call.request.name });
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function startServer() {
  const bindAdress = "0.0.0.0:50051";

  let server = new grpc.Server();
  server.addService(proto.Greeter.service, {
    sayHello,
    sayHelloAgain,
    bye,
  });
  server.bindAsync(
    //grpc의 given port
    bindAdress,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

startServer();
