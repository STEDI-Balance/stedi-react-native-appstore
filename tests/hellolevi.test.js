import hello from "../utils/hellolevi.js"

it ("Should say Hello Levi", ()=>{
    const helloString = hello();
    expect(helloString).toBe("Hello Levi");
})