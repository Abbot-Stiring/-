const animals=["🐒","🐕","🐈","🐅","🐇","🐸"]
let selectedAnimal=[];
let score=0;

const buttons=document.querySelectorAll(".animal-btn");
const rollBtn=document.getElementById("rollBtn");
const diceResultDiv=document.getElementById("diceResult");
const winnerText=document.getElementById("winner");
const scoreText=document.getElementById("score");

buttons.forEach(btn=>{
    btn.addEventListener("click",() =>{
        const animal=btn.dataset.animal;
       if(selectedAnimal.includes(animal)){
        selectedAnimal=selectedAnimal.filter(a=>a!==animal);
      btn.style.backgroundColor="";
    }else{
        selectedAnimal.push(animal);
        btn.style.backgroundColor="#ffee58";
    }
});
});

rollBtn.addEventListener("click",()=>{
    if(!selectedAnimal.length ===0){
        alert("動物をお選びください！！！");
        return;
    }

    const diceRolls=[];
    const counts={ monkey:0, dog:0, cat:0, tiger:0, rabbit:0, frog:0};

    for(let i=0;i<6;i++){
        const randomIndex=Math.floor(Math.random()*animals.length);
        const animal=animals[randomIndex];
        diceRolls.push(animal);

        switch(animal){
            case"🐒":counts.monkey++;break;
            case"🐕":counts.dog++;break;
            case"🐈":counts.cat++;break;
            case"🐅":counts.tiger++;break;
            case"🐇":counts.rabbit++;break;
            case"🐸":counts.frog++;break;           
        }
    }
    diceResultDiv.textContent=diceRolls.join(" ");

    let maxCount=0;
    let winner="";
    for (let animalName in counts){
        if (counts[animalName]>maxCount){
            maxCount=counts[animalName];
            winner=animalName;
        }
    }
    winnerText.textContent=`Winning Animal: ${winner.toUpperCase()} (${maxCount}times)`;
    
    let iswinner=false;
    for(let animal of selectedAnimal){
    if (
        (animal==="🐵"&&winner==="monkey")||
        (animal==="🐕"&&winner==="dog")||
        (animal==="🐈"&&winner==="cat")||
        (animal==="🐅"&&winner==="tiger")||
        (animal==="🐇"&&winner==="rabbit")||
        (animal==="🐸"&&winner==="frog")
        
    ){
        iswinner=true;
        break;
    }
    } 
    if(iswinner){
        score+=maxCount*10;
        winnerText.textContent+="🎉勝です！！";

    }else{
        score-=10;
        winnerText.textContent+="😢 負けです！！";
    }
    scoreText.textContent=score;
   
});