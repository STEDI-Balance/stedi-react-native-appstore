import { sayHello, userName } from "../utils/helloworld.cigi" ;
import assert from "assert" ;

// Manual testing
it("Test Hello", ()=>{
    const hello = sayHello();
    console.log(hello);
    assert.equal(hello, "Hello");

});

// Automated Unit Tests
it( "Test Riley", () => {
    const name = userName();
    console.log(name);
    expect(name).toBe("Riley");
} );