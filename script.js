const encryptBtn = document.querySelector("#encrypt");
const decryptBtn = document.querySelector("#decrypt");
const inputText = document.querySelector("#input-textarea");
const responseContainer = document.querySelector("#response-container");
const responseEmptyContainer = document.querySelector("#response-empty-container");
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
        responseContainer.setAttribute("style", "display:none;");
    }
    else{
        responseEmptyContainer.remove();
        responseContainer.removeAttribute("style");
        encryptedText = encryptMessage(inputText.value);
        assignTextResponse(encryptedText);
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

}