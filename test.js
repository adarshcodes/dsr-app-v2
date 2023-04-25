function getist(){
  
  var currentTime = new Date();
  var currentOffSet = currentTime.getTimezoneOffset();
  var ISTOffSet = 330;
  var ISTTime = new Date(currentTime.getTime() + (ISTOffSet + currentOffSet)*60000);
  return ISTTime;
}

console.log(getist().getDate());