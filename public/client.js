const mainDiv = document.getElementById('main');
const append = (node, type) => node.appendChild(document.createElement(type));

// Create table from user list
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
     if (u.state != 'AVAILABLE' || u.login == localStorage.username)
      button.disabled = true;
  }
  
  return table
}

// A status to know if we are playing or not
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
    switch (parsed.type) {
      case 'userlist':    //alert("i am ");
        if (status == 'available') { 
          mainDiv.innerHTML = '';
          mainDiv.appendChild(createUserList(parsed.userlist));
        }
        break;
      case 'challenge':
        status = 'playing'
        mainDiv.innerHTML = '';
        append(mainDiv, 'div').textContent = `You are playing with ${parsed.username}`;
        const button = append(mainDiv, 'button');
        button.textContent = 'Quit';
        button.className = 'quit';
        break;
      case 'challenge_rejected':
        alert("The invite was rejected. Because it's yourself. ");
        break;
      case 'quit':
        status = 'available';
        break;
      case 'error':
        console.error(parsed.message);
        break;
      default:
        console.error('Bad message', parsed);
    }
  });
  
  // We attach one global event listener on the div to capture 
  // clicks on all "Challenge" buttons
  mainDiv.addEventListener('click', (e) => {
    if (e.target.className == 'challenge') {
      send(ws, {
        type: 'challenge',
        username: e.target.dataset.username,
      });
    } else if (e.target.className == 'quit') {
      send(ws, { type: 'quit' });
    }
  });
});
