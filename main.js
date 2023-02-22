let key = "fbyHh7LEjpGbwx8CRf2s4nPg";
let url = "https://api.remove.bg/v1.0/removebg";
let downloadCard = document.getElementById("downloadCard");
let addCard = document.getElementById("addCard");
let displayCard = document.getElementById("displayCard");
let loadingCard = document.getElementById("loadingCard");
let fileInput = document.getElementById("fileInput");
let imgBefore = document.getElementById("display-img");
let startBtn = document.getElementById("startBtn");
let imageAfter =document.querySelector(".image-after")
let imageBeforeSm =document.querySelector(".image-before")
let uploadAnother= document.getElementById("uploadAnother")
let downloadHref=document.getElementById("downloadHref")
let file;

const reader = new FileReader();
const formData=new FormData();

const activeScrenn = (screen) => {
    downloadCard.style.display = "none";
    addCard.style.display = "none";
    displayCard.style.display = "none";
    loadingCard.style.display = "none";
    screen.style.display = "flex";
};
activeScrenn(addCard);
fileInput.addEventListener("input", () => {
    file = fileInput.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        imgBefore.src = reader.result;
        imageBeforeSm.src=reader.result
    };
    activeScrenn(displayCard);
});

startBtn.addEventListener("click", () => {
    formData.append("image_file",file)
    activeScrenn(loadingCard);
    fetch(url, {
        method: "POST",
        headers: {
        "X-Api-Key":key
        },
        body:formData,
    }).then((res)=>res.blob()).then((blob)=>{
        reader.readAsDataURL(blob);
    reader.onloadend = () => {
        imageAfter.src = reader.result;
        downloadHref.setAttribute("href",reader.result)
    };
    activeScrenn(downloadCard)
    })
});

uploadAnother.addEventListener("click",()=>{
    activeScrenn(addCard)
})
