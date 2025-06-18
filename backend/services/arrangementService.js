const advantageMap = {
  Militia: ["Spearmen", "LightCavalry"],
  Spearmen: ["LightCavalry", "HeavyCavalry"],
  LightCavalry: ["FootArcher", "CavalryArcher"],
  HeavyCavalry: ["Militia", "FootArcher", "LightCavalry"],
  CavalryArcher: ["Spearmen", "HeavyCavalry"],
  FootArcher: ["Militia", "CavalryArcher"]
};

function canWin(own, opp) {
  // console.log('CanWin', own)
  // console.log('canwin oppp', opp)
  const multiplier = advantageMap[own.class]?.includes(opp.class) ? 2 : 1;
// console.log('multiplier :12', multiplier);
  const effectiveCount = opp.count * multiplier;
// console.log('effectiveCount :13', effectiveCount);
  if (own.count > effectiveCount) {
    console.log('win')
    return 1};
  if (own.count === effectiveCount) {
    console.log('lose')
    return 0};
  return -1;
}

function getPermutations(arr) {
  if (arr.length <= 1) return [arr];
  const permutations = [];
  arr.forEach((item, index) => {
    const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];
    getPermutations(remaining).forEach((perm) => {
      permutations.push([item, ...perm]);
    });
  });
  return permutations;
}

function getWinningArrangement(ownPlatoons, oppPlatoons) {
  const permutations = getPermutations(ownPlatoons);
// console.log('permutations :37', permutations);
  
  for (const perm of permutations) {
    let wins = 0;
    for (let i = 0; i < 5; i++) {
      const result = canWin(perm[i], oppPlatoons[i]);
// console.log('result :44', result);
      if (result === 1) wins++;
    }
    if (wins >= 3) return perm;
  }
  return null;
}

module.exports = { getWinningArrangement };
