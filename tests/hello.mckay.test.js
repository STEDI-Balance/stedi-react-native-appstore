import callName from "../utils/hello.mckay";

it("Should say Hello McKay Thomas", () => {
  const helloString = callName("McKay Thomas");
  console.log(helloString);

  expect(helloString).toBe("Hello McKay Thomas");
});
