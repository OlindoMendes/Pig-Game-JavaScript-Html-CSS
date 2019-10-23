/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, storeDice, lastDado;
startGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
    //1. Random Number 
    dice = Math.floor(Math.random() * 6) + 1;//Generate a random number from 0 to 6 (+ 1 is to generate from 1)
    dado = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    var dadoDom = document.querySelector('.dado');
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    dadoDom.style.display = 'block';
    dadoDom.src = 'dice-' + dado + '.png';

    //3. Update the round score If the rolled number was not 1
    if((dice === 6 && storeDice ===6) || (dado ===6 && lastDado ===6)){//Challenge: Player looses his all score when hit two six in a row
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        nextPlayer();
    }else if(dice !== 1 && dado !== 1){
        //Add score
        roundScore += dice + dado;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else {
        //Next Player
        nextPlayer();
    }

     storeDice = dice;
    }
   

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
            //Add current score to Global score
            scores[activePlayer] += roundScore;
            //Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            var input = document.querySelector('.final-score').value;
            //Check if you won the game
     if(scores[activePlayer] >= input){
            document.querySelector('#name-' +activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dado').style.display = 'none';
            gamePlaying = false;
    }else{
        //next Player
        nextPlayer();
    }
    

    }
   
});

document.querySelector('.btn-new').addEventListener('click', startGame);

function startGame(){
    scores =[0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dado').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner'); //this change the formatation "winner" back to regular player when start a new game
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');//This remove the red dot to the current player 
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');//This add the red dot to the current player when start a new game 
}

function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';


        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dado').style.display = 'none';

};