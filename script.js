// colourflipper
const body=document.getElementsByTagName("body")[0]

function setcolour(col){
  body.style.backgroundColor=col;
}
// setcolour("blue");
function randcolour(){
  const red=Math.round(Math.random()*255);
  const green=Math.round(Math.random()*255);
  const blue=Math.round(Math.random()*255);
  const color= `rgb(${red},${green},${blue})`;
  body.style.backgroundColor=color;
}


// stopwatch
let secondselapsed=0
let interval=null
const time=document.getElementById("time")
function setTime(){
  const hours=Math.floor(secondselapsed/3600)
  const minutes=Math.floor((secondselapsed%3600)/60)
  const seconds=secondselapsed%60
  time.innerHTML=`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}
function timer(){
  secondselapsed++;
  setTime()
}
function pad(value){
  return String(value).padStart(2,"0")
}
function startclock(){
  if (interval) stopclock()
  interval=setInterval(timer,1000)
}
function stopclock(){
  clearInterval(interval)

}
function resetclock(){
  stopclock()
  secondselapsed=0
  setTime()
}

//todo list

let items=[];
const itemsdiv=document.getElementById("items")
const input=document.getElementById("iteminput");
const storagek="items";

function renderitems(){
  itemsdiv.innerHTML=null;
  
  for(const[idx,item] of Object.entries(items)){
    const container=document.createElement("div")
    container.style.marginBottom="10px"
    const text=document.createElement("p")
    text.style.display="inline"
    text.textContent=item;
    text.style.marginRight="10px"
    const button=document.createElement("button")
    button.textContent="Delete"
    button.onclick= () =>removeitem(idx)
    container.appendChild(text)
    container.appendChild(button)

    itemsdiv.appendChild(container)
    
  }
 
}

function loaditem(){
  const olditems=localStorage.getItem(storagek);
  if(olditems){
    items=JSON.parse(olditems);
    renderitems();
  }
   
}
function additem(){
  const value=input.value;
  if(!value){
    alert("you cannot add an empty item")
    return
  }
  items.push(value)
  renderitems()
  input.value=""
  saveitem()
}
function removeitem(idx){
  items.splice(idx,1)
  renderitems()
  saveitem()
}
function saveitem(){
  const stringi=JSON.stringify(items)
  localStorage.setItem(storagek,stringi)
  
}
  document.addEventListener("DOMContentLoaded", loaditem)
