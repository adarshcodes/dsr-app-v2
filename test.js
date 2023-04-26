function getist(){
  
  const options = { timeZone: 'Asia/Kolkata' };
const myDate = new Date().toLocaleString('en-US', options);
return myDate;
}

console.log(getist());