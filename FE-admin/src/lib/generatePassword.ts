const LOW_CHAR_CODES = arrayFromLowToHigh(97, 122);
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
// const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
//   .concat(arrayFromLowToHigh(58, 64))
//   .concat(arrayFromLowToHigh(91, 96))
//   .concat(arrayFromLowToHigh(123, 126));
const SYMBOL_CHAR_CODES = [64, 36, 33, 37, 42, 35, 63, 38];

export default function generatePassword(characterMinimumAmount: number) {
  const passwordCharacters: string[] = [];
  for (let i = 0; i < characterMinimumAmount; i++) {
    const lowerCaseCharacter = LOW_CHAR_CODES[Math.floor(Math.random() * LOW_CHAR_CODES.length)];
    const upperCaseCharacter =
      UPPERCASE_CHAR_CODES[Math.floor(Math.random() * UPPERCASE_CHAR_CODES.length)];
    const numberCharacter = NUMBER_CHAR_CODES[Math.floor(Math.random() * NUMBER_CHAR_CODES.length)];
    const symbolCharacter = SYMBOL_CHAR_CODES[Math.floor(Math.random() * SYMBOL_CHAR_CODES.length)];
    if (passwordCharacters.length < characterMinimumAmount)
      passwordCharacters.push(String.fromCharCode(lowerCaseCharacter));
    if (passwordCharacters.length < characterMinimumAmount)
      passwordCharacters.push(String.fromCharCode(upperCaseCharacter));
    if (passwordCharacters.length < characterMinimumAmount)
      passwordCharacters.push(String.fromCharCode(numberCharacter));
    if (passwordCharacters.length < characterMinimumAmount)
      passwordCharacters.push(String.fromCharCode(symbolCharacter));
  }

  return passwordCharacters
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .join("");
}

function arrayFromLowToHigh(low: number, high: number) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
