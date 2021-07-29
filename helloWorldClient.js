let PROTO_PATH = __dirname + "/helloworld.proto";

// let parseArgs = require("minimist");
let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");

// 아래 두번째 parameter에 option을 넣어줄 수 있음
let packageDefinition = protoLoader.loadSync(PROTO_PATH);
let proto = grpc.loadPackageDefinition(packageDefinition).planzHelloWorld;

function main() {
  // argv의 targetPort가 다른경우 아래코드로 사용할 수 있다.
  // let argv = parseArgs(process.argv.slice(2), {
  //   string: "target",
  // });
  // console.log("arg", argv);
  // let target;
  // if (argv.target) {
  //   target = argv.target;
  // } else {
  //   //grpc의 given port
  //   target = "localhost:50051";
  // }

  // if (argv._.length > 0) {
  //   user = argv._[0];
  // } else {
  //   user = "Joanne";
  // }

  // 우선 static하게 넘겨야 하므로 아래와 같이 적용해준다.
  const target = "localhost:50051";
  let user = "joanne";
  // Greeter 를 call하기 위해, Greeter constuctor를 호출하고, 서버주소와 port를 넘겨준다.
  let client = new proto.Greeter(target, grpc.credentials.createInsecure());

  client.sayHello({ name: user }, function (err, response) {
    console.log("Greeting:", response.message);
  });
  client.sayHelloAgain({ name: user }, function (err, response) {
    console.log("Greeting:", response.message);
  });
  client.bye({ name: user }, function (err, response) {
    console.log("bye:", response.message);
  });
}

main();
