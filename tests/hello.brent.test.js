import hello from "../utils/hello.brent"

it("Should say hello",()=>{
    const helloString=hello();
    console.log(helloString);

    expect(helloString).toBe("Hello");
});