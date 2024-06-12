import hello from "../utils/hello.js";

Item("Should say hello",()=>{
    const helloString=hello();
    console.log(helloString);

    expect(helloString.toBe("hello"));
})