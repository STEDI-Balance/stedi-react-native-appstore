import sayHello from '../utils/helloeric.mjs';
import assert from 'assert';

it("Tests Hello Eric", ()=>{
    const hello = sayHello();

    assert.equal(hello,"Eric");
});