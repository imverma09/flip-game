const Arr = ["/images/dicefirst.jpg", "/images/dicetwo.png", "/images/dicethree.jpg", "/images/diceFour.png", "/images/diceFive.png", "/images/dicesix.png"];
const newArr = [...Arr, ...Arr]
const easyArr = ["/images/dicefirst.jpg", "/images/dicetwo.png", "/images/dicethree.jpg", "/images/dicefirst.jpg", "/images/dicetwo.png", "/images/dicethree.jpg"]
const mediumArr = ["/images/dicefirst.jpg", "/images/dicetwo.png", "/images/dicethree.jpg", "/images/diceFour.png", "/images/diceFive.png", "/images/dicefirst.jpg", "/images/dicetwo.png", "/images/dicethree.jpg", "/images/diceFour.png", "/images/diceFive.png"]
const mainDiv = document.querySelector(".main")
let myTurn = 1;
let choice1, choice2, cover2, cover1
const select = document.querySelector("#select")
const span = document.getElementById("move");
let move = 0;
select.addEventListener("change", (e) => {
   let val = e.target.value
   if (val == "easy") {
      enterDiv(easyArr)
      game();
      mainDiv.classList.add("easy")
   }
   if (val == "medium") {
      mainDiv.classList.remove("easy")
      enterDiv(mediumArr)
      game();
   }
   if (val == "hard") {
      mainDiv.classList.remove("easy")
      enterDiv(newArr);
      game()
   }
})
  
     
function enterDiv(myArr) {
   mainDiv.innerHTML = ""
   myArr.forEach((img) => {
      let name = Math.floor(Math.random() * 1000000);
      mainDiv.innerHTML += `
      <div name="${name}">
      <img src="${img}" alt="" class="hide" name=${name}>
      <img src="/images/palat.png" alt="" class="cover" name=${name}>
      </div>
      `
   })

   document.querySelector("#btn").addEventListener("click", () => {
      document.querySelectorAll("img.hide").forEach(val => val.style.display = "none")
      document.querySelectorAll("img.cover").forEach(val => val.style.display = "block")
      myArr.sort(() => Math.random() - 0.3);
      let idx = 0;
      document.querySelectorAll("img.hide").forEach(val => val.src = `${myArr[idx++]}`)
   })
}

function flipImage(choice1, choice2, cover1, cover2) {
   setTimeout(() => {
      choice1.style.display = "none"
      choice2.style.display = "none"
      cover1.style.display = "block"
      cover2.style.display = "block"
   }, 1000);
}

function game() {
   const coverImg = document.querySelectorAll(".cover");
   const Img = document.querySelectorAll(".hide");
   coverImg.forEach((img) => {
      img.addEventListener("click", (e) => {
         move++
         span.innerText = move;
         e.target.style.display = "none"
         const diceImg = document.querySelector(`div[name="${e.target.name}"] img.hide`);
         const palatImg = document.querySelector(`div[name="${e.target.name}"] img.cover`);
         diceImg.style.display = "block";
         if (myTurn == 1) {
            choice1 = diceImg
            cover1 = palatImg
            myTurn = 2;
         } else {
            choice2 = diceImg
            cover2 = palatImg;
            myTurn = 1;
            if (choice1.src.split("images")[1] != choice2.src.split("images")[1] && choice1 != null && choice2 != null) {
               flipImage(choice1, choice2, cover1, cover2);
            }
            choice1 = null
            choice2 = null
         }
      })
   })
}

enterDiv(newArr);
game()




