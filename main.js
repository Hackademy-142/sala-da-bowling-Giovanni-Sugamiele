// SALA DA BOWLING


const bowling = {
    "players": [
        {"name": "Fabrizio", "scores1": [], "scores2": [], "finalScore":0},
        {"name": "Roberta", "scores1": [], "scores2": [], "finalScore":0},
        {"name": "Michele", "scores1": [], "scores2": [], "finalScore":0},
        {"name": "Karim", "scores1": [], "scores2": [], "finalScore":0},
    ],
    "setScores": function(){
        if(this.players[0].scores1.length < 10){
            this.players.forEach( (giocatore)=>{
                let tiro = Math.round( Math.random()*(10-0)+0)
                let tiro2 = Math.round( Math.random()*(10-tiro)+0)
                let result = tiro+tiro2;
                if(tiro == 10){

                    let video = document.querySelector(".img-strike");
                    video.classList.remove("d-none");
                    video.play();
                    setTimeout(() => {
                        video.classList.add("d-none");
                    }, 3000);
                } else { 
                    console.log(`tiro 1: ${tiro} + tiro 2: ${tiro2}`)
                    console.log(`result ${result}`)
                }

                giocatore.scores1.push( tiro )
                giocatore.scores2.push(tiro2)
                giocatore.finalScore = giocatore.scores1.reduce( (acc,num)=>acc+num, 0 ) + giocatore.scores2.reduce( (acc,num)=>acc+num, 0 ) 
            })
        }
    },
    "setWinner2": function(){
        this.players.sort( (a, b)=> b.finalScore - a.finalScore )
        
    },
    "setNewPlayer": function(nome){
        this.players.push(  {"name": nome, "scores": [], "finalScore": 0, "tiro1": 0, "tiro2": 0}  )
    },
    "createTable": function(){
        playersWrapper.innerHTML = "";
        
        this.players.forEach( (giocatore, i)=>{
            let tr = document.createElement("tr")
            tr.innerHTML = `
            <th scope="row">${i+1}</th>
            <td>${giocatore.name}</td>
            <td>${giocatore.scores1[0] ? giocatore.scores1[0] : 0}</td>
            <td>${giocatore.scores2[0] ? giocatore.scores2[0] : 0}</td>
            <td>${giocatore.scores1[1] ? giocatore.scores1[1] : 0}</td>
            <td>${giocatore.scores2[1] ? giocatore.scores2[1] : 0}</td>
            <td>${giocatore.scores1[2] ? giocatore.scores1[2] : 0}</td>
            <td>${giocatore.scores2[2] ? giocatore.scores2[2] : 0}</td>
            <td>${giocatore.scores1[3] ? giocatore.scores1[3] : 0}</td>
            <td>${giocatore.scores2[3] ? giocatore.scores2[3] : 0}</td>
            <td>${giocatore.scores1[4] ? giocatore.scores1[4] : 0}</td>
            <td>${giocatore.scores2[4] ? giocatore.scores2[4] : 0}</td>
            <td>${giocatore.scores1[5] ? giocatore.scores1[5] : 0}</td>
            <td>${giocatore.scores2[5] ? giocatore.scores2[5] : 0}</td>
            <td>${giocatore.scores1[6] ? giocatore.scores1[6] : 0}</td>
            <td>${giocatore.scores2[6] ? giocatore.scores2[6] : 0}</td>
            <td>${giocatore.scores1[7] ? giocatore.scores1[7] : 0}</td>
            <td>${giocatore.scores2[7] ? giocatore.scores2[7] : 0}</td>
            <td>${giocatore.scores1[8] ? giocatore.scores1[8] : 0}</td>
            <td>${giocatore.scores2[8] ? giocatore.scores2[8] : 0}</td>
            <td>${giocatore.scores1[9] ? giocatore.scores1[9] : 0}</td>
            <td>${giocatore.scores2[9] ? giocatore.scores2[9] : 0}</td>
            <td>${giocatore.finalScore}</td>
            `
            playersWrapper.appendChild(tr)
        } )
    },
    "setModalResults": function(){
        
        modalWinner.innerHTML = `Il vincitore è ${this.players[0].name}`
        
        this.players.forEach((giocatore, i)=>{
            let p = document.createElement("p");
            p.innerHTML = `<p>#${i+1} - ${giocatore.name} Punteggio Finale: ${giocatore.finalScore}</p>`
            modalBody.appendChild(p);
        })
    },
    "resetGame": function(){
        this.players = [];
    },
    "restartGame": function(){
        this.players.forEach((element)=> {
            element.scores1 = [];
            element.scores2 = [];
            element.finalScore = 0;
        })       
    }
}

let playersWrapper = document.querySelector("#playersWrapper")
bowling.createTable()





// EVENTI PULSANTI

//Inizia Partita
let btnStart = document.querySelector("#btnStart");

btnStart.addEventListener("click", ()=>{
    btnStart.classList.add("d-none");
    playRound.classList.remove("d-none");
    btnNewPlayer.classList.add("d-none");
    btnRestartGame.classList.remove("d-none");
})



//Gioca Turno
let playRound = document.querySelector("#playRound")
let gameOver = document.querySelector("#gameOver")
playRound.addEventListener("click", ()=>{
    bowling.setScores();
    bowling.createTable();
    if(bowling.players[0].scores1.length == 10){
        btnResults.classList.remove("d-none")
        playRound.classList.add("d-none")
        gameOver.classList.remove("d-none")
    }
    console.log(bowling.players)
})

//Nuovo Giocatore
let inputNewPlayer = document.querySelector("#inputNewPlayer")
let btnNewPlayer = document.querySelector("#btnNewPlayer")

btnNewPlayer.addEventListener( "click", ()=>{
    bowling.setNewPlayer(inputNewPlayer.value)
    bowling.createTable();
    inputNewPlayer.value = ""
})


//Classifica
let modalWinner = document.querySelector("#modalWinner")
let modalBody = document.querySelector("#modalBody")
let btnResults = document.querySelector("#btnResults")


btnResults.addEventListener("click", ()=>{
    modalWinner.innerHTML = ""
    modalBody.innerHTML = ""
    bowling.setWinner2();
    bowling.setModalResults();
})




// Reset Partita
let btnResetGame = document.querySelector("#btnResetGame")

btnResetGame.addEventListener("click", ()=>{
    bowling.resetGame();
    bowling.createTable();
    btnNewPlayer.classList.remove("d-none");
    btnStart.classList.remove("d-none");
    playRound.classList.add("d-none");
    btnResults.classList.add("d-none");
    btnRestartGame.classList.add("d-none");
    gameOver.classList.add("d-none")
})

// Riavvia Partita
let btnRestartGame = document.querySelector("#btnRestartGame")

btnRestartGame.addEventListener("click", ()=>{
    bowling.restartGame();
    bowling.createTable();
    btnStart.classList.remove("d-none");
    btnResults.classList.add("d-none");
    gameOver.classList.add("d-none")
})







