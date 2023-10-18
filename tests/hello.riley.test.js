import sayHello  from "../utils/hello.riley.js";
import assert from 'assert';

it("Hello Riley", ()=>{
    const helloString=sayHello();
    console.log(helloString);

    expect(helloString).toBe("Hello Riley")
})