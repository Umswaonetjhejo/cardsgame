//Coder: Jonathan Musa Skosana
//Email: umswaonetjhejo@gmail.com
//Cellphone number: +27820726997 / +27681355104

const fs = require('fs');

// Get command line arguments
const args = process.argv.slice(2);
const inputFile = args.find(arg => arg.startsWith('--in=')).substring(5);
const outputFile = args.find(arg => arg.startsWith('--out=')).substring(6);

// Read input file
let input;
try {
  input = fs.readFileSync(inputFile, 'utf8').trim().split('\n');
} catch (err) {
  console.error(`Exception:${err.message}`);
  process.exit(1);
}

// Parse input
const players = input.map(line => {
  const [name, cards] = line.split(':');
  const hand = cards.trim().split(',');
  return { name, hand };
});

// Calculate scores
const scores = players.map(player => {
  const cardValues = player.hand.map(card => {
    const value = parseInt(card.slice(0, -1));
    return isNaN(value) ? (card[0] === 'A' ? 14 : 11) : value;
  });
  cardValues.sort((a, b) => b - a);
  const faceScore = cardValues.slice(0, 3).reduce((sum, val) => sum + val, 0);
  const suitScore = player.hand.map(card => {
    const suit = card.slice(-1);
    return suit === 'C' ? 1 : (suit === 'D' ? 2 : (suit === 'H' ? 3 : 4));
  }).reduce((sum, val) => sum + val, 0);
  return { player: player.name, faceScore, suitScore, totalScore: faceScore + suitScore };
});

// Find winners
scores.sort((a, b) => b.totalScore - a.totalScore);
const winner = scores[0];
const tiedWinners = scores.filter(score => score.totalScore === winner.totalScore);

// Write output
let output;
if (tiedWinners.length === 1) {
  output = `${winner.player}:${winner.totalScore}`;
} else if (tiedWinners.length > 1) {
  const winnerNames = tiedWinners.map(score => score.player).join(',');
  output = `${winnerNames}:${winner.totalScore}`;
} else {
  output = `Exception:No winners found`;
}

// Write output file
try {
  fs.writeFileSync(outputFile, output);
} catch (err) {
  console.error(`Exception:${err.message}`);
  process.exit(1);
}

console.log('Done.');
