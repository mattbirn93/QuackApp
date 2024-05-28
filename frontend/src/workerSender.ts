// // Create new worker instance
import { wrap } from "comlink";

export const workerInstance = wrap(new Worker("./worker", { type: "module" }));
new URL("./sw/worker", import.meta.url);

// Function to run
export function utilFunc1() {
  console.log("HELLO FROM THE UTIL FUNCTION");
}
