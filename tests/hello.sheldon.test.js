import hello from "../utils/hello.sheldon.js";

it("Should say hello sheldon",()=>{
    const helloString=hello();
    console.log(helloString);

    expect(helloString).toBe("hello sheldon");
})