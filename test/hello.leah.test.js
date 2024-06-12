import sayHello from '../utils/helloworld.mjs';
import assert from 'assert';

it("Should say Leah",()=>{

    const helloString=hello();
    console.log(helloString);
    
    expect(helloString).toBe("Leah");
    

});