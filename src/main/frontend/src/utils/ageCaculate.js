const ageCaculate = (str) => {
   let today = new Date()
   return today.getFullYear()*1 - str*1 + 1
}

module.exports = ageCaculate