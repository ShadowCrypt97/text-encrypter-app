const encryptBtn = document.querySelector("#encrypt");
const decryptBtn = document.querySelector("#decrypt");
const decryptBtnContainer = document.querySelector("#decrypt-btn-container");
const inputText = document.querySelector("#input-textarea");
const responseContainer = document.querySelector("#output-res-container");
const outputContainer = document.querySelector("#response-container");
const responseEmptyContainer = document.querySelector("#response-empty-container");
const answerPanel = document.querySelector("#answer-panel");
const responseText = document.querySelector("#response");

function cleanTextArea(){
    if(inputText.value === "Write something here")
        inputText.value = "";
}

function restoreTextArea(){
    if(inputText.value === "")
        inputText.value = "Write something here";
}

function assignTextResponse(texto) {
    responseText.innerHTML = texto;
    return;
}

function encrypt(){
    let encryptedText = ""
    if(inputText.value === "Write something here" || inputText.value === ""){
        document.querySelector("#answer-panel").append(responseEmptyContainer);
        outputContainer.setAttribute("style", "display:none;");
        decryptBtnContainer.setAttribute("class", "decrypt-button decrypt-button-disabled col-lg-4 col-sm-12 col-md-12 col-xs-12");
    }
    else{
        responseEmptyContainer.remove();
        outputContainer.removeAttribute("style");
        decryptBtnContainer.setAttribute("class", "decrypt-button col-lg-4 col-sm-12 col-md-12 col-xs-12");
        encryptedText = encryptMessage(inputText.value);
        assignTextResponse(encryptedText);
        inputText.value = "Write something here";
    }    
}

function encryptMessage(message){
    if(/[A-Z]/.test(message)){
        alert("Error: The text must be on lowercase");
    }else if(containsSpecialChars(message)){
        alert("Error: The text must not has special characters");
    }
    else{
        let rules = encryptRules();
        for (var vowel in rules) {
            var regex = new RegExp(vowel, 'g');
            message = message.replace(regex, rules[vowel]);
        }
        return message;
    }
}

function containsSpecialChars(text) {
    var regex = /[áéíóúÁÉÍÓÚñÑüÜ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var output = regex.test(text);
    return output;
}


function encryptRules(){
    let rules = {
        "e": "enter",
        "i": "imes",
        "a": "ai",
        "o": "ober",
        "u": "ufat"
    };
    return rules;
}

function decrypt(){
    if(inputText.value === "Write something here" || inputText.value === ""){
        outputContainer.setAttribute("style", "display:none;");
        decryptBtnContainer.setAttribute("class", "decrypt-button decrypt-button-disabled col-lg-4 col-sm-12 col-md-12 col-xs-12");
        answerPanel.appendChild(responseEmptyContainer);
    }else{
        decryptedText = decryptMessage(inputText.value);
        assignTextResponse(decryptedText);
        inputText.value = "Write something here";
    }
}

function decryptMessage(encryptedMessage){
    let rules = encryptRules();
    for (var vowel in  rules) {
        var regex = new RegExp(rules[vowel], 'g');
        encryptedMessage = encryptedMessage.replace(regex, vowel);
    }
    return encryptedMessage;
}

async function copy(){
    await navigator.clipboard.writeText(responseText.textContent);
    alert("message copied successfully on the clipboard!");
}