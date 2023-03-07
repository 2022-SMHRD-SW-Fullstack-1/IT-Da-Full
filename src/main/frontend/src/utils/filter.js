const dateCompare = (standard, updateDT) => {
  const intervalDay = (new Date() - new Date(updateDT)) / (1000 * 60 * 60 * 24);
  if (standard === "전체") return true;
  else if (standard === "1주일전" && intervalDay < 8) return true;
  else if (standard === "1개월전" && intervalDay < 32) return true;
  else if (standard === "3개월전" && intervalDay < 94) return true;
  else if (standard === "6개월전" && intervalDay < 187) return true;
  else return false;
};

module.exports = dateCompare;
