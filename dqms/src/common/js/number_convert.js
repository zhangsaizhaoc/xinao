export function convert(number) {
  let convertNumber;
	if(number != '' && number != null && number != "null" && number != undefined && number != "undefined"){
      if(number == 0){
        return 0;
      }else{
        if(number >= 100000000 || number <= -100000000){
          convertNumber=(Math.round(number/1000000)/100)+"亿";
        }else if(number >= 10000 || number <= -10000){
          convertNumber=(Math.round(number/100)/100)+"万";
        }else{
          convertNumber=number.toFixed(2);
        }
      }
    }else{
    return "-";
  }
	return convertNumber;
};


