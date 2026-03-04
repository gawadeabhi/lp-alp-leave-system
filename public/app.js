let currentEmp=null
let selectedDate=null

let leaveData={}

function login(){

let emp=document.getElementById("empNo").value

if(emp==""){
alert("Enter Employee Number")
return
}

currentEmp=emp

document.getElementById("loginBox").style.display="none"
document.getElementById("dashboard").style.display="block"

document.getElementById("employeeHeader").innerHTML=
"Employee : "+emp+" | Leave Used : 0 / 8 | Occasions : 0 / 3"

generateBoard("2026-03-01","2026-04-15")

}

function generateBoard(start,end){

const board=document.getElementById("leaveBoard")
board.innerHTML=""

let current=new Date(start)
let last=new Date(end)

while(current<=last){

let dateStr=current.toISOString().split("T")[0]

let box=document.createElement("div")
box.className="date-box"

let header=document.createElement("div")
header.className="date-header"
header.innerText=current.toDateString().slice(4,10)

let confirmed=document.createElement("div")
confirmed.className="confirmed"

let waiting=document.createElement("div")
waiting.className="waiting"

let cList=leaveData[dateStr]?.confirmed||[]
let wList=leaveData[dateStr]?.waiting||[]

confirmed.innerHTML=cList.join("<br>")
waiting.innerHTML=wList.join("<br>")

box.appendChild(header)
box.appendChild(confirmed)
box.appendChild(waiting)

box.onclick=function(){
openPopup(dateStr)
}

board.appendChild(box)

current.setDate(current.getDate()+1)

}

}

function openPopup(date){

selectedDate=date

let confirmed=leaveData[date]?.confirmed?.length||0
let waiting=leaveData[date]?.waiting?.length||0

let status="Confirmed Available"

if(confirmed>=6 && waiting<4)
status="Confirmed Full → Waiting"

if(confirmed>=6 && waiting>=4)
status="Date Full"

document.getElementById("popupInfo").innerHTML=

"Date : "+date+
"<br>Confirmed : "+confirmed+"/6"+
"<br>Waiting : "+waiting+"/4"+
"<br>Status : "+status

document.getElementById("applyPopup").style.display="flex"

}

function closePopup(){

document.getElementById("applyPopup").style.display="none"

}

function applyLeave(){

if(!leaveData[selectedDate]){

leaveData[selectedDate]={
confirmed:[],
waiting:[]
}

}

let data=leaveData[selectedDate]

if(data.confirmed.length<6){

data.confirmed.push(currentEmp)

}

else if(data.waiting.length<4){

data.waiting.push(currentEmp)

}

else{

alert("Date Full")
closePopup()
return

}

closePopup()

generateBoard("2026-03-01","2026-04-15")

                        }
