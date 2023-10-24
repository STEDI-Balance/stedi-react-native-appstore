import { sendName, sendHello } from "../utils/helloworld.john";
import assert from 'assert';

// Manual Test
it( "Test sendHello", () => {
    const hello = sendHello();
    assert.equal(hello,"hello");
} );

// Automated Test
it( "Test sendName", () => {
    const myName = sendName();
    console.log(myName);

    expect(myName).toBe( "John" );
} );