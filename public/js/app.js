const weatherForm = document.querySelector("form");
const searchAddress = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch("/weather?address="+searchAddress.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
                return;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forcastData;
        })
    })
});
