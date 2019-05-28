export default class Gamedames{
  
  constructor(playerId, turn) {
        this.playerId = playerId;
        this.turn = turn;
       
        this.resetData(); 
        //poser des pions sur le damier
        this.tabb = document.querySelector('#vide');
        if(this.tabb!=null){    
            this.tabb.addEventListener('click', (event) => this.handle_click(event));
        }
        this.render();
  }

  resetData() {
     this.tableau =[];
     this.pieceRow = null;
     this.pieceColumn = null;
     this.tmp_row_col = 1;
     this.nb_step = 0;
     this.nb_black = 20;
     this.nb_white = 20;
     this.score_black = 0;
     this.score_white = 0;
     this.tmp_row=0;
     this.tmp_col=0;
     this.flag_choosen = 0;
     this.nb_continu_eating = 0;
     this.score_black = 0;
     this.score_white = 0;
    this.init_tab(); 
  }
  
    
//definition du tableau a 10 columns
  init_tab(){
    this.tableau = Array(10);
    for (var i = 0 ; i < this.tableau.length; i++) {
        this.tableau[i] = Array(10);
        this.tableau[i].fill(0);  
    }
  }
  
  set(row,column,player){
    this.tableau[row][column]=player;  
    //console.log(set(row,column,player));
  }


//affichage du damier qui contiens des positions des pions , prevois de deplacer et prevois de manger
render(){
  
  var divt = document.querySelector('#resultat');
  var usertext = document.createElement('ul');
  usertext.id='usertext';
  for(var i = 0; i < 2 ;i++){
    var lii = document.createElement('li');
    lii.innerHTML="player"+(i+1);
    var img = document.createElement('img');
    img.width="33px";
    img.height="33px";
    if(i==0){
      img.src="https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_noir.png?1558689060582";
    }else if(i==1){
      img.src="https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_blanc.png?1558689066452";
    }
    lii.appendChild(img);
    if(i==0){
       lii.innerHTML+="Score : " +this.score_black;
    }else if(i==1){
       lii.innerHTML+="Score : " +this.score_white;      
    }
    if(usertext!=null){
    usertext.appendChild(lii);
    }
  }
  
  var tour = document.createElement('div');
  tour.id ='tour'; 
  var userpion = document.createElement('img');
  userpion.id='userpion';
  tour.innerHTML=" Turn : ";
  
  if(this.turn==1){
    userpion.src="https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_noir.png?1558689060582";  
  }else if(this.turn==2){
    userpion.src="https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_blanc.png?1558689066452";  
  }
  if(tour!=null){
    tour.appendChild(userpion);
  }
  if(divt!=null){
    divt.appendChild(usertext);
    divt.appendChild(tour);
  }
  
  
  
  
  var divv = document.querySelector('#vide');

  var tab = document.createElement('table');
  tab.id = "plateau";
  
  //////////////////////////////////////////////////
  tab.dataset.username = this.playerId;
  
  /////////////////////////////////////////////////////////
  tab.style.height = '555px';
  tab.style.width ='555px';
  tab.style.margin='3px auto';
  tab.Style = 'position:absolute;';
   
    for(var i = 0; i < this.tableau.length;i++){
        var trr = document.createElement('tr');
        trr.style.height = '55px';
        trr.style.width ='545px';
        trr.style.margin='3px auto';
        for(var j = 0; j < this.tableau[i].length;j++){
          var tdd = document.createElement('td');  
          
          if((i+j)%2==1){
            if (this.tableau[i][j]!=3&&this.tableau[i][j]!=6){ 
              if(this.nb_step==0){
                if(i>=6){
                    tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_noir.png?1558689060582') repeat scroll center; -webkit-background-size: cover;";
                    tdd.style.borderRadius = "39px";  
                    this.tableau[i][j]=1;
                }
                if(i<=3){
                    tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_blanc.png?1558689066452') repeat scroll center; -webkit-background-size: cover; ";
                    tdd.style.borderRadius = "39px"; 
                    this.tableau[i][j]=2;
                }
              }
            }
          }     
        
          tdd.style.height = '53px';
          tdd.style.width ='53px';          
       
          tdd.style.border = '3px solid rgb(205,141,80)';
          
          trr.appendChild(tdd);
          tdd.dataset.row = i;
          tdd.dataset.column = j;
          
          if (this.tableau[i][j]!=3&&this.tableau[i][j]!=6){
            //console.log("here");
            if(this.tableau[i][j]==1){
              tdd.className ="player1";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_noir.png?1558689060582') repeat  scroll center;  -webkit-background-size: cover; ";
              tdd.style.borderRadius = "39px";

            }else if (this.tableau[i][j]==2){
              tdd.className ="player2";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_blanc.png?1558689066452') repeat  scroll center;  -webkit-background-size: cover; ";
              tdd.style.borderRadius = "39px";

            }else if(this.tableau[i][j]==4){ 
            tdd.className ="player2";
            tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fsuper_pion_blanc.png?1558689066906') repeat scroll center; -webkit-background-size: cover;";
            tdd.style.borderRadius = "39px";
       
            }else if(this.tableau[i][j]==5){
            tdd.className ="player1";
            tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fsuper_pion_noir.png?1558689066877') repeat scroll center; -webkit-background-size: cover;";    
            tdd.style.borderRadius = "39px";
     
            } 
            
            //l'animation sur le pion exact
            if(this.tableau[i][j]==0){
              var row = tdd.dataset.row;
              var column = tdd.dataset.column;

                 if(this.turn==1){
                   // les possibilités pour manger et se deplacer dans le dames
                   if(((row<8&&column<8)?((this.tableau[i+1][j+1]==2||this.tableau[i+1][j+1]==4)&&this.tableau[i+2][j+2]==3):0)||((row<8&&column>1)?((this.tableau[i+1][j-1]==2||this.tableau[i+1][j-1]==4)&&this.tableau[i+2][j-2]==3):0)||((row>1&&column<8)?((this.tableau[i-1][j+1]==2||this.tableau[i-1][j+1]==4)&&this.tableau[i-2][j+2]==3):0)||((row>1&&column>1)?((this.tableau[i-1][j-1]==2||this.tableau[i-1][j-1]==4)&&this.tableau[i-2][j-2]==3):0)){  
                         this.pre_mange_position(i,j,row,column,tdd,1); console.log(' 781');
                   }else if(((row<9&&column<9)?(this.tableau[i+1][j+1]==3):0)||((row<9&&column>0)?(this.tableau[i+1][j-1]==3):0)){ // lorsque j'utilise un pion il change de couleur dans le cas 3  
                     console.log('7811');
                      console.log('row '+row+'column '+column);
                       tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";          
                      
                   }
                 }
              
              
                if(this.turn==2){
                   // les possibilités pour manger et se deplacer dans le dames
                  if(((row<8&&column<8)?((this.tableau[i+1][j+1]==1||this.tableau[i+1][j+1]==5)&&this.tableau[i+2][j+2]==3):0)||((row<8&&column>1)?((this.tableau[i+1][j-1]==1||this.tableau[i+1][j-1]==5)&&this.tableau[i+2][j-2]==3):0)||((row>1&&column<8)?((this.tableau[i-1][j+1]==1||this.tableau[i-1][j+1]==5)&&this.tableau[i-2][j+2]==3):0)||((row>1&&column>1)?((this.tableau[i-1][j-1]==1||this.tableau[i-1][j-1]==5)&&this.tableau[i-2][j-2]==3):0)){  
                      this.pre_mange_position(i,j,row,column,tdd,2); 
                    
                  }else if(((row>0&&column<9)?(this.tableau[i-1][j+1]==3):0)||((row>0&&column>0)?(this.tableau[i-1][j-1]==3):0)){  // lorsque j'utilise un pion il change de couleur dans le cas 3 
                    console.log('7831');
                    
                     tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                   
                  }
                }
                
                for(var p = 1; p <= 9;p++){              
                   if((this.tableau[i][j]==0&&((i+j)%2==1))&&i+p<=9&&j+p<=9){
                    //prevoir la position des pions dames sur la diagonale avant gauche apres manger
                     if(this.tableau[i+p][j+p]!=0){
                       if(this.tableau[i+p][j+p]!=6){
                         for(var q = 1; q <= 9;q++){
                           if((i+p+q<=9&&j+p+q<=9)?this.tableau[i+p+q][j+p+q]==6:0){  
                             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                           }else if((i+p+q<=9&&j+p+q<=9)?this.tableau[i+p+q][j+p+q]!=6:0){
                                break;
                           }
                         }
                         // prevoir la position de deplacement de pions dames sur la diagonale avant gauche
                       }else if(this.tableau[i+p][j+p]==6){   
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                       }else{
                         break;
                       }
                      
                     }
                   }
                }
              for(var p = 1; p <= 9;p++){ 
                   if((this.tableau[i][j]==0&&((i+j)%2==1))&&i+p<=9&&j-p>=0){
                    //prevoir la position des pions dames sur la diagonale avant droite apres manger
                     if(this.tableau[i+p][j-p]!=0){
                       if(this.tableau[i+p][j-p]!=6){
                         for(var q = 1; q <= 9;q++){
                           if((i+p+q<=9&&j-p-q>=0)?this.tableau[i+p+q][j-p-q]==6:0){  
                             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                           }else if((i+p+q<=9&&j-p-q>=0)?this.tableau[i+p+q][j-p-q]!=6:0){
                                break;
                           }
                         }
                         // prevoir la position de deplacement de pions dames sur la diagonale avant droite
                       }else if(this.tableau[i+p][j-p]==6){  
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";  
                       }else{
                         break;
                       }
                       
                     }
                   } 
              }
              for(var p = 1; p <= 9;p++){ 
                   if((this.tableau[i][j]==0&&((i+j)%2==1))&&i-p>=0&&j+p<=9){
                    //prevoir la position des pions dames sur la diagonale arriere gauche apres manger
                     if(this.tableau[i-p][j+p]!=0){
                       if(this.tableau[i-p][j+p]!=6){
                         for(var q = 1; q <= 9;q++){
                           if((i-p-q>=0&&j+p+q<=9)?this.tableau[i-p-q][j+p+q]==6:0){   
                             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                           }else if((i-p-q>=0&&j+p+q<=9)?this.tableau[i-p-q][j+p+q]!=6:0){
                                break;
                           }
                         }
                         // prevoir la position de deplacement de pions dames sur la diagonale arriere gauche
                       }else if(this.tableau[i-p][j+p]==6){  
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";  
                       }else{
                         break;
                       }
                      
                     }
                   }
              }
              for(var p = 1; p <= 9;p++){ 
                   if((this.tableau[i][j]==0&&((i+j)%2==1))&&i-p>=0&&j-p>=0){
                     //prevoir la position des pions dames sur la diagonale arriere droite apres manger
                     if(this.tableau[i-p][j-p]!=0){
                       if(this.tableau[i-p][j-p]!=6){
                         for(var q = 1; q <= 9;q++){
                           if((i-p-q>=0&&j-p-q>=0)?this.tableau[i-p-q][j-p-q]==6:0){   
                             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                           }else if((i-p-q>=0&&j-p-q>=0)?this.tableau[i-p-q][j-p-q]!=6:0){
                                break;
                           }
                         }
                         // prevoir la position de deplacement de pions dames sur la diagonale arriere droite
                       }else if(this.tableau[i-p][j-p]==6){ 
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";  
                       }else{
                         break;
                       }
                      
                     }
                   }
              }
            
            }
            //choisir le pions normal pour commencer des fonctionalites
          }else if(this.tableau[i][j]==3){
            console.log("here tmp_row_col:"+this.tmp_row_col);
            tdd.className ="choosen";   
            
            if(this.turn==1){
              tdd.className ="player1";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_darkred.png?1558689066451') repeat scroll center; -webkit-background-size: cover;";
            }else if(this.turn==2){
              tdd.className ="player2";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_gold.png?1558689066971') repeat scroll center; -webkit-background-size: cover;";
            }
              
            tdd.style.borderRadius = "35px";
            tdd.style.border= "3px solid blue";
           //choisir le pions dames pour commencer des fonctionalites
           }else if(this.tableau[i][j]==6){
            //console.log("here tmp_row_col:"+tmp_row_col);
            tdd.className ="choosen_super";   
            
            if(this.turn==1){
              tdd.className ="player1";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fsuper_pion_darkred.png?1558689066517') repeat scroll center; -webkit-background-size: cover;";
            }else if(this.turn==2){
              tdd.className ="player2";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fsuper_pion_gold.png?1558689066450') repeat scroll center; -webkit-background-size: cover;";
            }
            
            tdd.style.borderRadius = "35px";
            tdd.style.border= "3px solid blue";
     
          }    
      } 
      tab.appendChild(trr);
    }
  if(divv!=null){
  divv.appendChild(tab);
  }

  
  var but = document.createElement('button');
  but.id = "bt";
  but.innerHTML="reset";
  if(divv!=null){
    divv.appendChild(but);
  }
  but.style.height = '30px';
  but.style.width ='80px';
  but.style.margin = '5px';
  but.addEventListener('click', function(e) { this.reset();});
  
  var alarmetext = document.querySelector('#alarmetext');
  
  if(divv!=null){
    divv.appendChild(alarmetext);
  }
   //verificaton de la position du pion dans le tableau et etre sure 
  /*for(var i = 0; i < tableau.length;i++){
        for(var j = 0; j < tableau[i].length;j++){
           console.log('tableau['+i+']['+j+']='+tableau[i][j]);
        }
   }*/
   console.log('********************');
}
//poser des pions sur le damier par addEventListener
handle_click(event){ 
      var row = event.target.dataset.row;
      var column = event.target.dataset.column;
  
      this.pieceRow = row;
      this.pieceColumn = column;
  
     /*this.dataset.myturn = this.turn;  
      this.dataset.chessBoard = this.tableau[row][column];*/
  
      if (row&&column) { 

       this.play(parseInt(row),parseInt(column));
        
       this.removeEle();
       this.render();
      }else{
        var color="";
           if(this.turn==1){
             color="Black";
           }else{
             color="White";
           }
        alert("please '"+color+"' must chosse a piece for playing");
      } 
}
 //prevoir des positions apres manger des pions d'adversaires 
pre_mange_position(i,j,row,column,tdd,turn){
  
    if(row<8&&column<8){
        if((this.tableau[i+1][j+1]==(3-turn)||this.tableau[i+1][j+1]==(3+turn))&&this.tableau[i+2][j+2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7891');
         }
    }
    if(row<8&&column>1){
        if((this.tableau[i+1][j-1]==(3-turn)||this.tableau[i+1][j-1]==(3+turn))&&this.tableau[i+2][j-2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7892');
         }
    }
    if(row>1&&column<8){
        if((this.tableau[i-1][j+1]==(3-turn)||this.tableau[i-1][j+1]==(3+turn))&&this.tableau[i-2][j+2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7893');
         }
    }
    if(row>1&&column>1){
        if((this.tableau[i-1][j-1]==(3-turn)||this.tableau[i-1][j-1]==(3+turn))&&this.tableau[i-2][j-2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7894');
        }
    }
}

  //la fonction implemente l'event addeventListener pour realiser des fonctionalites de deplacer et manger
play(row,column){
  var alerttxt = document.querySelector('#alarmetext');
    if((row+column)%2==1){
      alerttxt.innerHTML="";
      if(this.tableau[row][column] != 0){  
        //permettre a changer des pions pour un utilisateur
         if(this.tableau[row][column] != 3 && this.tableau[row][column] != 6 && (this.tableau[row][column] == this.turn||this.tableau[row][column] == 6-this.turn)){ 
         
           console.log("nb_step:"+this.nb_step);
           if(this.flag_choosen==1){
             
             if(this.tableau[this.tmp_row][this.tmp_col]!=3 && this.tableau[this.tmp_row][this.tmp_col] != 6){
               this.flag_choosen=0;
             }
             
           
             if(this.tableau[row][column] == this.tmp_row_col||this.tableau[row][column] == 6-this.tmp_row_col){
               //console.log("same here");
               this.tableau[this.tmp_row][this.tmp_col] = this.tmp_row_col;
               this.tmp_row_col = this.tableau[row][column];
               this.flag_choosen=1; 
             }else if(this.tableau[row][column] != this.tmp_row_col&&this.tableau[row][column] != 6-this.tmp_row_col){
                //console.log("not same here");
               if(this.tableau[this.tmp_row][this.tmp_col]!=4&&this.tableau[this.tmp_row][this.tmp_col]!=5){
                 this.tableau[this.tmp_row][this.tmp_col]= 3-this.turn;   
               }else if(this.tableau[this.tmp_row][this.tmp_col]==4||this.tableau[this.tmp_row][this.tmp_col]==5){
                 this.tableau[this.tmp_row][this.tmp_col]= this.tmp_row_col;
               }
                this.tmp_row_col = this.tableau[row][column];               
                this.flag_choosen=1;  
             }
             
           }else if(this.flag_choosen==0){
             this.flag_choosen=1;               
           }
           
           this.tmp_row=row;
           this.tmp_col=column; 
           if((this.turn==1&&this.tmp_row_col==5)||(this.turn==2&&this.tmp_row_col==4)){
             this.tableau[row][column]=6;
           }else if((row!=0&&this.tmp_row_col!=5)||(row!=9&&this.tmp_row_col!=4)){
             this.tableau[row][column]=3;
           }
          
           
         }else{
           var color="";
           if(this.turn==1){
             color="Black";
           }else{
             color="White";
           }
           alerttxt.innerHTML= "It's the turn for your enemy '"+color+"' !";
           alert("It's the turn for your enemy '"+color+"' !");
         }
       
         //si la place est vide, on considere c'est dans quels cas(on deplace ou mange).
      }else if(this.tableau[row][column]==0){
          //des fonctionalites pour le pion noir normal
          if(this.tmp_row_col==1){ 
             if(((this.tmp_row==row-2)&&(this.tmp_col==column+2)&&(this.tableau[row-1][column+1]==3-this.turn||this.tableau[row-1][column+1]==3+this.turn))||((this.tmp_row==row-2)&&(this.tmp_col==column-2)&&(this.tableau[row-1][column-1]==3-this.turn||this.tableau[row-1][column-1]==3+this.turn))||((this.tmp_row==row+2)&&(this.tmp_col==column+2)&&(this.tableau[row+1][column+1]==3-this.turn||this.tableau[row+1][column+1]==3+this.turn))||((this.tmp_row==row+2)&&(this.tmp_col==column-2)&&(this.tableau[row+1][column-1]==3-this.turn||this.tableau[row+1][column-1]==3+this.turn)) )
               {  console.log("mange1");
                  this.mangerPion(row,column,this.turn,alerttxt);

               }else if((((this.tmp_row==row+1)&&(this.tmp_col==column+1))||((this.tmp_row==row+1)&&(this.tmp_col==column-1)))&&this.tableau[this.tmp_row][this.tmp_col]==3){  console.log("deplacement1");
                 this.deplacement(row,column,this.turn);
                 
               }else{
                 alerttxt.innerHTML= "Can't move the chess piece here.";
                 alert("Can't move the chess piece here.");
               }           
           }
           //des fonctionalites pour le pion blanc normal
           if(this.tmp_row_col==2){
             if(((this.tmp_row==row-2)&&(this.tmp_col==column+2)&&(this.tableau[row-1][column+1]==3-this.turn||this.tableau[row-1][column+1]==3+this.turn))||((this.tmp_row==row-2)&&(this.tmp_col==column-2)&&(this.tableau[row-1][column-1]==3-this.turn||this.tableau[row-1][column-1]==3+this.turn))||((this.tmp_row==row+2)&&(this.tmp_col==column+2)&&(this.tableau[row+1][column+1]==3-this.turn||this.tableau[row+1][column+1]==3+this.turn))||((this.tmp_row==row+2)&&(this.tmp_col==column-2)&&(this.tableau[row+1][column-1]==3-this.turn||this.tableau[row+1][column-1]==3+this.turn)) )
             {  console.log("mange2");
               this.mangerPion(row,column,this.turn,alerttxt);

             }else if((((this.tmp_row==row-1)&&(this.tmp_col==column+1))||((this.tmp_row==row-1)&&(this.tmp_col==column-1)))&&this.tableau[this.tmp_row][this.tmp_col]==3){  console.log("deplacement2");
               this.deplacement(row,column,this.turn);             

             }else{
               alerttxt.innerHTML= "Can't move the chess piece here.";
               alert("Can't move the chess piece here.");
             }   
          }
          //des fonctionalites pour le pion noir ou blanc dames
          if((this.tmp_row_col==4||this.tmp_row_col==5)&&this.tableau[this.tmp_row][this.tmp_col]==6){   
            
            if(((row-column)==(this.tmp_row-this.tmp_col)||(row+column)==(this.tmp_row+this.tmp_col))){
                
                 var proche_row=0;
                 var proche_col=0;  
                 for(var p = 0; p <= 9;p++){  
                   //sur le diagonal arriere droit
                   if(((this.tmp_row+p<=9&&this.tmp_col+p<=9)?((this.tableau[this.tmp_row+p][this.tmp_col+p]!=0&&this.tableau[this.tmp_row+p][this.tmp_col+p]!=6)||(this.tmp_row+p==9&&row<=9)||(this.tmp_col+p==9&&column<=9)):0)&&this.tmp_row<=row&&this.tmp_col<=column){ console.log('tmp_row+p '+(this.tmp_row+p)+' tmp_col+p '+(this.tmp_col+p));
                     
                        proche_row=this.tmp_row+p;
                        proche_col=this.tmp_col+p;   
                       
                        if(((proche_row>row&&proche_col>column&&this.tableau[this.tmp_row+p][this.tmp_col+p]!=6&&(this.tableau[this.tmp_row+p][this.tmp_col+p]==this.turn||this.tableau[this.tmp_row+p][this.tmp_col+p]==6-this.turn||((this.tableau[this.tmp_row+p][this.tmp_col+p]==3-this.turn||this.tableau[this.tmp_row+p][this.tmp_col+p]==3+this.turn)&&((this.tmp_row+p+1<=9&&this.tmp_col+p+1<=9)?this.tableau[this.tmp_row+p+1][this.tmp_col+p+1]!=0:1))))||(this.tmp_row+p==9&&row<=9)||(this.tmp_col+p==9&&column<=9))&&(this.tmp_row+p<=9||this.tmp_col+p<=9)&&(row-column)==(this.tmp_row-this.tmp_col)){
                           
                          this.deplacement(row,column,this.tmp_row_col); console.log('super 1');
                          break;
                          
                        }else if((this.tableau[proche_row][proche_col]==3-this.turn||this.tableau[proche_row][proche_col]==3+this.turn)){
                          for(var q = 1; q <= 9;q++){ 
                           if(proche_row<row&&proche_col<column&&((proche_row+q<=9&&proche_col+q<=9)?this.tableau[proche_row+q][proche_col+q]==0:false)){
                             
                             this.mangerPionSuper(row,column,proche_row,proche_col,this.tmp_row_col,alerttxt);  
                             
                             break;
                           }else{
                             alerttxt.innerHTML= "Can't move the chess piece here.";
                             alert("Can't move the chess piece here.");
                            break;
                          }           
                          }break;
                        }else{
                         alerttxt.innerHTML= "Can't move the chess piece here.";
                         alert("Can't move the chess piece here.");
                          break;
                        }  
                        break;
                     
                  }
                    //sur le diagonal arriere gauche
                   if(((this.tmp_row+p<=9&&this.tmp_col-p>=0)?((this.tableau[this.tmp_row+p][this.tmp_col-p]!=0&&this.tableau[this.tmp_row+p][this.tmp_col-p]!=6)||(this.tmp_row+p==9&&row<=9)||(this.tmp_col-p==0&&column>=0)):0)&&this.tmp_row<=row&&this.tmp_col>=column){ console.log('tmp_row+p '+(this.tmp_row+p)+' tmp_col-p '+(this.tmp_col-p));
                     
                        proche_row=this.tmp_row+p;
                        proche_col=this.tmp_col-p; console.log('super2 tableau['+(this.tmp_row+p)+']['+(this.tmp_col-p)+']: '+this.tableau[this.tmp_row+p][this.tmp_col-p]);
                       
                        if(((proche_row>row&&proche_col<column&&this.tableau[this.tmp_row+p][this.tmp_col-p]!=6&&(this.tableau[this.tmp_row+p][this.tmp_col-p]==this.turn||this.tableau[this.tmp_row+p][this.tmp_col-p]==6-this.turn||((this.tableau[this.tmp_row+p][this.tmp_col-p]==3-this.turn||this.tableau[this.tmp_row+p][this.tmp_col-p]==3+this.turn)&&((this.tmp_row+p+1<=9&&this.tmp_col-p-1>=0)?this.tableau[this.tmp_row+p+1][this.tmp_col-p-1]!=0:1))))||(this.tmp_row+p==9&&row<=9)||(this.tmp_col-p==0&&column>=0))&&(this.tmp_row+p<=9||this.tmp_col-p>=0)&&(row+column)==(this.tmp_row+this.tmp_col)){
                           this.deplacement(row,column,this.tmp_row_col);  console.log('super 2');
                           break;
                        }else if((this.tableau[proche_row][proche_col]==3-this.turn||this.tableau[proche_row][proche_col]==3+this.turn)){
                          for(var q = 1; q <= 9;q++){ 
                           if(proche_row<row&&proche_col>column&&((proche_row+q<=9&&proche_col-q>=0)?this.tableau[proche_row+q][proche_col-q]==0:false)){
                           
                             this.mangerPionSuper(row,column,proche_row,proche_col,this.tmp_row_col,alerttxt);  
                           
                             break;
                           }else{
                             alerttxt.innerHTML= "Can't move the chess piece here.";
                             alert("Can't move the chess piece here.");
                            break;
                          }              
                          }break;
                        }else{
                         alerttxt.innerHTML= "Can't move the chess piece here.";
                         alert("Can't move the chess piece here.");
                          break;
                       }     
                       break;
                   
                  }
                    //sur le diagonal devant droit        
                   if(((this.tmp_row-p>=0&&this.tmp_col+p<=9)?((this.tableau[this.tmp_row-p][this.tmp_col+p]!=0&&this.tableau[this.tmp_row-p][this.tmp_col+p]!=6)||(this.tmp_row-p==0&&row>=0)||(this.tmp_col+p==9&&column<=9)):0)&&this.tmp_row>=row&&this.tmp_col<=column){ console.log('tmp_row-p '+(this.tmp_row-p)+' tmp_col+p '+(this.tmp_col+p));
                      
                        proche_row=this.tmp_row-p;
                        proche_col=this.tmp_col+p; console.log('super3 tableau['+(this.tmp_row-p)+']['+(this.tmp_col+p)+']: '+this.tableau[this.tmp_row-p][this.tmp_col+p]);
                      
                       if(((proche_row<row&&proche_col>column&&this.tableau[this.tmp_row-p][this.tmp_col+p]!=6&&(this.tableau[this.tmp_row-p][this.tmp_col+p]==this.turn||this.tableau[this.tmp_row-p][this.tmp_col+p]==6-this.turn||((this.tableau[this.tmp_row-p][this.tmp_col+p]==3-this.turn||this.tableau[this.tmp_row-p][this.tmp_col+p]==3+this.turn)&&((this.tmp_row-p-1>=0&&this.tmp_col+p+1<=9)?this.tableau[this.tmp_row-p-1][this.tmp_col+p+1]!=0:1))))||(this.tmp_row-p==0&&row>=0)||(this.tmp_col+p==9&&column<=9))&&(this.tmp_row-p>=0||this.tmp_col+p<=9)&&(row+column)==(this.tmp_row+this.tmp_col)){
                         this.deplacement(row,column,this.tmp_row_col);  console.log('super 3');
                           break;
                        }else if((this.tableau[proche_row][proche_col]==3-this.turn||this.tableau[proche_row][proche_col]==3+this.turn)){
                          for(var q = 1; q <= 9;q++){ 
                           if(proche_row>row&&proche_col<column&&((proche_row-q>=0&&proche_col+q<=9)?this.tableau[proche_row-q][proche_col+q]==0:false)){
                            
                             this.mangerPionSuper(row,column,proche_row,proche_col,this.tmp_row_col,alerttxt);  
                            
                             break;
                           }else{
                             alerttxt.innerHTML= "Can't move the chess piece here.";
                             alert("Can't move the chess piece here.");
                            break;
                          }          
                          }break;
                        }else{
                         alerttxt.innerHTML= "Can't move the chess piece here.";
                         alert("Can't move the chess piece here.");
                          break;
                       }     
                         break;
                      
                  }                           
                                                
                   //sur le diagonal devant gauche 
                   if(((this.tmp_row-p>=0&&this.tmp_col-p>=0)?((this.tableau[this.tmp_row-p][this.tmp_col-p]!=0&&this.tableau[this.tmp_row-p][this.tmp_col-p]!=6)||(this.tmp_row-p==0&&row>=0)||(this.tmp_col-p==0&&column>=0)):0)&&this.tmp_row>=row&&this.tmp_col>=column){ console.log('tmp_row-p '+(this.tmp_row-p)+' tmp_col-p '+(this.tmp_col-p));
                     
                        proche_row=this.tmp_row-p;
                        proche_col=this.tmp_col-p; console.log('super4 tableau['+(this.tmp_row-p)+']['+(this.tmp_col-p)+']: '+this.tableau[this.tmp_row-p][this.tmp_col-p]);
                       
                      
                        if(((proche_row<row&&proche_col<column&&this.tableau[this.tmp_row-p][this.tmp_col-p]!=6&&(this.tableau[this.tmp_row-p][this.tmp_col-p]==this.turn||this.tableau[this.tmp_row-p][this.tmp_col-p]==6-this.turn||((this.tableau[this.tmp_row-p][this.tmp_col-p]==3-this.turn||this.tableau[this.tmp_row-p][this.tmp_col-p]==3+this.turn)&&((this.tmp_row-p-1>=0&&this.tmp_col-p-1>=0)?this.tableau[this.tmp_row-p-1][this.tmp_col-p-1]!=0:1))))||(this.tmp_row-p==0&&row>=0)||(this.tmp_col-p==0&&column>=0))&&(this.tmp_row-p>=0||this.tmp_col-p>=0)&&(row-column)==(this.tmp_row-this.tmp_col)){
                         this.deplacement(row,column,this.tmp_row_col);  console.log('super 4');
                           break;
                        }else if((this.tableau[proche_row][proche_col]==3-this.turn||this.tableau[proche_row][proche_col]==3+this.turn)){
                          for(var q = 1; q <= 9;q++){ 
                           if(proche_row>row&&proche_col>column&&((proche_row-q>=0&&proche_col-q>=0)?this.tableau[proche_row-q][proche_col-q]==0:false)){
                           
                             this.mangerPionSuper(row,column,proche_row,proche_col,this.tmp_row_col,alerttxt);   
                            
                             break;
                           }else{
                             alerttxt.innerHTML= "Can't move the chess piece here.";
                             alert("Can't move the chess piece here.");
                              break;
                           }         
                          }break;
                        }else{
                         alerttxt.innerHTML= "Can't move the chess piece here.";
                         alert("Can't move the chess piece here.");
                          break;
                       } 
                       break;
                        
                  } 
                                                  
                }
                 
            }else{  console.log("super deplacement2222");
                 alerttxt.innerHTML= "Can't move the chess piece here.";
                 alert("Can't move the chess piece here.");
             }           
           }
           console.log("nb_white "+this.nb_white+"nb_black "+this.nb_black);
           this.win(this.turn);
      }
      return;
    
  }else{
    alerttxt.innerHTML= "Can't pose the chess piece at the blanc.";
    alert("Can't pose the chess piece at the blanc.");
  }
  
}
//les pions normaux fait des deplacements
deplacement(row,column,player){

   this.tableau[row][column]=player;
   if(player==1&&row==0){
     this.tableau[row][column]=5;
     this.tmp_row_col=5;
   }else if (player==2&&row==9){
     this.tableau[row][column]=4;
     this.tmp_row_col=4;
   }
    
   this.enlever_deplacement(row,column,this.tmp_row_col);
   this.tmp_row=row;
   this.tmp_col=column;

   this.nb_step++;
     
  
    this.turn = 3 - this.turn;
   
}

// se deplacer sur un espace vide dans ma ligne droite
enlever_deplacement(row,column,player){
   
    if((row<9&&column<9&&this.tableau[row+1][column+1]==3)||(row<=9&&column<=9&&this.tableau[this.tmp_row][this.tmp_col]==6)){
   
      this.tableau[this.tmp_row][this.tmp_col]=0; console.log("here2");
    }
    if((row<9&&column>0&&this.tableau[row+1][column-1]==3)||(row<=9&&column>=0&&this.tableau[this.tmp_row][this.tmp_col]==6)){
       
      this.tableau[this.tmp_row][this.tmp_col]=0; console.log("here3");
    }
    if((row>0&&column<9&&this.tableau[row-1][column+1]==3)||(row>=0&&column<=9&&this.tableau[this.tmp_row][this.tmp_col]==6)){
       
      this.tableau[this.tmp_row][this.tmp_col]=0; console.log("here4");
    }
    if((row>0&&column>0&&this.tableau[row-1][column-1]==3)||(row>=0&&column>=0&&this.tableau[this.tmp_row][this.tmp_col]==6)){
        
      this.tableau[this.tmp_row][this.tmp_col]=0; console.log("here5");
    }
    
}
 
// la methode qui consiste a manger les pions 
mangerPion(row,column,player,alerttxt){
       
       if(((this.tmp_row==row-2)&&(this.tmp_col==column+2)&&((this.tableau[row-1][column+1]==3+player)||(this.tableau[row-1][column+1]==3-player)))||((this.tmp_row==row-2)&&(this.tmp_col==column-2)&&((this.tableau[row-1][column-1]==3+player)||(this.tableau[row-1][column-1]==3-player)))||((this.tmp_row==row+2)&&(this.tmp_col==column+2)&&((this.tableau[row+1][column+1]==3+player)||(this.tableau[row+1][column+1]==3-player)))||((this.tmp_row==row+2)&&(this.tmp_col==column-2)&&((this.tableau[row+1][column-1]==3+player)||(this.tableau[row+1][column-1]==3-player))) )
       {     
           this.tmp_row=row;
           this.tmp_col=column;
         
           this.nb_step++;
           console.log("wo shi "+this.turn);
           console.log("wo shiii "+this.turn);
 
           this.enleverPion(row,column,this.turn);
           this.tableau[row][column]=this.turn;  console.log("makesure1 ");
           this.nb_continu_eating ++;
         
           if(this.turn==1){
             this.score_black = this.score_black + 1*this.nb_continu_eating;
           }else if(this.turn==2){
             this.score_white = this.score_white + 1*this.nb_continu_eating;
           }
         
           // definir des deux damiers cas egale a 4 et cas egale a 5
           if((((row<9&&column>0)?((this.tableau[row+1][column-1]==3+player)||(this.tableau[row+1][column-1]==3-player)):1)&&((row<8&&column>1)?this.tableau[row+2][column-2]:1)==0)||(((row<9&&column<9)?((this.tableau[row+1][column+1]==3+player)||(this.tableau[row+1][column+1]==3-player)):1)&&((row<8&&column<8)?this.tableau[row+2][column+2]:1)==0)||(((row>0&&column>0)?((this.tableau[row-1][column-1]==3+player)||(this.tableau[row-1][column-1]==3-player)):1)&&((row>1&&column>1)?this.tableau[row-2][column-2]:1)==0)||(((row>0&&column<9)?((this.tableau[row-1][column+1]==3+player)||(this.tableau[row-1][column+1]==3-player)):1)&&((row>1&&column<8)?this.tableau[row-2][column+2]:1)==0)){
              alerttxt.innerHTML = "you don't finish eating the pions";
              this.tableau[row][column]=3; 
           }else{ //les deux damiers definis
             if(player==1&&row==0){
               this.tableau[row][column]=5;
               this.tmp_row_col=5;
             }else if (player==2&&row==9){
              this.this.tableau[row][column]=4;
               this.tmp_row_col=4;
             }
            
             this.nb_continu_eating = 0;
          
             this.turn = 3 - this.turn;
             
             
           }
         
       return;
       }
  
     
} 

 mangerPionSuper(row,column,superRow,superCol,player,alerttxt){
     
      if(this.tmp_row_col==player) {    

           this.nb_step++;
          
           this.tableau[this.tmp_row][this.tmp_col]=0; 
           this.tableau[superRow][superCol]=0;
          //noter le nb de pions restes
          if(this.turn==1){
            this.nb_white=this.nb_white-1;
          }else if(this.turn==2){
            this.nb_black=this.nb_black-1;
          }
         
           this.tmp_row=row;
           this.tmp_col=column;
          //les pions dames se posent dans des nouvelles places
           this.tableau[row][column]=player;  console.log("makesure2 ");
            
           this.nb_continu_eating ++;
           // continuer a manger des pions en bcp de fois ,et gagner plus de points pour les resultats
           if(this.turn==1){
             this.score_black = this.score_black + 1*this.nb_continu_eating;
           }else if(this.turn==2){
             this.score_white = this.score_white + 1*this.nb_continu_eating;
           }
        
            var proche_row;
            var proche_col;
           //verifier s'il y a encore des pions qui peut etre manges.
           for(var p = 1; p <= 9;p++){              
                console.log('verifier superpion');

                 if(((this.tmp_row+p+1<=9&&this.tmp_col+p+1<=9)?(this.tableau[this.tmp_row+p+1][this.tmp_col+p+1]==0&&(this.tableau[this.tmp_row+p][this.tmp_col+p]==player-3||this.tableau[this.tmp_row+p][this.tmp_col+p]==9-player)):false)||((this.tmp_row+p+1<=9&&this.tmp_col-p-1>=0)?(this.tableau[this.tmp_row+p+1][this.tmp_col-p-1]==0&&(this.tableau[this.tmp_row+p][this.tmp_col-p]==player-3||this.tableau[this.tmp_row+p][this.tmp_col-p]==9-player)):false)||((this.tmp_row-p-1>=0&&this.tmp_col+p+1<=9)?(this.tableau[this.tmp_row-p-1][this.tmp_col+p+1]==0&&(this.tableau[this.tmp_row-p][this.tmp_col+p]==player-3||this.tableau[this.tmp_row-p][this.tmp_col+p]==9-player)):false)||((this.tmp_row-p-1>=0&&this.tmp_col-p-1>=0)?(this.tableau[this.tmp_row-p-1][this.tmp_col-p-1]==0&&(this.tableau[this.tmp_row-p][this.tmp_col-p]==player-3||this.tableau[this.tmp_row-p][this.tmp_col-p]==9-player)):false)){
                  
                   alerttxt.innerHTML = "you don't finish eating the pions";
                   this.tableau[row][column]=6; 
                   break;
                 }else{
                   console.log('bord2: tableau['+row+']['+column+']: '+this.tableau[row][column]);
                   this.nb_continu_eating = 0;
              
                   this.turn = 3 - this.turn; 

                   console.log("final turn2: "+this.turn);
                    break;
                }                    
           }
           
        return;
       }
}

//enlever des pions manges par les pions normaux et ses pions qui deplacent
enleverPion(row,column,player){
    
    if(row<8&&column<8&&this.tableau[row+2][column+2]==3){
      this.tableau[row+1][column+1] = 0; 
      this.tableau[row+2][column+2] = 0;
    }
    if(row<8&&column>1&&this.tableau[row+2][column-2]==3){
      this.tableau[row+1][column-1]=0;  
      this.tableau[row+2][column-2]=0;  
    }
    if(row>1&&column<8&&this.tableau[row-2][column+2]==3){
      this.tableau[row-1][column+1]=0;  
      this.tableau[row-2][column+2]=0;  
    }
    if(row>1&&column>1&&this.tableau[row-2][column-2]==3){
      this.tableau[row-1][column-1]=0;  
      this.tableau[row-2][column-2]=0; 
    }
    //noter les pions restés après le pions normaux ont mangés
    if(this.turn==1){
      this.nb_white=this.nb_white-1;
    }else if(this.turn==2){
      this.nb_black=this.nb_black-1;
    }
  
}

//reset notre jeux
reset(){ 
  for (var i = 0 ; i < this.tableau.length; i++) { 
   for (var j = 0 ; j < this.tableau[i].length; j++) { 
    this.tableau[i][j]= 0 ;  
     console.log(this.tableau[i][j]);
   }
  }
  this.removeEle();
  
  this.nb_step=0;
  this.turn = 1;
  this.tmp_row=0;
  this.tmp_col=0;
  this.tmp_row_col=0;
  this.flag_choosen = 0;
  this.nb_white = 20;
  this.nb_black = 20;
  this.score_black = 0;
  this.score_white = 0;
  
  var alarmetext = document.querySelector('#alarmetext');
  alarmetext.innerHTML = "";
  this.render();
}

//enlever des elements repetes
removeEle(){
  
  var removeTab = document.getElementById('plateau');
  var parentEl = removeTab.parentElement;
  parentEl.removeChild(removeTab);
  
  var removeTour = document.getElementById('tour');
  var parentE00 = removeTour.parentElement;
  parentE00.removeChild(removeTour);
  
  var removeText = document.getElementById('usertext');
  var parentEl0 = removeText.parentElement;
  parentEl0.removeChild(removeText);

  var removeBut = document.getElementById('bt');
  var parentEl1 = removeBut.parentElement;
  parentEl1.removeChild(removeBut);
}

//verifier s'il y a encore des pions. s'il ne reste plus, l'adversaire va gagner.
win(player) {  
                      
    var color="";
     if(3-player==1){
       color="Black";
     }else{
       color="White";
     }
     // montrer qui va ganger et ses resultats
    if(this.nb_white==0&&3-player==1){
      alert("player"+(3-player)+" '"+color+"' gagane! Resultat: "+this.score_black); 
      
      return true;
    }else if(this.nb_black==0&&3-player==2){
      alert("player"+(3-player)+" '"+color+"' gagane! Resultat: "+this.score_white); 
      
      return true;
    } 
}

}
/*
var damesgame = new Gamedames('bin',1);
damesgame.render();
*/
//exports.Gamedames = Gamedames;

