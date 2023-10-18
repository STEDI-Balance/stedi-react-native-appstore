import hello from "../utils/hello.ara"
import assert  from "assert";

it("Teste Ara's Hello program",()=>{

    const helloString = hello();

    assert.equal(helloString,"Arã");

});