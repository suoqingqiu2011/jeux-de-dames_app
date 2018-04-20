let $ = (selector) => document.querySelector(selector);
let append = (element, tab) => element.appendChild(document.createElement(tab));

let tab = document.querySelector('#main tbody');


async function loadUsers() {
  let res = await fetch('/sp/userlist');
  let users = await res.json();
  tab.innerHTML = '';
  for (let u of users) {
    let row = append(tab, 'tr');
    append(tab, 'td').textContent = u.login;
    append(tab, 'td').textContent = u.name;
    let color =append(append(tab, 'td'), 'div');
    color.className = 'color';
    color.style.backgroundColor = u.color1;
  }
}

loadUsers();