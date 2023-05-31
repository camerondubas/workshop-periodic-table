export default {
  check,
  lookup,
};

var elements;
const symbols = {};

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();

  for (let element of elements) {
    symbols[element.symbol.toLowerCase()] = element;
  }

  return {};
}

function check(charsLeft) {
  if (charsLeft.length == 0) {
    return [];
  }

  // check 2 letter symbols first
  if (charsLeft.length >= 2) {
    const two = charsLeft.slice(0, 2);
    const rest = charsLeft.slice(2);

    if (two in symbols) {
      if (rest !== "") {
        let result = [two, ...check(rest)];
        if (result.join("") == charsLeft) {
          return result;
        }
      } else {
        return [two];
      }
    }
  }

  // check 1 letter symbols
  if (charsLeft.length >= 1) {
    const one = charsLeft.slice(0, 1);
    const rest = charsLeft.slice(1);

    if (one in symbols) {
      if (rest !== "") {
        let result = [one, ...check(rest)];
        if (result.join("") == charsLeft) {
          return result;
        }
      } else {
        return [one];
      }
    }
  }

  return [];
}

function lookup(elementSymbol) {
  return symbols[elementSymbol];
}
