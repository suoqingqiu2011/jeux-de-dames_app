let $ = (selector) => document.querySelector(selector);
let append = (element, tab) => element.appendChild(document.createElement(tab));

let tab = document.querySelector('#main tbody');


async function loadUsers() {
  let res = await fetch('/sp/userlist');
  let users = await res.json();

  nunjucks.configure('views', { autoescape: true });
  let doc = nunjucks.render('userlist.html', { foo: 'bar' });
  document.body.innerHTML = doc;

  /*
  tab.innerHTML = '';
  for (let u of users) {
    let row = append(tab, 'tr');
    append(row, 'td').textContent = u.login;
    append(row, 'td').textContent = u.name;
    let color =append(append(row, 'td'), 'div');
    color.className = 'color';
    color.style.backgroundColor = u.color1;
  }*/
}

/loadUsers();

