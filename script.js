let form = document.querySelector("form");
let inputs = form.querySelectorAll('input');
let spans = form.querySelectorAll('span');
let loginDiv = document.querySelector("#loginPage")
let signupDiv = document.querySelector("#signupPage")
let chatGPTDiv = document.querySelector("#chatGPT")

let quesArr = [{question: "what is a dog" , answer: "Dog is a animal with 4 legs", imageLink:"dog.jpg"},
{question:"what is a human being", answer:"Human being is a self Organised person", imageLink:"person.jpg"},
{question:"is relationship are healthy",answer:"Yes, if both of the partner is loyal",imageLink:"relation.jpg"}]

let person = new Array()

for(let i = 0;i<inputs.length;i++){
    inputs[i].addEventListener("input",()=>{validateInputs(inputs[i].id)});
}
let signupBtn = form.querySelector("#signupBtn");

signupBtn.addEventListener('click',addPersonIntoData)
let id = 0


//validate

function validateInputs(indNo){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passFormat=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    let conditions = [inputs[0].value.length>=2,inputs[1].value.match(mailformat),inputs[2].value.match(passFormat),inputs[2].value===inputs[3].value]
    if(conditions[indNo]){
        spans[indNo].innerHTML = 'Valid'
        spans[indNo].style.color = "green"
    }else{
        spans[indNo].innerHTML = 'Invalid'
        spans[indNo].style.color = "red"
    }
}

function addPersonIntoData(e){
    let allFieldValid = true;
    let sucessMsg = document.querySelector('#sucessfullyAdded')
    for (const t of spans) {
        if(t.innerText=="Invalid"||t.innerText==""){
            allFieldValid = false
        }
    }
    let isAlreadyExist = false
    for (const t of person) {
        if(t.email==inputs[1].value){
            isAlreadyExist = true
        }
    }
    if(allFieldValid==true && isAlreadyExist==false){
        let obj = new Object();
        id++;
        obj.id = id
        obj.name = inputs[0].value
        obj.email = inputs[1].value
        obj.password = inputs[2].value
        person.push(obj);
        console.log("hello");
        sucessMsg.innerHTML = "You are Successfully Signed Up"
        sucessMsg.style.color = "green"
        signupDiv.style.display = "none"
        loginDiv.style.display ="block"
    }else{
        sucessMsg.innerHTML = "You Already Exist or you have entered wrong Field inputs! Try Again"
        sucessMsg.style.color = "red"
    }
}

let loginEmail = document.getElementById('loginEmail')
let loginPass = document.getElementById("loginPass")
let loginButton = document.getElementById("loginBtn")

loginButton.addEventListener('click',loginCheckKaro)

function loginCheckKaro(){
    let isEmailandPass = false
    let loginmsg = document.getElementById('loginSuccess')
    for(let t of person){
        if((t.email==loginEmail.value) && (t.password==loginPass.value)){
            isEmailandPass = true
            let token = ""
            for(let i = 0;i<10;i++){
                let randomNum = Math.floor(Math.random()*9)
                token += String(randomNum)
            }
            t.token = token
            t.chances = "10"
            chatGPTDiv.style.display = "block"
        }
    }
    if(isEmailandPass){
        loginmsg.innerText = "Login Success"
        loginmsg.style.color = "green"
        loginDiv.style.display = "none"

    }else{
        loginmsg.innerText = "Email and Password are not Correct"
        loginmsg.style.color = "red"
    }
}
let quesInput = document.querySelector('#questGpt')
let searchBtn = document.querySelector('#search')


let inputGpt = document.createElement('input')
let voiceBtn = document.createElement('input')
inputGpt.setAttribute("type","text");
voiceBtn.setAttribute("type","button")
voiceBtn.setAttribute("value","speakText")
searchBtn.addEventListener('click',searchQues)
function searchQues(){
    for(let t of quesArr){
        if(quesInput.value==t.question){
            let ans = document.createElement('p')
            ans.innerText = t.answer
            chatGPTDiv.append(ans)
            let img = document.createElement('img')
            img.src = t.imageLink
            chatGPTDiv.append(img)
            chatGPTDiv.append(document.createElement('br'))
            chatGPTDiv.append(inputGpt)
            chatGPTDiv.append(voiceBtn)
        }
    }
}
voiceBtn.addEventListener('click',findNameFromToken)
function findNameFromToken(){
    for(let t of person){
        if(inputGpt.value==t.token){
            if(t.chances>0){
                chatGPTDiv.append(document.createElement('br'))
                t.chances--
                let name = document.createElement('span')
                name.innerText = `${t.name}   `
                name.style.color = 'green'
                let leftChances = document.createElement('span')
                leftChances.innerText = t.chances
                leftChances.style.color = 'green'
                chatGPTDiv.append(name)
                chatGPTDiv.append(leftChances)
            }else{
                let noChance = document.createElement('p')
                noChance.innerText = "You have no chances left"
                noChance.style.color = 'red'
                chatGPTDiv.append(noChance)
            }
        }else{
            let noChance = document.createElement('p')
            noChance.innerText = "You have entered the wrong token"
            noChance.style.color = 'red'
            chatGPTDiv.append(noChance)
        }
    }
}