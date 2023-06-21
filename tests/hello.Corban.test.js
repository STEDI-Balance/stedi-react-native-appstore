import hello from "../utils/hello.corban.js";

it("Should say Hello", ()=>{
    const helloString=hello();
    console.log(helloString);

    expect(helloString).toBe("Hello");
})