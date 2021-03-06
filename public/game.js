
//definition du tableau a 10 columns
var tableau = Array(10);

for (var i = 0 ; i < tableau.length; i++) {
    tableau[i] = Array(10);
    tableau[i].fill(0);  
}


function set(row,column,player){
  tableau[row][column]=player;  
  //console.log(set(row,column,player));
}

var tmp_row_col = 1;
var nb_step = 0;
var nb_black = 20;
var nb_white = 20;
var score_black = 0;
var score_white = 0;

//affichage du damier qui contiens des positions des pions , prevois de deplacer et prevois de manger
function render(){
  
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
       lii.innerHTML+="Score : " +score_black;
    }else if(i==1){
       lii.innerHTML+="Score : " +score_white;      
    }
    usertext.appendChild(lii);
    
  }
  
  var tour = document.createElement('div');
  tour.id ='tour'; 
  var userpion = document.createElement('img');
  userpion.id='userpion';
  tour.innerHTML=" Turn : ";
  
  if(turn==1){
    userpion.src="https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_noir.png?1558689060582";  
  }else if(turn==2){
    userpion.src="https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_blanc.png?1558689066452";  
  }
  
  tour.appendChild(userpion);
  divt.appendChild(usertext);
  divt.appendChild(tour);
  
  
  
  
  var divv = document.querySelector('#vide');
  divv.style.height = '630px';
  divv.style.width ='565px';
  divv.style.border = '3px solid Maroon ';
  divv.style.margin="0 auto";
  

  var tab = document.createElement('table');
  tab.id = "plateau";
  tab.style.height = '555px';
  tab.style.width ='555px';
  tab.style.margin='3px auto';
  tab.Style = 'position:absolute;';
   
    for(var i = 0; i < tableau.length;i++){
        var trr = document.createElement('tr');
        trr.style.height = '55px';
        trr.style.width ='545px';
        trr.style.margin='3px auto';
        for(var j = 0; j < tableau[i].length;j++){
          var tdd = document.createElement('td');  
          
          if((i+j)%2==1){
            if (tableau[i][j]!=3&&tableau[i][j]!=6){ 
              if(nb_step==0){
                if(i>=6){
                    tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_noir.png?1558689060582') repeat scroll center; -webkit-background-size: cover;";
                    tdd.style.borderRadius = "39px";  
                    tableau[i][j]=1;
                }
                if(i<=3){
                    tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_blanc.png?1558689066452') repeat scroll center; -webkit-background-size: cover; ";
                    tdd.style.borderRadius = "39px"; 
                    tableau[i][j]=2;
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
          
          if (tableau[i][j]!=3&&tableau[i][j]!=6){
            //console.log("here");
            if(tableau[i][j]==1){
              tdd.className ="player1";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_noir.png?1558689060582') repeat  scroll center;  -webkit-background-size: cover; ";
              tdd.style.borderRadius = "39px";

            }else if (tableau[i][j]==2){
              tdd.className ="player2";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_blanc.png?1558689066452') repeat  scroll center;  -webkit-background-size: cover; ";
              tdd.style.borderRadius = "39px";

            }else if(tableau[i][j]==4){ 
            
            tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fsuper_pion_blanc.png?1558689066906') repeat scroll center; -webkit-background-size: cover;";
            tdd.style.borderRadius = "39px";
       
            }else if(tableau[i][j]==5){
            
            tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fsuper_pion_noir.png?1558689066877') repeat scroll center; -webkit-background-size: cover;";    
            tdd.style.borderRadius = "39px";
     
            } 
            
            //l'animation sur le pion exact
            if(tableau[i][j]==0){
              var row = tdd.dataset.row;
              var column = tdd.dataset.column;

                 if(turn==1){
                   // les possibilités pour manger et se deplacer dans le dames
                   if(((row<8&&column<8)?((tableau[i+1][j+1]==2||tableau[i+1][j+1]==4)&&tableau[i+2][j+2]==3):0)||((row<8&&column>1)?((tableau[i+1][j-1]==2||tableau[i+1][j-1]==4)&&tableau[i+2][j-2]==3):0)||((row>1&&column<8)?((tableau[i-1][j+1]==2||tableau[i-1][j+1]==4)&&tableau[i-2][j+2]==3):0)||((row>1&&column>1)?((tableau[i-1][j-1]==2||tableau[i-1][j-1]==4)&&tableau[i-2][j-2]==3):0)){  
                         pre_mange_position(i,j,row,column,tdd,1); console.log(' 781');
                   }else if(((row<9&&column<9)?(tableau[i+1][j+1]==3):0)||((row<9&&column>0)?(tableau[i+1][j-1]==3):0)){ // lorsque j'utilise un pion il change de couleur dans le cas 3  
                     console.log('7811');
                      console.log('row '+row+'column '+column);
                       tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";          
                      
                   }
                 }
              
              
                if(turn==2){
                   // les possibilités pour manger et se deplacer dans le dames
                  if(((row<8&&column<8)?((tableau[i+1][j+1]==1||tableau[i+1][j+1]==5)&&tableau[i+2][j+2]==3):0)||((row<8&&column>1)?((tableau[i+1][j-1]==1||tableau[i+1][j-1]==5)&&tableau[i+2][j-2]==3):0)||((row>1&&column<8)?((tableau[i-1][j+1]==1||tableau[i-1][j+1]==5)&&tableau[i-2][j+2]==3):0)||((row>1&&column>1)?((tableau[i-1][j-1]==1||tableau[i-1][j-1]==5)&&tableau[i-2][j-2]==3):0)){  
                      pre_mange_position(i,j,row,column,tdd,2); 
                    
                  }else if(((row>0&&column<9)?(tableau[i-1][j+1]==3):0)||((row>0&&column>0)?(tableau[i-1][j-1]==3):0)){  // lorsque j'utilise un pion il change de couleur dans le cas 3 
                    console.log('7831');
                    
                     tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                   
                  }
                }
                
                for(var p = 1; p <= 9;p++){              
                  
                   if((tableau[i][j]==0&&((i+j)%2==1))&&i+p<=9&&j+p<=9){
                    //prevoir la position des pions dames sur la diagonale avant gauche apres manger
                     if(tableau[i+p][j+p]!=0){
                       if(tableau[i+p][j+p]!=6){
                         for(var q = 1; q <= 9;q++){
                           if((i+p+q<=9&&j+p+q<=9)?tableau[i+p+q][j+p+q]==6:0){  
                             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                           }else if((i+p+q<=9&&j+p+q<=9)?tableau[i+p+q][j+p+q]!=6:0){
                                break;
                           }
                         }
                         // prevoir la position de deplacement de pions dames sur la diagonale avant gauche
                       }else if(tableau[i+p][j+p]==6){   
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                       }else{
                         break;
                       }
                      
                     }
                   }
                }
              for(var p = 1; p <= 9;p++){ 
                   if((tableau[i][j]==0&&((i+j)%2==1))&&i+p<=9&&j-p>=0){
                    //prevoir la position des pions dames sur la diagonale avant droite apres manger
                     if(tableau[i+p][j-p]!=0){
                       if(tableau[i+p][j-p]!=6){
                         for(var q = 1; q <= 9;q++){
                           if((i+p+q<=9&&j-p-q>=0)?tableau[i+p+q][j-p-q]==6:0){  
                             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                           }else if((i+p+q<=9&&j-p-q>=0)?tableau[i+p+q][j-p-q]!=6:0){
                                break;
                           }
                         }
                          // prevoir la position de deplacement de pions dames sur la diagonale avant droite
                       }else if(tableau[i+p][j-p]==6){  
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";  
                       }else{
                         break;
                       }
                       
                     }
                   } 
              }
              for(var p = 1; p <= 9;p++){ 
                   if((tableau[i][j]==0&&((i+j)%2==1))&&i-p>=0&&j+p<=9){
                    //prevoir la position des pions dames sur la diagonale arriere gauche apres manger
                     if(tableau[i-p][j+p]!=0){
                       if(tableau[i-p][j+p]!=6){
                         for(var q = 1; q <= 9;q++){
                           if((i-p-q>=0&&j+p+q<=9)?tableau[i-p-q][j+p+q]==6:0){   
                             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                           }else if((i-p-q>=0&&j+p+q<=9)?tableau[i-p-q][j+p+q]!=6:0){
                                break;
                           }
                         }
                         // prevoir la position de deplacement de pions dames sur la diagonale arriere gauche
                       }else if(tableau[i-p][j+p]==6){  
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";  
                       }else{
                         break;
                       }
                      
                     }
                   }
              }
              for(var p = 1; p <= 9;p++){ 
                   if((tableau[i][j]==0&&((i+j)%2==1))&&i-p>=0&&j-p>=0){
                     //prevoir la position des pions dames sur la diagonale arriere droite apres manger
                     if(tableau[i-p][j-p]!=0){
                       if(tableau[i-p][j-p]!=6){
                         for(var q = 1; q <= 9;q++){
                           if((i-p-q>=0&&j-p-q>=0)?tableau[i-p-q][j-p-q]==6:0){   
                             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                           }else if((i-p-q>=0&&j-p-q>=0)?tableau[i-p-q][j-p-q]!=6:0){
                                break;
                           }
                         }
                         // prevoir la position de deplacement de pions dames sur la diagonale arriere droite
                       }else if(tableau[i-p][j-p]==6){ 
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";  
                       }else{
                         break;
                       }
                      
                     }
                   }
              }
            
            }
            //choisir le pions normal pour commencer des fonctionalites
          }else if(tableau[i][j]==3){
            console.log("here tmp_row_col:"+tmp_row_col);
            tdd.className ="choosen";   
            
            if(turn==1){
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_darkred.png?1558689066451') repeat scroll center; -webkit-background-size: cover;";
            }else if(turn==2){
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fpion_gold.png?1558689066971') repeat scroll center; -webkit-background-size: cover;";
            }
              
            tdd.style.borderRadius = "35px";
            tdd.style.border= "3px solid blue";
           //choisir le pions dames pour commencer des fonctionalites
           }else if(tableau[i][j]==6){
            //console.log("here tmp_row_col:"+tmp_row_col);
            tdd.className ="choosen_super";   
            
            if(turn==1){
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fsuper_pion_darkred.png?1558689066517') repeat scroll center; -webkit-background-size: cover;";
            }else if(turn==2){
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/9893d270-7092-455c-a88d-67b1ad9a4b65%2Fsuper_pion_gold.png?1558689066450') repeat scroll center; -webkit-background-size: cover;";
            }
            
            tdd.style.borderRadius = "35px";
            tdd.style.border= "3px solid blue";
     
          }    
      } 
      tab.appendChild(trr);
    }
  divv.appendChild(tab);
  //poser des pions sur le damier
  tab.addEventListener('click', function(event) { 
      var row = event.target.dataset.row;
      var column = event.target.dataset.column;
      //console.log('column'+column);
      if (row&&column) {   
        
        play(parseInt(row),parseInt(column));
        
        removeEle();
        render();
      }else{
        var color="";
           if(turn==1){
             color="Black";
           }else{
             color="White";
           }
        alert("please '"+color+"' must chosse a piece for playing");
      } 
  });

  
  var but = document.createElement('button');
  but.id = "bt";
  but.innerHTML="reset";
  divv.appendChild(but);
  but.style.height = '30px';
  but.style.width ='80px';
  but.style.margin = '5px';
  but.addEventListener('click', function(e) { reset();});
  
  var alarmetext = document.querySelector('#alarmetext');
  alarmetext.style="position:relative; font-weight:bold; color:white;";
  alarmetext.style.height = '25px';
  alarmetext.style.width ='565px';
  alarmetext.style.margin = '6px auto';
  
  divv.appendChild(alarmetext);
  
   //verificaton de la position du pion dans le tableau et etre sure 
  /*for(var i = 0; i < tableau.length;i++){
        for(var j = 0; j < tableau[i].length;j++){
           console.log('tableau['+i+']['+j+']='+tableau[i][j]);
        }
   }*/
   console.log('********************');
}
//prevoir des positions apres manger des pions d'adversaires
function pre_mange_position(i,j,row,column,tdd,turn){
  
    if(row<8&&column<8){
        if((tableau[i+1][j+1]==(3-turn)||tableau[i+1][j+1]==(3+turn))&&tableau[i+2][j+2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7891');
         }
    }
    if(row<8&&column>1){
        if((tableau[i+1][j-1]==(3-turn)||tableau[i+1][j-1]==(3+turn))&&tableau[i+2][j-2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7892');
         }
    }
    if(row>1&&column<8){
        if((tableau[i-1][j+1]==(3-turn)||tableau[i-1][j+1]==(3+turn))&&tableau[i-2][j+2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7893');
         }
    }
    if(row>1&&column>1){
        if((tableau[i-1][j-1]==(3-turn)||tableau[i-1][j-1]==(3+turn))&&tableau[i-2][j-2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7894');
        }
    }
}



var turn = 1;
var tmp_row=0;
var tmp_col=0;
var flag_choosen = 0;

//la fonction implemente l'event addeventListener pour realiser des fonctionalites de deplacer et manger
function play(row,column){
  var alerttxt = document.querySelector('#alarmetext');
    if((row+column)%2==1){
      alerttxt.innerHTML="";
      if(tableau[row][column] != 0){  
        //permettre a changer des pions pour un utilisateur
         if(tableau[row][column] != 3 && tableau[row][column] != 6 && (tableau[row][column] == turn||tableau[row][column] == 6-turn)){ 
         
           console.log("nb_step:"+nb_step);
           if(flag_choosen==1){
             
             if(tableau[tmp_row][tmp_col]!=3 && tableau[tmp_row][tmp_col] != 6){
               flag_choosen=0;
             }
             
           
             if(tableau[row][column] == tmp_row_col||tableau[row][column] == 6-tmp_row_col){
               //console.log("same here");
               tableau[tmp_row][tmp_col] = tmp_row_col;
               tmp_row_col = tableau[row][column];
               flag_choosen=1; 
             }else if(tableau[row][column] != tmp_row_col&&tableau[row][column] != 6-tmp_row_col){
                //console.log("not same here");
               if(tableau[tmp_row][tmp_col]!=4&&tableau[tmp_row][tmp_col]!=5){
                 tableau[tmp_row][tmp_col]= 3-turn;   
               }else if(tableau[tmp_row][tmp_col]==4||tableau[tmp_row][tmp_col]==5){
                 tableau[tmp_row][tmp_col]= tmp_row_col;
               }
                tmp_row_col = tableau[row][column];               
                flag_choosen=1;  
             }
             
           }else if(flag_choosen==0){
             flag_choosen=1;               
           }
           
           tmp_row=row;
           tmp_col=column; 
           if((turn==1&&tmp_row_col==5)||(turn==2&&tmp_row_col==4)){
             tableau[row][column]=6;
           }else if((row!=0&&tmp_row_col!=5)||(row!=9&&tmp_row_col!=4)){
             tableau[row][column]=3;
           }
          
           
         }else{
           var color="";
           if(turn==1){
             color="Black";
           }else{
             color="White";
           }
           alerttxt.innerHTML= "It's the turn for your enemy '"+color+"' !";
           alert("It's the turn for your enemy '"+color+"' !");
         }
             
        
         //si la place est vide, on considere c'est dans quels cas(on deplace ou mange).
      }else if(tableau[row][column]==0){
          //des fonctionalites pour le pion noir normal
          if(tmp_row_col==1){ 
             if(((tmp_row==row-2)&&(tmp_col==column+2)&&(tableau[row-1][column+1]==3-turn||tableau[row-1][column+1]==3+turn))||((tmp_row==row-2)&&(tmp_col==column-2)&&(tableau[row-1][column-1]==3-turn||tableau[row-1][column-1]==3+turn))||((tmp_row==row+2)&&(tmp_col==column+2)&&(tableau[row+1][column+1]==3-turn||tableau[row+1][column+1]==3+turn))||((tmp_row==row+2)&&(tmp_col==column-2)&&(tableau[row+1][column-1]==3-turn||tableau[row+1][column-1]==3+turn)) )
               {  console.log("mange1");
                  mangerPion(row,column,turn,alerttxt);

               }else if((((tmp_row==row+1)&&(tmp_col==column+1))||((tmp_row==row+1)&&(tmp_col==column-1)))&&tableau[tmp_row][tmp_col]==3){  console.log("deplacement1");
                 deplacement(row,column,turn);
                 
               }else{
                 alerttxt.innerHTML= "Can't move the chess piece here.";
                 alert("Can't move the chess piece here.");
               }           
           }
          //des fonctionalites pour le pion blanc normal
           if(tmp_row_col==2){
             if(((tmp_row==row-2)&&(tmp_col==column+2)&&(tableau[row-1][column+1]==3-turn||tableau[row-1][column+1]==3+turn))||((tmp_row==row-2)&&(tmp_col==column-2)&&(tableau[row-1][column-1]==3-turn||tableau[row-1][column-1]==3+turn))||((tmp_row==row+2)&&(tmp_col==column+2)&&(tableau[row+1][column+1]==3-turn||tableau[row+1][column+1]==3+turn))||((tmp_row==row+2)&&(tmp_col==column-2)&&(tableau[row+1][column-1]==3-turn||tableau[row+1][column-1]==3+turn)) )
             {  console.log("mange2");
                mangerPion(row,column,turn,alerttxt);

             }else if((((tmp_row==row-1)&&(tmp_col==column+1))||((tmp_row==row-1)&&(tmp_col==column-1)))&&tableau[tmp_row][tmp_col]==3){  console.log("deplacement2");
               deplacement(row,column,turn);             

             }else{
               alerttxt.innerHTML= "Can't move the chess piece here.";
               alert("Can't move the chess piece here.");
             }   
          }
          //des fonctionalites pour le pion noir ou blanc dames
          if((tmp_row_col==4||tmp_row_col==5)&&tableau[tmp_row][tmp_col]==6){   
            
            if(((row-column)==(tmp_row-tmp_col)||(row+column)==(tmp_row+tmp_col))){
                
                 var proche_row=0;
                 var proche_col=0;  
                 for(var p = 0; p <= 9;p++){  
                 //sur le diagonal arriere droit
                   if(((tmp_row+p<=9&&tmp_col+p<=9)?((tableau[tmp_row+p][tmp_col+p]!=0&&tableau[tmp_row+p][tmp_col+p]!=6)||(tmp_row+p==9&&row<=9)||(tmp_col+p==9&&column<=9)):0)&&tmp_row<=row&&tmp_col<=column){ console.log('tmp_row+p '+(tmp_row+p)+' tmp_col+p '+(tmp_col+p));
                     
                        proche_row=tmp_row+p;
                        proche_col=tmp_col+p;   
                       
                        if(((proche_row>row&&proche_col>column&&tableau[tmp_row+p][tmp_col+p]!=6&&(tableau[tmp_row+p][tmp_col+p]==turn||tableau[tmp_row+p][tmp_col+p]==6-turn||((tableau[tmp_row+p][tmp_col+p]==3-turn||tableau[tmp_row+p][tmp_col+p]==3+turn)&&((tmp_row+p+1<=9&&tmp_col+p+1<=9)?tableau[tmp_row+p+1][tmp_col+p+1]!=0:1))))||(tmp_row+p==9&&row<=9)||(tmp_col+p==9&&column<=9))&&(tmp_row+p<=9||tmp_col+p<=9)&&(row-column)==(tmp_row-tmp_col)){
                           
                          deplacement(row,column,tmp_row_col); console.log('super 1');
                          break;
                          
                        }else if((tableau[proche_row][proche_col]==3-turn||tableau[proche_row][proche_col]==3+turn)){
                          for(var q = 1; q <= 9;q++){ 
                           if(proche_row<row&&proche_col<column&&((proche_row+q<=9&&proche_col+q<=9)?tableau[proche_row+q][proche_col+q]==0:false)){
                             
                             mangerPionSuper(row,column,proche_row,proche_col,tmp_row_col,alerttxt);  
                             
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
                   if(((tmp_row+p<=9&&tmp_col-p>=0)?((tableau[tmp_row+p][tmp_col-p]!=0&&tableau[tmp_row+p][tmp_col-p]!=6)||(tmp_row+p==9&&row<=9)||(tmp_col-p==0&&column>=0)):0)&&tmp_row<=row&&tmp_col>=column){ console.log('tmp_row+p '+(tmp_row+p)+' tmp_col-p '+(tmp_col-p));
                     
                        proche_row=tmp_row+p;
                        proche_col=tmp_col-p; console.log('super2 tableau['+(tmp_row+p)+']['+(tmp_col-p)+']: '+tableau[tmp_row+p][tmp_col-p]);
                       
                        if(((proche_row>row&&proche_col<column&&tableau[tmp_row+p][tmp_col-p]!=6&&(tableau[tmp_row+p][tmp_col-p]==turn||tableau[tmp_row+p][tmp_col-p]==6-turn||((tableau[tmp_row+p][tmp_col-p]==3-turn||tableau[tmp_row+p][tmp_col-p]==3+turn)&&((tmp_row+p+1<=9&&tmp_col-p-1>=0)?tableau[tmp_row+p+1][tmp_col-p-1]!=0:1))))||(tmp_row+p==9&&row<=9)||(tmp_col-p==0&&column>=0))&&(tmp_row+p<=9||tmp_col-p>=0)&&(row+column)==(tmp_row+tmp_col)){
                           deplacement(row,column,tmp_row_col);  console.log('super 2');
                           break;
                        }else if((tableau[proche_row][proche_col]==3-turn||tableau[proche_row][proche_col]==3+turn)){
                          for(var q = 1; q <= 9;q++){ 
                           if(proche_row<row&&proche_col>column&&((proche_row+q<=9&&proche_col-q>=0)?tableau[proche_row+q][proche_col-q]==0:false)){
                           
                             mangerPionSuper(row,column,proche_row,proche_col,tmp_row_col,alerttxt);  
                           
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
                   if(((tmp_row-p>=0&&tmp_col+p<=9)?((tableau[tmp_row-p][tmp_col+p]!=0&&tableau[tmp_row-p][tmp_col+p]!=6)||(tmp_row-p==0&&row>=0)||(tmp_col+p==9&&column<=9)):0)&&tmp_row>=row&&tmp_col<=column){ console.log('tmp_row-p '+(tmp_row-p)+' tmp_col+p '+(tmp_col+p));
                      
                        proche_row=tmp_row-p;
                        proche_col=tmp_col+p; console.log('super3 tableau['+(tmp_row-p)+']['+(tmp_col+p)+']: '+tableau[tmp_row-p][tmp_col+p]);
                      
                       if(((proche_row<row&&proche_col>column&&tableau[tmp_row-p][tmp_col+p]!=6&&(tableau[tmp_row-p][tmp_col+p]==turn||tableau[tmp_row-p][tmp_col+p]==6-turn||((tableau[tmp_row-p][tmp_col+p]==3-turn||tableau[tmp_row-p][tmp_col+p]==3+turn)&&((tmp_row-p-1>=0&&tmp_col+p+1<=9)?tableau[tmp_row-p-1][tmp_col+p+1]!=0:1))))||(tmp_row-p==0&&row>=0)||(tmp_col+p==9&&column<=9))&&(tmp_row-p>=0||tmp_col+p<=9)&&(row+column)==(tmp_row+tmp_col)){
                         deplacement(row,column,tmp_row_col);  console.log('super 3');
                           break;
                        }else if((tableau[proche_row][proche_col]==3-turn||tableau[proche_row][proche_col]==3+turn)){
                          for(var q = 1; q <= 9;q++){ 
                           if(proche_row>row&&proche_col<column&&((proche_row-q>=0&&proche_col+q<=9)?tableau[proche_row-q][proche_col+q]==0:false)){
                            
                             mangerPionSuper(row,column,proche_row,proche_col,tmp_row_col,alerttxt);  
                            
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
                   if(((tmp_row-p>=0&&tmp_col-p>=0)?((tableau[tmp_row-p][tmp_col-p]!=0&&tableau[tmp_row-p][tmp_col-p]!=6)||(tmp_row-p==0&&row>=0)||(tmp_col-p==0&&column>=0)):0)&&tmp_row>=row&&tmp_col>=column){ console.log('tmp_row-p '+(tmp_row-p)+' tmp_col-p '+(tmp_col-p));
                     
                        proche_row=tmp_row-p;
                        proche_col=tmp_col-p; console.log('super4 tableau['+(tmp_row-p)+']['+(tmp_col-p)+']: '+tableau[tmp_row-p][tmp_col-p]);
                       
                      
                        if(((proche_row<row&&proche_col<column&&tableau[tmp_row-p][tmp_col-p]!=6&&(tableau[tmp_row-p][tmp_col-p]==turn||tableau[tmp_row-p][tmp_col-p]==6-turn||((tableau[tmp_row-p][tmp_col-p]==3-turn||tableau[tmp_row-p][tmp_col-p]==3+turn)&&((tmp_row-p-1>=0&&tmp_col-p-1>=0)?tableau[tmp_row-p-1][tmp_col-p-1]!=0:1))))||(tmp_row-p==0&&row>=0)||(tmp_col-p==0&&column>=0))&&(tmp_row-p>=0||tmp_col-p>=0)&&(row-column)==(tmp_row-tmp_col)){
                         deplacement(row,column,tmp_row_col);  console.log('super 4');
                           break;
                        }else if((tableau[proche_row][proche_col]==3-turn||tableau[proche_row][proche_col]==3+turn)){
                          for(var q = 1; q <= 9;q++){ 
                           if(proche_row>row&&proche_col>column&&((proche_row-q>=0&&proche_col-q>=0)?tableau[proche_row-q][proche_col-q]==0:false)){
                           
                             mangerPionSuper(row,column,proche_row,proche_col,tmp_row_col,alerttxt);   
                            
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
           console.log("nb_white "+nb_white+"nb_black "+nb_black);
           win(turn);
      }
      return;
    
  }else{
    alerttxt.innerHTML= "Can't pose the chess piece at the blanc.";
    alert("Can't pose the chess piece at the blanc.");
  }
  
}
//les pions normaux fait des deplacements
function deplacement(row,column,player){

   tableau[row][column]=player;
   if(player==1&&row==0){
     tableau[row][column]=5;
     tmp_row_col=5;
   }else if (player==2&&row==9){
     tableau[row][column]=4;
     tmp_row_col=4;
   }
   turn = 3 - turn;

   enlever_deplacement(row,column,tmp_row_col);
    tmp_row=row;
   tmp_col=column;
  
  
   nb_step++;
   
}

// apres se deplacer sur un espace vide , le pion dans la place ancien est supprime
function enlever_deplacement(row,column,player){
   
    if((row<9&&column<9&&tableau[row+1][column+1]==3)||(row<=9&&column<=9&&tableau[tmp_row][tmp_col]==6)){
   
      tableau[tmp_row][tmp_col]=0; console.log("here2");
    }
    if((row<9&&column>0&&tableau[row+1][column-1]==3)||(row<=9&&column>=0&&tableau[tmp_row][tmp_col]==6)){
       
      tableau[tmp_row][tmp_col]=0; console.log("here3");
    }
    if((row>0&&column<9&&tableau[row-1][column+1]==3)||(row>=0&&column<=9&&tableau[tmp_row][tmp_col]==6)){
       
      tableau[tmp_row][tmp_col]=0; console.log("here4");
    }
    if((row>0&&column>0&&tableau[row-1][column-1]==3)||(row>=0&&column>=0&&tableau[tmp_row][tmp_col]==6)){
        
      tableau[tmp_row][tmp_col]=0; console.log("here5");
    }
    
}

var nb_continu_eating = 0;

// la methode des pions normaux qui consiste a manger les pions 
function mangerPion(row,column,player,alerttxt){
       
       if(((tmp_row==row-2)&&(tmp_col==column+2)&&((tableau[row-1][column+1]==3+player)||(tableau[row-1][column+1]==3-player)))||((tmp_row==row-2)&&(tmp_col==column-2)&&((tableau[row-1][column-1]==3+player)||(tableau[row-1][column-1]==3-player)))||((tmp_row==row+2)&&(tmp_col==column+2)&&((tableau[row+1][column+1]==3+player)||(tableau[row+1][column+1]==3-player)))||((tmp_row==row+2)&&(tmp_col==column-2)&&((tableau[row+1][column-1]==3+player)||(tableau[row+1][column-1]==3-player))) )
       {     
           tmp_row=row;
           tmp_col=column;
         
           nb_step++;
           console.log("wo shi "+turn);
           console.log("wo shiii "+turn);
 
           enleverPion(row,column,turn);
           tableau[row][column]=turn;  console.log("makesure1 ");
           nb_continu_eating ++;
         
           if(turn==1){
             score_black = score_black + 1*nb_continu_eating;
           }else if(turn==2){
             score_white = score_white + 1*nb_continu_eating;
           }
         
           // definir des deux damiers cas egale a 4 et cas egale a 5
           if((((row<9&&column>0)?((tableau[row+1][column-1]==3+player)||(tableau[row+1][column-1]==3-player)):1)&&((row<8&&column>1)?tableau[row+2][column-2]:1)==0)||(((row<9&&column<9)?((tableau[row+1][column+1]==3+player)||(tableau[row+1][column+1]==3-player)):1)&&((row<8&&column<8)?tableau[row+2][column+2]:1)==0)||(((row>0&&column>0)?((tableau[row-1][column-1]==3+player)||(tableau[row-1][column-1]==3-player)):1)&&((row>1&&column>1)?tableau[row-2][column-2]:1)==0)||(((row>0&&column<9)?((tableau[row-1][column+1]==3+player)||(tableau[row-1][column+1]==3-player)):1)&&((row>1&&column<8)?tableau[row-2][column+2]:1)==0)){
              alerttxt.innerHTML = "you don't finish eating the pions";
              tableau[row][column]=3; 
           }else{ //les deux damiers definis
             if(player==1&&row==0){
               tableau[row][column]=5;
               tmp_row_col=5;
             }else if (player==2&&row==9){
               tableau[row][column]=4;
               tmp_row_col=4;
             }
            
             nb_continu_eating = 0;
             turn = 3 - turn;
             
             
           }
         
       return;
       }
  
     
} 
//les pions dames mangent des pions d'adversaires
function mangerPionSuper(row,column,superRow,superCol,player,alerttxt){
     
      if(tmp_row_col==player) {    

           nb_step++;
          
           tableau[tmp_row][tmp_col]=0; 
           tableau[superRow][superCol]=0;
          //noter le nb de pions restes
          if(turn==1){
            nb_white=nb_white-1;
          }else if(turn==2){
            nb_black=nb_black-1;
          }
         
           tmp_row=row;
           tmp_col=column;
          //les pions dames se posent dans des nouvelles places
           tableau[row][column]=player;  console.log("makesure2 ");
            
           nb_continu_eating ++;
           // continuer a manger des pions en bcp de fois ,et gagner plus de points pour les resultats
           if(turn==1){
             score_black = score_black + 1*nb_continu_eating;
           }else if(turn==2){
             score_white = score_white + 1*nb_continu_eating;
           }
        
            var proche_row;
            var proche_col;
           //verifier s'il y a encore des pions qui peut etre manges.
           for(var p = 1; p <= 9;p++){              
                console.log('verifier superpion');

                 if(((tmp_row+p+1<=9&&tmp_col+p+1<=9)?(tableau[tmp_row+p+1][tmp_col+p+1]==0&&(tableau[tmp_row+p][tmp_col+p]==player-3||tableau[tmp_row+p][tmp_col+p]==9-player)):false)||((tmp_row+p+1<=9&&tmp_col-p-1>=0)?(tableau[tmp_row+p+1][tmp_col-p-1]==0&&(tableau[tmp_row+p][tmp_col-p]==player-3||tableau[tmp_row+p][tmp_col-p]==9-player)):false)||((tmp_row-p-1>=0&&tmp_col+p+1<=9)?(tableau[tmp_row-p-1][tmp_col+p+1]==0&&(tableau[tmp_row-p][tmp_col+p]==player-3||tableau[tmp_row-p][tmp_col+p]==9-player)):false)||((tmp_row-p-1>=0&&tmp_col-p-1>=0)?(tableau[tmp_row-p-1][tmp_col-p-1]==0&&(tableau[tmp_row-p][tmp_col-p]==player-3||tableau[tmp_row-p][tmp_col-p]==9-player)):false)){
                  
                   alerttxt.innerHTML = "you don't finish eating the pions";
                   tableau[row][column]=6; 
                   break;
                 }else{
                   console.log('bord2: tableau['+row+']['+column+']: '+tableau[row][column]);
                   nb_continu_eating = 0;
                   turn = 3 - turn; 

                   console.log("final turn2: "+turn);
                    break;
                }                    
           }
           
        return;
       }
}

//enlever des pions manges par les pions normaux et ses pions qui deplacent
function enleverPion(row,column,player){
    
    if(row<8&&column<8&&tableau[row+2][column+2]==3){
      tableau[row+1][column+1] = 0; 
      tableau[row+2][column+2] = 0;
    }
    if(row<8&&column>1&&tableau[row+2][column-2]==3){
      tableau[row+1][column-1]=0;  
      tableau[row+2][column-2]=0;  
    }
    if(row>1&&column<8&&tableau[row-2][column+2]==3){
      tableau[row-1][column+1]=0;  
      tableau[row-2][column+2]=0;  
    }
    if(row>1&&column>1&&tableau[row-2][column-2]==3){
      tableau[row-1][column-1]=0;  
      tableau[row-2][column-2]=0; 
    }
    //noter les pions restés après le pions normaux ont mangés
    if(turn==1){
      nb_white=nb_white-1;
    }else if(turn==2){
      nb_black=nb_black-1;
    }
  
}

//reset notre jeux
function reset(){ 
  for (var i = 0 ; i < tableau.length; i++) { 
   for (var j = 0 ; j < tableau[i].length; j++) { 
    tableau[i][j]= 0 ;  
     console.log(tableau[i][j]);
   }
  }
  removeEle();
  
  nb_step=0;
  turn = 1;
  tmp_row=0;
  tmp_col=0;
  tmp_row_col=0;
  flag_choosen = 0;
  nb_white = 20;
  nb_black = 20;
  score_black = 0;
  score_white = 0;
  
  var alarmetext = document.querySelector('#alarmetext');
  alarmetext.innerHTML = "";
  render();
}

//enlever des elements repetes
function removeEle(){
  
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
function win(player) {  
                      
    var color="";
     if(3-player==1){
       color="Black";
     }else{
       color="White";
     }
     // montrer qui va ganger et ses resultats
    if(nb_white==0&&3-player==1){
      alert("player"+(3-player)+" '"+color+"' gagane! Resultat: "+score_black); 
      
      return true;
    }else if(nb_black==0&&3-player==2){
      alert("player"+(3-player)+" '"+color+"' gagane! Resultat: "+score_white); 
      
      return true;
    } 
}

//afficher notre damier
this.render();

