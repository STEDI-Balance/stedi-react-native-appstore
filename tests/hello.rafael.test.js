import hello from "../utils/hello.rafael.js";

it("Should say hello rafael",()=>{
    const helloString=hello();
    console.log(helloString);

    expect(helloString).toBe("hello rafael");
})