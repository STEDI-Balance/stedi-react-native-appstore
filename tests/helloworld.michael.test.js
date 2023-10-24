//Michael Anderson
//Brother Jensen
//CIT 262
//16 October 2023
//Hello World Program

import { sayHello, sayName } from "../utils/helloworld.michael.js" ;
import assert from "assert" ;

// Manual testing.
it( "Testing sendHello function", () => {
    const hello = sayHello();
    assert.equal( hello, "hello" );
} );

// Automated Unit Tests.
it( "Should say Michael", () => {
    const myName = sayName();
    console.log( myName );

    expect( myName ).toBe( "Michael" );
} );