const intoKorean = (string: String) => {
   let newString = '';
   const month = string.substring(0, 3)
   if (month === 'Jan')
      newString += '1월 ';
   else if (month === 'Feb')
      newString += '2월 ';
   else if (month === 'Mar')
      newString += '3월 ';
   else if (month === 'Apr')
      newString += '4월 ';
   else if (month === 'May')
      newString += '5월 ';
   else if (month === 'Jun')
      newString += '6월 ';
   else if (month === 'Jul')
      newString += '7월 ';
   else if (month === 'Aug')
      newString += '8월 ';
   else if (month === 'Sep')
      newString += '9월 ';
   else if (month === 'Oct')
      newString += '10월 ';
   else if (month === 'Nov')
      newString += '11월 ';
   else if (month === 'Dec')
      newString += '12월 ';

      newString += string.substring(4,5) === '0' ? string.substring(5,6) : string.substring(4,6)

      return newString + '일'
}

module.exports = intoKorean