const fs = require('fs');

if (require.main === module) {
  let inputPath = process.argv[2] || './mock/input.txt',
      outputPath = process.argv[3] || './output/output.txt';
  findTrends(inputPath, outputPath);
}

function findTrends(inputPath, outputPath) {

  let result = [],
      contents = fs.readFileSync(inputPath, 'utf8').split('\n'),
      averages = contents[1],
      [days, wind] = contents[0].split(' ');

  contents = null;

  for (let i = 0, j = wind - 1; j < days; i++, j++) {

    let increasing = 0,
        decreasing = 0;

    for (let k = i; k <= j; k++) {
      if (averages[k + 1] > averages[k]) {
        increasing++;
      } else if (averages[k + 1] < averages[k]) {
        decreasing++;
      }
    }

    if (decreasing === 0) {
      increasing++;
    } else if (increasing === 0) {
      decreasing++;
    }

    result.push(increasing - decreasing);

  }

  fs.writeFileSync(outputPath, result.join('\n'));

  return result;

}

module.exports = findTrends;
