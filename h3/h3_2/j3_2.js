const input = document.querySelector(".inputData");
const btnImage = document.querySelector(".btnimage");
const image  = document.querySelector(".image");
const btnDownload = document.querySelector(".download");

btnImage.addEventListener("click",() => {
    image.src= 'data:image/png;base64,'+input.value;    // sets src attribute
});

btnDownload.addEventListener("click", () => {
    fetch(image.src)
        .then(response => response.blob())             // converts image.src into binary representation
        .then(blob => {
            const blobURL = URL.createObjectURL(blob);

            const downloadLink = document.createElement('a');
            downloadLink.href = blobURL;
            downloadLink.download = 'image.png'; // Set the desired file name and extension

            downloadLink.click();       // auto click event for download link

            URL.revokeObjectURL(blobURL);
        });
});

const inputCopy = document.querySelector("#inputCopy");
const inputClear = document.querySelector("#inputClear");

inputCopy.addEventListener("click",()=>{
    const content = input.value;  
    navigator.clipboard.writeText(content);
    alert("copied to clipboard!");
})

inputClear.addEventListener("click",()=>{
    input.value='';  
    image.src='';
})