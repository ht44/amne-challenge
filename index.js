const fs = require('fs');

if (require.main === module) {
  let inputPath = process.argv[2] || './mock/input.txt',
      outputPath = process.argv[3];

  if (outputPath) {
    findTrends(inputPath, outputPath);
  } else {
    findTrends(inputPath);
  }
}

function findTrends(inputPath, outputPath) {

  let result = [],
      contents = fs.readFileSync(inputPath, 'utf8').split('\n'),
      averages = contents[1].split(' ').map(Number),
      [days, wind] = contents[0].split(' '),
      increasing = 0,
      decreasing = 0;

  contents = null;

  for (let i = 0, j = wind - 1; j < days; i++, j++) {

    for (let l = i; l < j; l++) {

      let k = l + 1;

      if (averages[k] > averages[k - 1]) {
        while (averages[k] > averages[k - 1] && k <= j) {
          increasing++;
          k++
        }
      } else if (averages[k] < averages[k - 1]) {
        while (averages[k] < averages[k - 1] && k <= j) {
          decreasing++;
          k++;
        }
      }

    }

    result.push(increasing - decreasing);
    increasing = 0;
    decreasing = 0;
    
  }

  if (outputPath) {
    fs.writeFileSync(outputPath, result.join('\n'));
  } else {
    result.forEach(value => {
      console.log(value);
    });
  }

  // for testing
  return result;

}

module.exports = findTrends;
