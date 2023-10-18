import sayHello from '../utils/hello.cody.js';
import assert from 'assert';

it("Hello Cody!", ()=>{
    const helloString=sayHello();
    console.log(helloString);

    expect(helloString).toBe("Hello Cody!")
})