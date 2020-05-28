function checkCashRegister(price, cash, cid) {
  var bills = [
  { name: "ONE HUNDRED", val: 100.0 },
  { name: "TWENTY", val: 20.0 },
  { name: "TEN", val: 10.0 },
  { name: "FIVE", val: 5.0 },
  { name: "ONE", val: 1.0 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 }
];

  var change = (cash - price);
  //object that will be returned
  var output = {status: null, change: [] };

//Transform CID array into drawer object 
var register = cid.reduce(
  function(acc, curr){
    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
  },
  {total: 0}
);

if (register.total === change){
  output.status = "CLOSED";
  output.change = cid;
  return output;
}

if(cid.sum < change){
      output.status =  "INSUFFICIENT_FUNDS";
      return output;
}

//iterate through the bills 
var change_arr = bills.reduce(function(acc, curr){
  var value = 0;
  while (register[curr.name] > 0 && change >= curr.val){
    change -= curr.val;
    register[curr.name] -= curr.val;
    value += curr.val;

//round
    change = Math.round(change * 100) / 100;
  }

//add bills that were not used
if (value > 0){
  acc.push([curr.name, value]);
}
return acc;
}, []);

//if theres left over change 
  if (change_arr.length < 1 || change > 0){
    output.status = "INSUFFICIENT_FUNDS";
  return output;
  }

output.status = "OPEN";
output.change = change_arr;
return output;
}