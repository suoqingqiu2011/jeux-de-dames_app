let main = document.querySelector('#main');

async function loadUsers() {
  let res = await fetch('/sp/userlist');
  let users = await res.json();
  
}