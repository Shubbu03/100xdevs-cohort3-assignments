// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

let ctr = 1;
function counter() {
  console.log(`Counter is: ${ctr}`);
  ctr++;
  setTimeout(counter, 1000);
}

setTimeout(counter, 1000);
