import { utilFunc1 } from "../workerSender";

//RPC = (Remote Procedure Call)
function MyWorker() {
  console.log("HELLO FROM THE WORKER FUNCTION");
  utilFunc1();
}

export default MyWorker;
