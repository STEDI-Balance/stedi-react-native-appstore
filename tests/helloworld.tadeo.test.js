
import { sendHello, sendName } from "../utils/helloworld.tadeo" ;
import assert from "assert" ;

// Manual testing.
it( "Testing sendHello function", () => {
    const hello = sendHello();
    assert.equal( hello, "Hello!" );
} );

// Automated Unit Tests.
it( "Should say Tadeo", () => {
    const myName = sendName();
    console.log( myName );

    expect( myName ).toBe( "Tadeo" );
} );