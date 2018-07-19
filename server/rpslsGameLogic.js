// Class declaration used with a constructor
class rpslsGame {

  constructor(p1, p2) {
    this.players = [p1, p2];
    this.turns = [];

    this.sendToPlayers('Your opponent is ready.')
    this.sendToPlayers('Let the games begin! Select your weapon of choice.');

    this.players.forEach((player, index) => {
      player.on('turn', (turn) => {
        this.onTurn(index, turn);
      });
    });
  }

  // Method to send messages to a single player
  sendToPlayer(playerIndex, msg) {
    this.players[playerIndex].emit('message', msg);
  }

  // Method to send messages to both players
  sendToPlayers(msg) {
    this.players.forEach((player) => {
      player.emit('message', msg);
    });
  }

  // Method to inform player of choice
  onTurn(playerIndex, turn) {
    this.turns[playerIndex] = turn;
    this.sendToPlayer(playerIndex, `You selected ${turn}.`);

    this.checkRound();
  }

  // Method to see if the round is over
  checkRound() {
    var turns = this.turns;

    if (turns[0] && turns[1]) {
      this.getGameResult();

      this.turns = [];
      this.sendToPlayers('Select a weapon to play again!');
    }
  }

  getGameResult() {

    switch (this.turns[0]) {
      case 'rock':
        switch (this.turns[1]) {
          case 'rock':
            this.draw();            
            break;
          case 'paper':
            this.sendToPlayers("Paper covers Rock!");
            this.p2Win();
            break;
          case 'scissors':
            this.sendToPlayers("Rock crushes Scissors!");
            this.p1Win();
            break;
          case 'lizard':
            this.sendToPlayers("Rock crushes Lizard!");
            this.p1Win();
            break;
          case 'spock':
            this.sendToPlayers("Spock vaporizes Rock!");
            this.p2Win();
          break;
          default:
            console.log('unknown error');
        }
      break;
      case 'paper':
        switch (this.turns[1]) {
          case 'rock':
            this.sendToPlayers("Paper covers Rock!");
            this.p1Win();           
            break;
          case 'paper':
            this.draw();            
            break;
          case 'scissors':
            this.sendToPlayers("Scissors cut Paper!");
            this.p2Win();
            break;
          case 'lizard':
            this.sendToPlayers("Lizard eats Paper!");
            this.p2Win();
            break;
          case 'spock':
            this.sendToPlayers("Paper disproves Spock!");
            this.p1Win();
          default:
            console.log('unknown error');
        }
      break;
      case 'scissors':
        switch (this.turns[1]) {
          case 'rock':
            this.sendToPlayers("Rock crushes Scissors!");
            this.p2Win();           
            break;
          case 'paper':
            this.sendToPlayers("Scissors cut Paper!");
            this.p1Win();
            break;
          case 'scissors':
            this.draw();            
            break;
          case 'lizard':
            this.sendToPlayers("Scissors decapitates Lizard!");
            this.p1Win();
            break;
          case 'spock':
            this.sendToPlayers("Spock smashes Scissors!");
            this.p2Win();
          default:
            console.log('unknown error');
        }
      break;
      case 'lizard':
        switch (this.turns[1]) {
          case 'rock':
            this.sendToPlayers("Rock crushes Lizard!");
            this.p2Win();           
            break;
          case 'paper':
            this.sendToPlayers("Lizard eats Paper!");
            this.p1Win();
            break;
          case 'scissors':
            this.sendToPlayers("Scissors decapitates Lizard!");
            this.p2Win();            
            break;
          case 'lizard':
            this.draw();            
            break;
          case 'spock':
            this.sendToPlayers("Lizard poisons Spock!");
            this.p1Win();
          default:
            console.log('unknown error');
        }
      break;
      case 'spock':
        switch (this.turns[1]) {
          case 'rock':
            this.sendToPlayers("Spock vaporizes Rock!");
            this.p1Win();           
            break;
          case 'paper':
            this.sendToPlayers("Paper disproves Spock!");
            this.p2Win();
            break;
          case 'scissors':
            this.sendToPlayers("Spock smashes Scissors!");
            this.p1Win();            
            break;
          case 'lizard':
            this.sendToPlayers("Lizard poisons Spock!");
            this.p2Win();
            break;
          case 'spock':
            this.draw();
            console.log('unknown error');
        }
      break;
    }
  }
  
  p1Win() {
    this.sendWinMessage(this.players[0], this.players[1]);
  }

  p2Win() {
    this.sendWinMessage(this.players[1], this.players[0]);
  }

  draw() {
    this.tied(this.players[0], this.players[1]);
  }

  tied(p1, p2) {
    p1.emit('message', `<hr><h4 style="text-align: center"> It's a draw.</h4><hr>`)
    p2.emit('message', `<hr><h4 style="text-align: center"> It's a draw.</h4><hr>`)
    p1.emit('result', 'tie');
    p2.emit('result', 'tie');
  }

  sendWinMessage(winner, loser) {
    winner.emit('message', `<hr><h4 style="text-align: center">You <i><b>WON!</b></i></h4><hr>`);
    winner.emit('result', 'win');
    loser.emit('message', `<hr><h4 style="text-align: center">You <i><b>lost...</b></i></h4><hr>`);
    loser.emit('result', 'loss');
  }
}

module.exports = rpslsGame;