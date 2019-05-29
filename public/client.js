
import Gamedames from './game2.js'

var damesgame = new Gamedames('player1',1) ;

const mainDiv = document.getElementById('main');

//definir un node ajoute
const append = (node, type) => node.appendChild(document.createElement(type));


// Creer tab de users a partir de base de donnee
  const createUserList = (users) => {
  
  const table = document.createElement('table');
  table.id="tab2";
  const row = append(table, 'tr');
  const header = append(row, 'th');
  header.textContent = 'username';
  append(row, 'th');
  
  for (var u of users) {
    const row = append(table, 'tr');
    append(row, 'td').textContent = u.login;
   
    const button = append(append(row, 'th'), 'button');
    button.textContent = 'Challenge';
    button.className = 'challenge';
    button.dataset.username = u.login;
    
     if (u.state != 'AVAILABLE' || u.login == localStorage.getItem('username')){
      button.disabled = true;
     }
  }
  
  return table;
}
  
// Creer un iframe pour implanter un damier
  const createDamier = () => {
  
  const iframe = document.createElement('iframe');
  iframe.id="ifram";
  iframe.src="/jeux";
  iframe.width="100%";
  iframe.height="800px";
  iframe.style="margin-top: 20px;";
  
  return iframe;
}

// voir si il est dans jeux ou disponible
let status = 'available';

// envoie des données a travers websocket poour un format json
const send = (ws, data) => ws.send(JSON.stringify(data));

const ws = new WebSocket('wss://' + window.location.host)

ws.addEventListener('open', function(e) {  
  send(ws, { 
    type: 'new_connection', 
    username: localStorage.getItem("username"),
  });
 localStorage.removeItem('username');
  
  ws.addEventListener('message', function(e) {  
    const parsed = JSON.parse(e.data);
    console.log(parsed);  
   console.log('parsed.lastchessBoard: '+parsed.lastchessBoard+' parsed.row :'+parsed.row+' parsed.column: '+parsed.column);
    switch (parsed.type) {
      //afficher la list de users
      case 'userlist':    //alert("i am ");
        if (status == 'available') {  
          //mainDiv.document.write('');
          if(mainDiv!=null){
            mainDiv.innerHTML='';
            mainDiv.appendChild(createUserList(parsed.userlist));
          }
          
        }
        break;
      // vouloir combattre au autre
      case 'challenge':
        status = 'playing' ;
       // mainDiv.document.write('');
        if(mainDiv!=null){
          mainDiv.innerHTML='';
          append(mainDiv, 'div').textContent = `Vous êtes en train de jouer avec ' ${parsed.username} '.`;
          const button = append(mainDiv, 'button');
          button.textContent = 'Quitter cette salle du jeux.';
          button.className = 'quit';

          mainDiv.appendChild(createDamier());  
          
        }
        
        break;
      //ne pouvoir pas choisir moi_meme
      case 'challenge_rejected':
        alert("L'invite n'est pas validé. Car c'est vou-même.  ");
        break;
 ///////////////////////////////////////////////////////////////       
      //passer tous les positions a partir de fichier JSON
      case "chessBoard":          
        
          //damesgame.tableau = parsed.lastchessBoard;
          damesgame.playerID = parsed.classname;
          //damesgame.turn = parsed.myturn;
          damesgame.pieceRow= parsed.row;
          damesgame.pieceColumn= parsed.column;
         // damesgame.render();
        
          break;
///////////////////////////////////////////////////////////////////
      // quitter le jeux
      case 'quit':
        status = 'available';
        alert("Vous êtes quitté(e) le jeux.");
        break;
      case 'error':
        console.error(parsed.message);
        break;
      default:
        console.error('Mauvais messages', parsed);
    }
  });
  
  var tmp_usename=null;
  // cliquer le button "Challenge" ,passer JSON au serveur
  if(mainDiv!=null){
    mainDiv.addEventListener('click', (e) => { 
      if (e.target.className == 'challenge') {    
        tmp_usename=e.target.dataset.username;
        send(ws, {
          type: 'challenge',
          username: e.target.dataset.username,
        });
      } else if (e.target.className == 'quit') {
        alert("Vous sera perdu.");
        send(ws, { type: 'quit' });
      }
    });
  }
   // poser des pions sur le damier ,passer JSON au serveur
  const damesDiv = document.querySelector('#plateau');   
  if(damesDiv!=null){     
    damesDiv.addEventListener('click', (e) => { 
      if (e.target.className == 'player1'||e.target.className == 'player2') {   //alert('e.target.className: '+e.target.className+' e.target.dataset.lastchessBoard: '+e.target.dataset.lastchessBoard);
               console.log('tmp_usename: '+tmp_usename);                                        //alert('e.target.dataset.row: '+e.target.dataset.row+' e.target.dataset.column: '+e.target.dataset.column);
        send(ws, {
          type: 'chessBoard',
          //myturn:  e.target.dataset.myturn,
          username: tmp_usename,
          classname: e.target.className,
          lastchessBoard: e.target.dataset.lastchessBoard,
          row: e.target.dataset.row,
          column: e.target.dataset.column,
          
        });
      } else {
        alert("Vous doivez cliquer sur le damier."); 
      }
    });
  }
  
});
