export default {
  reArr(el){
     var newArr = [];
     for(var i = 0; i < el.length; i++){
             if(newArr.indexOf(el[i])== -1){
                  newArr.push(el[i]);
              }
         }
     return newArr;
   },
  wangqiantui30tian(el){
      let date=new Date(el)
     date.setDate(date.getDate()-30)
     let year=date.getFullYear()
     let mongth=date.getMonth()+1
        if (mongth<10){
          mongth='0'+(date.getMonth()+1)
        }
    let datarr=date.getDate()
    if (datarr<10){
      datarr='0'+(date.getMonth()+1)
    }
    let riqi=year+"-"+mongth+"-"+datarr+"--"+el
    return  riqi
  },
  toPercebt(num){//小数变为百分比
    let str = Number(num*100).toFixed();
    // str += '%';
    return str;
  },
  strChuli:function(str,leng,beg,end,type){
    /*
    str 要处理的字符串
    beg 起始位置
    end 接数位置
    leng 保留字符串长度
    type 转换成什么--默认*
    */

    if(str=="" || str==null || str==undefined){
      return "-";
    }else if(leng && str.length<=leng){
      return str;
    }else{
      let stype = type?type:"**";
      let sbeg = str.length>=(leng+beg)?beg:str.length-leng;
      let send = str.length>=(leng+beg+end)?end:str.length-leng-sbeg;
      // if(beg && end && str.length>=(leng+beg)){
      //
      // }
      let nStr = '';
      if(sbeg>0 && send>=0){
        nStr = stype+str.substring(sbeg,sbeg+leng)+stype;
      }else if(sbeg<=0 && send>=0){
        nStr = str.substring(sbeg,sbeg+leng)+stype;
      }else if(send<=0){
        nStr = stype+str.substring(sbeg,sbeg+leng);
      }else{
        nStr = str;
      }
      return nStr;
    }
  },
  convert:function(num,fix){
    let numB
    let convertnum;
    if(num != '' && num != null && num != "null" && num != undefined && num != "undefined"&& num !="NaN"&& num !=NaN){
      numB=Number(num);
      if(numB == 0){
        return 0;
      }else{
        if(numB >= 100000000 || numB <= -100000000){
          convertnum=(Math.round(numB/1000000)/100)+"亿";
        }else if(numB >= 10000 || numB <= -10000){
          convertnum=(Math.round(numB/100)/100)+"万";
        }else{
          if(fix==0){
            convertnum=numB.toFixed(0);
          }else if(fix){
            convertnum=numB.toFixed(fix);
          }else{
            convertnum=numB.toFixed(2);
          }
        }
      }
    }else{
      return "-";
    }
    return convertnum;
  },
  convertNoDecimal:function(num,fix){
    let numB
    let convertnum;
    if(num != '' && num != null && num != "null" && num != undefined && num != "undefined"&& num !="NaN"&& num !=NaN){
      numB=Number(num);
      if(numB == 0){
        return 0;
      }else{
        if(fix==0){
          convertnum=numB.toFixed(0);
        }else if(fix){
          convertnum=numB.toFixed(fix);
        }else{
          let numArr = (numB.toFixed(2)).split('.');
          if(numArr[1] == '00'){
            convertnum = numArr[0]
          }else{
            convertnum=numB.toFixed(2);
          }
        }
      }
    }else{
      return "-";
    }
    return convertnum;
  },
  convertUnit:function(num,fix){
    let numB;
    let convertnum, unit;
    if(num != '' && num != null && num != "null" && num != undefined && num != "undefined"&& num !="NaN"&& num !=NaN){
      numB=Number(num);
      if(numB == 0){
        return 0;
      }else{
        if(numB >= 100000000 || numB <= -100000000){
          convertnum=(Math.round(numB/1000000)/100);
          unit = '亿';
        }else if(numB >= 10000 || numB <= -10000){
          convertnum=(Math.round(numB/100)/100);
          unit = '万';
        }else{
          if(fix==0){
            convertnum=numB.toFixed(0);
          }else if(fix){
            convertnum=numB.toFixed(fix);
          }else{
            let numArr = (numB.toFixed(2)).split('.');
            if(numArr[1] == '00'){
              convertnum = numArr[0]
            }else{
              convertnum=numB.toFixed(2);
            }
          }
        }
      }
    }else{
      return "-";
    }
    return convertnum
  },
  quzheng:function(num,fix){
    let numB
    let convertnum;
    if(num != '' && num != null && num != "null" && num != undefined && num != "undefined"){
      numB=Number(num);
      if(numB == 0){
        return 0;
      }else{
        if(numB >= 100000000 || numB <= -100000000){
          convertnum=(numB/1000000/100).toFixed(0)+"亿";
        }else if(numB >= 10000 || numB <= -10000){
          convertnum=(numB/100/100).toFixed(0)+"万";
        }else{
          if(fix==0){
            convertnum=numB.toFixed(0);
          }else if(fix){
            convertnum=numB.toFixed(fix);
          }else{
            convertnum=numB.toFixed(2);
          }
        }
      }
    }else{
      return "-";
    }
    return convertnum;
  },
  convertPPP:function(num,fix){
    let convertnum;
    if(num != '' && num != null && num != "null" && num != undefined && num != "undefined"){
      num=Number(num);
      if(num == 0){
        return 0;
      }else{
        if(num >= 100000000 || num <= -100000000){
          convertnum=(Math.round(num/1000000)/100)+"亿";
        }else if(num >= 10000 || num <= -10000){
          convertnum=(Math.round(num/100)/100)+"万";
        }else{
          if(fix==0){
            convertnum=num;
          }else if(fix){
            convertnum=num.toFixed(fix);
          }else{
            convertnum=num.toFixed(2);
          }
        }
      }
    }else{
      return "-";
    }
    return convertnum;
  },
  getUnit: function (data1) {
    var data = Number(data1 === undefined || data1 == null || data1 === 'null' || data1 === 'NULL' ? 0 : data1);
    var unit = '';
    if (data > 100000000 || data < -100000000) {
      unit = '亿';
    } else if (data > 10000 || data < -10000) {
      unit = '万';
    }
    return unit;
  },
  getVal2: function (data1) {

    var data = Number(data1 === undefined || data1 == null || data1 === 'null' || data1 === 'NULL' ? 0 : data1);
    var variable;

    if (data > 100000000 || data < -100000000) {
      variable = (data / 100000000).toFixed(2);
    } else if (data > 10000 || data < -10000) {
      variable = (data / 10000).toFixed(2);
    } else {
      variable = data.toFixed(2);
    }
    if ((variable + '').indexOf('.') > 0) {
      if ((variable + '').substr((variable + '').indexOf('.') + 1, 2) === '00') {
        variable = (variable + '').substr(0, (variable + '').indexOf('.'));
      }
    }

    return variable;
  },
  getcollectionList: function (data) {
    var list = [];
    list.push({'id': 0, 'kpi_id': data.kpi_id, 'year_value': data.year_value, 'year_plan': data.year_plan, 'unit': data.unit, 'timeType': '年', 'imgType': '完成比', 'pieId': 'echarts_pie1'});
    list.push({'id': 1, 'kpi_id': data.kpi_id, 'year_value': data.year_value, 'year_plan': data.year_plan, 'unit': data.unit, 'timeType': '年', 'imgType': '环比', 'pieId': 'echarts_pie2'});
    return list;
  },
  getMonPre (data) {
    var date2 = data.substr(4, 2);
    var date3 = data.substr(6, 2);
    if (num(date2) >= 2 && num(date3) > 9) {
      date2 = num(date2) - 1;
    } else if (num(date2) >= 3 && num(date3) < 10) {
      date2 = num(date2) - 2;
    }
    if (date2 < 10) {
      date2 = '0' + date2;
    }
    return data.substr(0, 4) + date2;
  },
  getFontSize:function(){
    return (40 * (document.documentElement.clientWidth / 750) );
  },
  setFonSize: function(){
    document.documentElement.style.fontSize =  (40 * (document.documentElement.clientWidth / 750) ) + 'px';
  },
  LenStr(str)
  {
    str = str + 'a';
    var str1 = str.match(/[\x00-\xff]/g).length;
    return ((str.length-str1)*2+str1-1);
  },
  getCouDate(){
    var zqidS
    var now = new Date();
    now.setDate(now.getDate()-1)
    // alert(now)
    var year = now.getFullYear();       //年
    var month = now.getMonth()+1     //月
    var day = now.getDate()            //日
    var clock = year
    if(month < 10)
        clock += "0";
    clock += month + "";
    return {year:year,clock:clock};
  },

  converts:function(num,fix){
    let numB
    let convertnum;
    if(num != '' && num != null && num != "null" && num != undefined && num != "undefined"){
      numB=Number(num);
      if(numB == 0){
        return 0;
      }else{
        if(numB >= 100000000 || numB <= -100000000){
          convertnum=(Math.round(numB/1000000)/100)+"亿";
        }else{
          if(fix==0){
            convertnum=numB.toFixed(0);
          }else if(fix){
            convertnum=numB.toFixed(fix);
          }else{
            convertnum=numB.toFixed(2);
          }
        }
      }
    }else{
      return "-";
    }
    return convertnum;
  },
//千位符分割法
  fenge(num) {
    var result = [ ], counter = 0;
    num = (num || 0).toString().split('');
    for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result.unshift(num[i]);
      if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('');
  }



};
