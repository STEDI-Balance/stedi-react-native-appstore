import userName from "../utils/hello.walter.js";
import assert from "assert";

it("Tests Hello World", ()=>{

    const name = userName();

    assert.equal(name,"Walter");

});