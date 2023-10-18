import hello from "../utils/hello.ryan.js";


it("Should say hello Ryan",() =>{
    const helloString=hello();
    console.log(helloString);
    expect(helloString).toBe("hello Ryan");

});