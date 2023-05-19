import hello from '../utils/helloworld.micah.js';
import assert from 'assert';

it ("Should say hello", ()=>{
    const hi = hello();
    // console.log("This is the value of " + hi)
    assert.equal(hi,"hello");

});