const { getWinningArrangement } = require("../services/arrangementService");

exports.getBattleResult = (req, res) => {
  const { own, opponent } = req.body;
  const result = getWinningArrangement(own, opponent);
  if (!result) {
    return res.status(200).json({ message: "There is no chance of winning" });
  }
  return res.status(200).json({ arrangement: result });
};
