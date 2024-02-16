import SayHello from "../utils/helloworld.mjs";
import { expect } from 'chai';

it("Should say hello", ()=>{
    const hello = SayHello();

    expect(hello).to.equals("hello");
});