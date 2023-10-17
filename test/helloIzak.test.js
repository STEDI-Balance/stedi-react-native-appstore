import sayHello from "../utils/helloIzak.mjs";
import assert from "assert";

it ("Tests Hello Izak", () => {
    const hello = sayHello();
    assert.equal(hello, "Izak");
});
 