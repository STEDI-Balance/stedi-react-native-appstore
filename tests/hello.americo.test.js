import sayHello from "../utils/helloamerico.mjs";
import assert from 'assert';

it("Tests Hello World", ()=>{
    const helloString = sayHello();

    /*
      This unit shows the code for both assignments 
      - Manually test your code;
      - Automatically test your name function.
    */

    // this line is for manual test, using console
    console.log(helloString); // the word "hello" appears on the terminal

    // this line is for automated test, using assert
    assert.equal(helloString,"hello"); // mocha test will return "1 passing"

    // IMPORTANT: to run the test, use the next command in the terminal
    // npm run test-mocha

    /*
      "test-mocha" was defined in the scripts section of package.json
      I used "test-mocha" because "test" was already being used
    */

});