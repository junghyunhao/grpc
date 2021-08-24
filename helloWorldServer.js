let PROTO_PATH = __dirname + "/helloworld.proto";

let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");

// 아래 두번째 parameter에 option을 넣어줄 수 있음
let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
let proto = grpc.loadPackageDefinition(packageDefinition).planzHelloWorld;

// chat test
let grpcChat = protoDescriptor.io.mark.grpc.grpcChat;
let clients = new Map();

let chatServer = new grpc.Server();
chatServer.addService(grpcChat.ChatService.service, {
  chat: chat,
});
chatServer.bind("0.0.0.0:50050", grpc.ServerCredentials.createInsecure());
chatServer.start();

function chat(call) {
  call.on('data', function(chatRequest){
      user=call.metadata.get('username');
      msg=chatRequest.message;

      for (let [msgUser, userCall] of clients) {
        if (msgUser != username) {
            userCall.write(
               {
                 fromName: username,
                 message : msg
               });
           }
    }
    if (clients.get(user) === undefined) {
    clients.set(user, call);
    }

    call.on('end', function() {
      call.write({
          fromName: 'Chat server',
          message : 'Nice to see ya! Come back again...'
      });
      call.end();
  });

  chat();
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

startServer()