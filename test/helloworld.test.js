import sayHello from '../utils/helloworld.mjs';

it("Should say Hello", ()=>{

    const hello = sayHello();
    console.log(hello);

    expect(hello).toBe("Hello");
});