# Dames

Nous avons fait ce jeux en fonction du **TD sur Puissance 4** (voir le lien <http://defeo.lu/aws/tutorials/tutorial2>).  
Des pions sont distribués selon des différents valuations de `tableau[row][column]`. 
Pour tout l'affichage de performance, nous récupérons des valeurs de `td.dataset.row` et `td.dataset.column` et implémenter ce que des pions vont réaliser des fonctionalités dans cette position.  
Nous avons donc supposé des valuations comme le pion blanc normal noté par **1**, le pion noir normal noté par **2**. Ce sont aussi des identités des 2 joueurs (`turn = 1 ou 2 , noté = 3-turn`). 
S'ils sont choisi, des pions normaux sont notés par **3** . Quand des joueurs ont vu des pions dames, les pions dames noirs sont noté par **5** et les blancs sont en **4** (`noté = 6-turn`).
Si des pions dames sont choisis, ils sont changé par **6**.  
  
**Rappels de fonctions de jeux dames**
------------
- `set(row,column,player)`: juste pour tester s'il donne un bon note sur `tableau[row][column]`
- `render()`: créer un damier du jeux et contenir toutes les structures de performances , mais il ne fait que l'affichage statique. Si on veut voir des actions, ils sont être implémentés dans `play(row,column)`
- `pre_mange_position(i,j,row,column,tdd,turn)`: prévoir des positions quand le pion va manger 
- `play(row,column)`: activiter des events de `addEventListener` et réaliser toutes les actions des pions comme déplacer et manger.
- `deplacement(row,column,player)`: le pion normal fait l'action de déplacement
- `enlever_deplacement(row,column,player)`: après bouger le pions, enlever ce pion dans la ancienne position  
- `mangerPion(row,column,player,alerttxt)`: le pion normal fait l'action de manger
- `enleverPion(row,column,player)`: après manger le pions d'adversaire, enlever ce pion dans la ancienne position  
- `mangerPionSuper(row,column,superRow,superCol,player,alerttxt)`: le pion dames fait l'action de manger
- `reset()`: recommencer à jouer et réinitialiser toutes les valuations
- `removeEle()`: enlever des structures répetés
- `win(player)`: vérifier s'il y a encore des pions. s'il ne reste plus, l'adversaire va gagner.

**Attention**  
------------
Pour vérifier l'état sur le `row` et le `column`, si on va aussi voir des états de ses voisins, `row+(-)i` et `column+(-)i` doivent bien respecter le limite de nombre des lignes et colonnes (`<=9`).

# User accounts

Nous avons fait la partie d'affichage des userlist selon les références du lien <http://defeo.lu/aws/tutorials/accounts>.

# AJAX , Websocket

Nous avons fait la partie de connections des users selon les références du lien  <http://defeo.lu/aws/tutorials/websockets>.