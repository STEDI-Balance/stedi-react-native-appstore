import sayHello from "../utils/helloNate.mjs";
import assert from "assert";

it ("Tests Hello Nate", () => {
    const hello = sayHello();
    assert.equal(hello, "Nate");
});