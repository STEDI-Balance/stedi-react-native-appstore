import sayHello from '../helloworld.js';
import assert from 'assert';

it("Test Hello World", ()=> {
    const hello = sayHello();

    assert.equal(hello, "Hello Cody");

})