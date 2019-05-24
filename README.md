# Dames

Nous avons fait ce jeux en fonction du **TD sur Puissance 4** (voir le lien <http://defeo.lu/aws/tutorials/tutorial2>).  
Des pions sont distribués selon des différents valuations de `tableau[row][column]`. 
Pour tout l'affichage de performance, nous récupérons des valeurs de 'td.dataset.row' et 'td.dataset.column' et implémenter ce que des pions vont réaliser des fonctionalités dans cette position.  
Nous avons donc supposé des valuations comme le pion blanc normal noté par **1**, le pion noir normal noté par **2**. Ce sont aussi des identités des 2 joueurs (`turn = 1 ou 2 , noté = 3-turn`). 
S'ils sont choisi, des pions normaux sont notés par **3** . Quand des joueurs ont vu des pions dames, les pions dames noirs sont noté par **5** et les blancs sont en **4** (`noté = 6-turn`).
Si des pions dames sont choisis, ils sont changé par **6**.  
  
- `render()`: créer un damier du jeux et contenir toutes les structures de performances
- `pre_mange_position(i,j,row,column,tdd,turn)`: prévoir des positions quand le pion va manger 
- `play(row,column)`: activiter des events de `addEventListener` et réaliser toutes les actions des pions comme les déplacements et les manges.
- `deplacement(row,column,player)`: faire l'action de déplacement
- `enlever_deplacement(row,column,player)`: après la déplacement 
- `pre_mange_position(i,j,row,column,tdd,turn)`: prévoir des positions quand le pion va manger 
- `pre_mange_position(i,j,row,column,tdd,turn)`: prévoir des positions quand le pion va manger 


# User accounts

Nous avons fait la partie d'affichage des userlist selon les références du lien <http://defeo.lu/aws/tutorials/accounts>.

# AJAX , Websocket

Nous avons fait la partie de connections des users selon les références du lien  <http://defeo.lu/aws/tutorials/websockets>.