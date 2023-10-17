import myName from "../utils/hellobamidele.mjs";
import assert from "assert";

it("My name", ()=> {
    const name = myName();

    assert.equal(name, "Bamidele");
});