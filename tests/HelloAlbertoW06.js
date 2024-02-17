import printHello from "./utils/helloworld.mjs";
import myName from "./utils/myname.mjs";


const sayHello = (userName) => {
    return (printHello() + " " + userName());
}

console.log(sayHello(myName));