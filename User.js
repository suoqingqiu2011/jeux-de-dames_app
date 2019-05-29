class User {
  
  constructor(login, wsconn) {
    this.login = login;
    this.wsconn = wsconn;
    this.state = 'AVAILABLE';
    
  }
  
  serialize() {
    return {
      login: this.login,
      state: this.state,
    }
  }
  invite(opponent) {
    if (this !== opponent
        && this.state == 'AVAILABLE'
        && opponent.state == 'AVAILABLE') {
      this.state = opponent.state = 'PLAYING';
      return this.game = opponent.game = new Game(opponent, this);
    } else {
      return null;
    }
  }

  quit() {
    if (this.state == 'PLAYING' && this.game) {
      return this.game.quit();
    } else {
      return false;
    }
  }
  
  
}

class Game {
  constructor(p1, p2) {
    this.player1 = p1;
    this.player2 = p2;
  }
  
  //////////////////////////////////////////////////  
  
/*  playGmes(){    
    this.wsconn.on('data', (row,column) => {
        this.play(this.login,row,column,this.login.turn);
    });
  }
  
  play(player,row,column,turn){
    
    this.player1.turn = ~~(Math.random() * 2) === 0 ? 1 : 2;
    this.player2.turn = this.player1.turn === 1 ? 2 : 1;
  }*/
  
////////////////////////////////////////////////////////  
  
  quit() {
    this.player2.game = this.player1.game = null;
    this.player2.state = this.player1.state = 'AVAILABLE';
    return this;
  }
  
  
}

exports.User = User;
exports.Game = Game;