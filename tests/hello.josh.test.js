import sayHello from '../helloworld.js';
import assert from 'assert';

it("Test Hello Worlld", ()=> {
    const hello = sayHello();

    assert.equal(hello, "Hello Josh");

})