const animals=["🐒","🐕","🐈","🐅","🐇","🐸"]
let selectedAnimal=[];
let coins=200;

const buttons=document.querySelectorAll(".animal-btn");
const rollBtn=document.getElementById("rollBtn");
const diceResultDiv=document.getElementById("diceResult");
const winnerText=document.getElementById("winner");
const coinText=document.getElementById("coin");
const betInput=document.getElementById("betInput");

coinText.textContent=`所持コイン:${coins}円`;

const keyToEmoji = {
    monkey: "🐒",
    dog: "🐕",
    cat: "🐈",
    tiger: "🐅",
    rabbit: "🐇",
    frog: "🐸"
};

const emojiToKey = {
    "🐒": "monkey",
    "🐕": "dog",
    "🐈": "cat",
    "🐅": "tiger",
    "🐇": "rabbit",
    "🐸": "frog"
};
document.querySelectorAll(".animal").forEach(animalDiv=>{
    const minusBtn=animalDiv.querySelector(".minus");
    const plusBtn=animalDiv.querySelector(".plus");
    const betSpan=animalDiv.querySelector(".bet");
    const animalKey=animalDiv.dataset.animal;

    plusBtn.addEventListener("click",()=>{
        let bet=Number (betSpan.textContent);
        if(coins>=10){
            bet +=10;
            coins-=10;
            betSpan.textContent=bet;
            coinText.textContent=`所持コイン:${coins}円`;
        }
    });

    minusBtn.addEventListener("click",()=>{
        let bet=Number(betSpan.textContent);
        if(bet>=10){
            bet-=10;
            coins+=10;
            betSpan.textContent=bet;
            coinText.textContent=`所持コイン:${coins}円`;

        }
    });
});

//buttons.forEach(btn=>{
  //  btn.addEventListener("click",() =>{
      ////  const animal=btn.dataset.animal;
      // if(selectedAnimal.includes(animal)){
      //  selectedAnimal=selectedAnimal.filter(a=>a!==animal);
     // btn.style.backgroundColor="";
    //}else{
    //    selectedAnimal.push(animal);
  //      btn.style.backgroundColor="#ffee58";
    //}
//});
//});

rollBtn.addEventListener("click",()=>{
    const bets={};
    document.querySelectorAll(".animal").forEach(animalDiv=>{
        const key=animalDiv.dataset.animal;
        const bet=Number(animalDiv.querySelector(".bet").textContent);
        if(bet>0)bets[key]=bet;
    });
    if(Object.keys(bets).length===0){
        alert("ベットをしてください！");
        return;
    }
    //if(coins<=0){
       // alert("コインがなくなりました！ゲーム終了です。");
       // return;
   // }
    //if(!selectedAnimal.length ===0){
       // alert("動物をお選びください！！！");
       // return;
   // }
    //if(!bet||bet<=0){
    //    alert("ベット金額を入力してください！");
    //    return;
    //}
    //if(bet%10!==0){
     //   alert("ベット金額は１０の倍数で入力してください！");
      //  return;
   // }
   // if(bet * selectedAnimal.length>coins){
       // alert("所持コインが足りません！");
       //return;
    //}


    let diceRolls=[];
    let counts={ monkey:0, dog:0, cat:0, tiger:0, rabbit:0, frog:0};

    for(let i=0;i<6;i++){
        const randomIndex=Math.floor(Math.random()*animals.length);
        const emoji=animals[randomIndex];
        diceRolls.push(emoji);
        const key=Object.keys(keyToEmoji).find(k=>keyToEmoji[k]===emoji);
        counts[key]++;

    }
    rollAnimation(diceRolls,()=>{


    let totalWin=0;
    let resultText="";
    
   for (let key in counts){
    const count=counts[key];
    const emoji=keyToEmoji[key];
    const bet=bets[key]||0
   

        if (bet>0){
            if(count>=2){
            const win=bet*count*2;
            totalWin +=win;
            resultText += `${emoji}が${count}回出ました→+${win}円\n<br>`;   
        }else{
            totalWin-=bet;
            resultText+=`${emoji}は出ませんでした→-${bet}円\n<br>`;
        }
    }
   }

    coins+=totalWin;
    coinText.textContent=`所持コイン:${coins}円`;

    if(totalWin>0){
        resultText += `<hr>🙌合計勝ち額: +${totalWin}円`;
    }else if(totalWin<0){
        resultText += `<hr>💰 合計負け額: ${totalWin}円`;
    }else{
        resultText +=`<hr> 🙁合計±0円`;
    }
    winnerText.innerHTML=resultText;

    document.querySelectorAll(".animal .bet").forEach(span=>span.textContent="0");

    if(coins<=0){
        alert("コインがなくなりました！ゲーム終了です。");
        rollBtn.disabled=true;
        document.querySelectorAll(".animal button").forEach(b =>b.disabled=true);
    }
});
});
function rollAnimation(finalDiceRolls,callback){
    const diceResultDiv=document.getElementById("diceResult");
    const animals=["🐒","🐕","🐈","🐅","🐇","🐸"];
    let count=0;
    const interval=setInterval(()=>{
        let tempRolls=[];
        for(let i=0;i<6;i++){
        const randomAnimal=animals[Math.floor(Math.random()*animals.length)];
        tempRolls.push(randomAnimal);
        }
        diceResultDiv.textContent=tempRolls.join(" ");
        count++;
        if(count>15){
            clearInterval(interval);
            diceResultDiv.textContent=finalDiceRolls.join(" ");
            if(callback) callback();
        }
    },100);

}

    
