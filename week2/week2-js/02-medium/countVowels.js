/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  if (!str.length) return 0;
  let counter = 0;
  let splitedStr = str.split("").sort();
  for (let i = 0; i <= splitedStr.length; i++) {
    if (
      splitedStr[i] == "A" ||
      splitedStr[i] == "E" ||
      splitedStr[i] == "I" ||
      splitedStr[i] == "O" ||
      splitedStr[i] == "U" ||
      splitedStr[i] == "a" ||
      splitedStr[i] == "e" ||
      splitedStr[i] == "i" ||
      splitedStr[i] == "o" ||
      splitedStr[i] == "u"
    ) {
      counter++;
    }
  }
  return counter;
}

module.exports = countVowels;
