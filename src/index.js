module.exports = function zeros(expression) {
  let result = 1;

  let currentNumber = '';
  let currentOp = '';

  for (const ch of expression) {
    if (ch == '!') {
      currentOp += ch;
      
      if (currentOp.length > 2) {
        throw new SyntaxError('More than two "!" in expression');
      }
    }
    else if (ch == '*') {
      intermediateCalc();

      currentNumber = '';
      currentOp = '';
    }
    else {
      currentNumber += ch;
    }
  }

  intermediateCalc();

  function intermediateCalc() {
    if (currentNumber.length == 0) {
      throw new SyntaxError('Wrong expression');
    }

    let n = parseInt(currentNumber);
    let fact = 1;
    if (currentOp == '') {
      fact = n;
    }
    else if (currentOp == '!') {
      fact = normalFact(n);
    }
    else if (currentOp == "!!") {
      if (isEven(n)) {
        fact = evenFact(n);
      }
      else {
        fact = oddFact(n);
      }
    }
    result *= fact;
  }

  let count = findZeros(result);
  return count;
}

function normalFact(n) {
  if (n == 0 || n == 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

function evenFact(n) {
  if (!isEven(n)) throw new SyntaxError("The number must be even.");
  if (n == 0 || n == 2) return 2;

  let result = 2;
  for (let i = 4; i <= n; i += 2) {
    result *= i;
  }

  return result;
}

function oddFact(n) {
  if (isEven(n)) throw new SyntaxError("The number must be odd.");
  if (n == 0 || n == 1) return 1;

  let result = 1;
  for (let i = 3; i <= n; i += 2) {
    result *= i;
  }

  return result;
}

function isEven(n) {
  return n % 2 == 0;
}

function findZeros(n) {
  let s = n + '';

  let count = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] != '0') break;
    count++;
  }

  return count;
}