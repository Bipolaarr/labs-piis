import shirts from "./shirts.js"

const cartContainer = document.createElement('div')
    cartContainer.id="cartContainer"

shirts.forEach((element ,index) => {

    console.log(index)
    
    const cart = document.createElement('div')
    cart.className='cart'

    const  tshirt =document.createElement("div")
    tshirt.className="tshirt"

    const  info =document.createElement("div")
    info.className="info"

    const  title =document.createElement("div")
    title.className="title"

    const  buttons =document.createElement("div")
    buttons.className="buttons"

    const img = document.createElement("img");
    img.className="img"
    img.src = element.colors.white.front; 
    console.log(element.default.front)
    
    const title1= document.createElement("label")
    title1.className="name"
    title1.textContent = element.name; 
        
    const subtitle= document.createElement("label")
    subtitle.className="subtitle"
    const colors=element.colors
    subtitle.textContent = "Avaible in "+Object.keys(colors).length +" colors"; 
        
    const viewButton=document.createElement("button")
    viewButton.className="button"
    viewButton.textContent="Quick view"
    viewButton.id=index
    viewButton.addEventListener("click", () => openQuickView(index));
    
    const seeButton=document.createElement("button")
    seeButton.className="button"
    seeButton.textContent="See more"
    seeButton.onclick = function() { 
        localStorage.setItem('index', JSON.stringify(shirts[index]));
        window.location.href = 'seePage.html';
    }; 
        
    title.appendChild(title1)
    title.appendChild(subtitle)

    info.appendChild(title)
    info.appendChild(buttons)

    buttons.appendChild(viewButton)
    buttons.appendChild(seeButton)

    tshirt.appendChild(img)
    
    cart.appendChild(tshirt)
    cart.appendChild(info)

    cartContainer.appendChild(cart);
    
});

function openQuickView(num) {
    const id=Number(num)
    const modal = document.getElementById("quickViewModal");
    const title = document.getElementById("quickViewTitle");
    const description = document.getElementById("quickViewDescription");
    const imageFront = document.getElementById("quickViewImageFront");
    const imageBack = document.getElementById("quickViewImageBack");

    title.textContent = shirts[id].name;
    description.textContent = shirts[id].price;
    imageFront.src = shirts[id].colors[Object.keys(shirts[id].colors)[0]].front; 
    imageBack.src = shirts[id].colors[Object.keys(shirts[id].colors)[0]].back
    modal.style.display = "block"; 
}


const closeModal = document.getElementsByClassName("close")[0];
console.log(closeModal.textContent)
closeModal.onclick = function() {
    console.log("qqq")
    const modal = document.getElementById("quickViewModal");
    modal.style.display = "none"; 
}



document.body.appendChild(cartContainer);




