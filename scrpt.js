const inputSlider = document.querySelector('[data-lengthSlider]');
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatorBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbol = "!@#$%^&*()_+{}|:<>?[]\;',./";

console.log('start');
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider()
//state color of strength circle
setIndicator('#ccc');

//Set PasswordLength
function handleSlider() {
     inputSlider.value = passwordLength;
     lengthDisplay.innerText = passwordLength;

     const min=inputSlider.min;
     const max=inputSlider.max;

     inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
}

//set Indicator
function setIndicator(color) {
     indicator.style.backgroundColor = color;
     indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

//random Integer
function getRandomInteger(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
}

//generote random number

function getRandomNumber() {
     return getRandomInteger(0, 9);
}

function getRandomLowercase() {
     return String.fromCharCode(getRandomInteger(97, 123));
}

function getRandomUppercase() {
     return String.fromCharCode(getRandomInteger(65, 91));
}

function getRandomSymbol() {
     const ranNum = getRandomInteger(0, symbol.length);
     return symbol.charAt(ranNum);
}
console.log('start2');
function calcStrength() {
     
     let hasUpper = false;
     let hasLower = false;
     let hasNum = false;
     let hassym = false;
    
     if (uppercaseCheck.checked) hasUpper = true;
     if (lowercaseCheck.checked) hasLower = true;
     if (numbersCheck.checked) hasNum = true;
     if (symbolsCheck.checked) hassym = true;
     
     if (hasUpper && hasLower && (hasNum || hassym) && passwordLength >= 8)
          setIndicator("#0f0");
     else {
          if ((hasLower || hasUpper) && (hasNum || hassym) && (password >= 6))
               setIndicator("#ff0");

          else
                 setIndicator("#f00");
           }

}
console.log('start2');
 async function copyContent()
{    try
     {
     await navigator.clipboard.writeText(passwordDisplay.value);
     copyMsg.innerText="copied"; 
     }
     catch(e)
     {
          copyMsg.innerText="failed";
     }
     copyMsg.classList.add("active");
     setTimeout(()=>{
          copyMsg.classList.remove("active");
     },2000);

}
console.log('start2');
inputSlider.addEventListener('input',(e)=>{passwordLength=e.target.value;
handleSlider();})
console.log('start2');
copyBtn.addEventListener('click',()=>
{
     if(passwordDisplay.value)
     copyContent();
})
console.log('start2');
function handleCheckBoxChange()
{
     checkCount=0;
     allCheckBox.forEach((checkbox)=>{if(checkbox.checked)checkCount++;});

     if(passwordLength<checkCount)
     {
          passwordLength=checkCount;
          handleSlider();
     }
}
console.log('start2');
allCheckBox.forEach((checkbox)=>
{
     checkbox.addEventListener('change', handleCheckBoxChange);

}) 
console.log('start2');
function shufflePassword(array)
{
   for(let i=array.length-1;i>=0;i--)
   {
     const j=Math.floor(Math.random()*(i+1));
     const temp=array[i];
     array[i]=array[j];
     array[j]=temp;
   }
   let str="";
   array.forEach((el)=>(str+=el))
   return str;
}

console.log('start2');
//generate password 

generatorBtn.addEventListener('click',()=>
{
    if(checkCount<=0)
    return;
    console.log('start2');
    if(passwordLength<checkCount)
    {
         passwordLength=checkCount;
         handleSlider();
    }

    //lets start the journey to find new password
    password="";

    //lets puts the stuff mention by checkboxes

//     if(uppercaseCheck.checked)
//     password+=getRandomUppercase;

//     if(lowercaseCheck.checked)
//     password+=getRandomLowercase;

//     if(symbolsCheck.checked)
//     password+=getRandomNumber;

//     if(numbersCheck.checked)
//     password+=getRandomSymbol;

let funArr=[];

if(uppercaseCheck.checked)
   funArr.push(getRandomUppercase);

   if(lowercaseCheck.checked)
   funArr.push(getRandomLowercase);

   if(numbersCheck.checked)
   funArr.push(getRandomNumber);

   if(symbolsCheck.checked)
   funArr.push(getRandomSymbol);
   console.log("safe1");
    for(let i=0;i<funArr.length;i++)
    password+=funArr[i]();
   
    console.log("safe2");
   for(let i=0;i<passwordLength-funArr.length;i++)
   {
     let randIndex=getRandomInteger(0,funArr.length);
     password+=funArr[randIndex]();
   }
   console.log("safe3");
   password=shufflePassword(Array.from(password));
      
   console.log("safe4");
   passwordDisplay.value=password;
   
    
   console.log("safe5");
   calcStrength();




})






