import { sayHello, userName } from "../utils/helloworld.cigi" ;
import assert from "assert" ;

// Manual testing
it("Should say Hello", ()=>{
    const hello = sayHello();
    console.log(hello);
    assert.equal(hello, "Hello");

});

// Automated Unit Tests
it( "Should say Cigi", () => {
    const name = userName();
    console.log(name);
    expect(name).toBe("Cigi");
} );