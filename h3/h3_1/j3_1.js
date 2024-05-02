const fileInput = document.getElementById("fileInput");
const baseoutput = document.querySelector(".base64");
const htmloutput = document.querySelector(".html");
const cssoutput = document.querySelector(".css");
const imagePreview = document.querySelector(".image");

fileInput.addEventListener("change",(e) => {
    // console.log(e);
    const file = fileInput.files[0];             // file[0]: first uploaded file
    const reader = new FileReader();             // reads the contents of files
    reader.addEventListener("load", () =>{
        const result = reader.result; // result: property of the FileReader object that holds the result of reading operation once it's completed
        const cut = ';base64,'
        const string = result.indexOf(cut)+8;
        baseoutput.value= result.slice(string);
        htmloutput.value='<img src=\'' + result + '\'/>';
        cssoutput.value='background-image: url(' + result + ')';
        imagePreview.src=result;
    });
    reader.readAsDataURL(file);                  // reads the contents of the file and convert it into a base64-encoded data URL
});

const baseCopy = document.querySelector("#baseCopy");
const htmlCopy = document.querySelector("#htmlCopy");
const cssCopy = document.querySelector("#cssCopy");

baseCopy.addEventListener("click",()=>{
    const content = baseoutput.value;    
    navigator.clipboard.writeText(content);    // navigator.clipboard: object that allows you to interact with the clipboard to read or write data. writeText(content): method used to copy the content to the clipboard
    alert("copied to clipboard!");
})

htmlCopy.addEventListener("click",()=>{
    const content = htmloutput.value;    
    navigator.clipboard.writeText(content);
    alert("copied to clipboard!");
})
cssCopy.addEventListener("click",()=>{
    const content = cssoutput.value;    
    navigator.clipboard.writeText(content);
    alert("copied to clipboard!");
})