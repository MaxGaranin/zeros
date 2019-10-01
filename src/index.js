module.exports = function zeros(expression) {
  let resultTwoCount = 0;
  let resultFiveCount = 0;

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
    if (currentNumber.length == 0 || currentOp.length == 0) {
      throw new SyntaxError('Wrong expression');
    }

    let n = parseInt(currentNumber);
    let twoCount = 0;
    let fiveCount = 0;

    if (currentOp == '!') {
      if (isEven(n)) {
        let res = getTwosCountFromEvenFact(n);
        twoCount = res.twoCount;
        fiveCount = res.fiveCount;

        fiveCount += getFivesCountFromOddFact(n - 1);
      }
      else {
        fiveCount = getFivesCountFromOddFact(n);

        let res = getTwosCountFromEvenFact(n - 1);
        twoCount = res.twoCount;
        fiveCount += res.fiveCount;
      }
    }
    else if (currentOp == "!!") {
      if (isEven(n)) {
        let res = getTwosCountFromEvenFact(n);
        twoCount = res.twoCount;
        fiveCount = res.fiveCount;
      }
      else {
        fiveCount = getFivesCountFromOddFact(n);
      }
    }

    resultTwoCount += twoCount;
    resultFiveCount += fiveCount;
  }

  let resultCount = Math.min(resultTwoCount, resultFiveCount);
  return resultCount;
}

function getTwosCountFromEvenFact(n) {
  let twoCount = 0;
  let fiveCount = 0;
  
  for (let i = 2; i <= n; i += 2) {
    twoCount += getCount(i, 2);
    fiveCount += getCount(i, 5);
  }

  return {
    twoCount: twoCount,
    fiveCount: fiveCount
  };
}

function getFivesCountFromOddFact(n) {
  let count = 0;
  for (let i = 3; i <= n; i += 2) {
    count += getCount(i, 5);
  }

  return count;
}

function getCount(n, base) {
  let count = 0;
  while (n % base == 0) {
    count++;
    n = n / base;
  }
  return count;
}

function isEven(n) {
  return n % 2 == 0;
}
