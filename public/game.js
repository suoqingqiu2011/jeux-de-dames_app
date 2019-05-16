/* sessionStorage stocke les données temporainement lorsque la page est ouverte */
/*if(sessionStorage["user"]=== undefined){

var user = prompt("Enter your username: ");
  
  if (sessionStorage["password"]=== undefined){
    var password= prompt("Enter your password: ");
 if(user){
    sessionStorage["user"]= user;
     if(password){
         sessionStorage["password"]= password;

   /*ws.addEvenListener('open',function(event){
       ws.send(JSON.stringify({
         type : "new_connection",
         username : user

       })); */
   /* let text = document.querySelector("main");
    text.innerHTML="BONJOUR "+ sessionStorage["user"];
    console.log(text);
    }
  }
  }
 }
fetch('/connect/:user')
 .then(function(res){
  return res.json();
})
  .then(function(connected_users){
     let table = document.createElement("table");
     let main = document.querySelector("main");
     main.appendChild(table);
    let tr = document.createElement("tr");
     let  td = document.createElement("td");
     tr.appendChild(td);
    
  
  
    console.log(JSON.stringify(connected_users));
});*/
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


function render(){
  
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
            if (tableau[i][j]!=3&&tableau[i][j]!=5){ 
              if(nb_step==0){
                if(i>=6){
                    tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/e95d2bec-803c-4cf7-9842-75a2a6969008%2Fpion_noir.png?1557155856235') repeat scroll center; -webkit-background-size: cover;";
                    tdd.style.borderRadius = "39px";  
                    tableau[i][j]=1;
                }
                if(i<=3){
                    tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/e95d2bec-803c-4cf7-9842-75a2a6969008%2Fpion_blanc.png?1557155858765') repeat scroll center; -webkit-background-size: cover; ";
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
          
          if (tableau[i][j]!=3){
            //console.log("here");
            if(tableau[i][j]==1){
              tdd.className ="player1";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/e95d2bec-803c-4cf7-9842-75a2a6969008%2Fpion_noir.png?1557155856235') repeat  scroll center;  -webkit-background-size: cover; ";
              tdd.style.borderRadius = "39px";

            }else if (tableau[i][j]==2){
              tdd.className ="player2";
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/e95d2bec-803c-4cf7-9842-75a2a6969008%2Fpion_blanc.png?1557155858765') repeat  scroll center;  -webkit-background-size: cover; ";
              tdd.style.borderRadius = "39px";

            }else if(tableau[i][j]==4){ 
            
            tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/e95d2bec-803c-4cf7-9842-75a2a6969008%2Fsuper_pion_noir.png?1557531091227') repeat scroll center; -webkit-background-size: cover;";
            tdd.style.borderRadius = "35px";
            tdd.style.border= "3px solid blue";
          
            }else if(tableau[i][j]==5){
            
            tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/e95d2bec-803c-4cf7-9842-75a2a6969008%2Fsuper_pion_blanc.png?1557531095454') repeat scroll center; -webkit-background-size: cover;";
            
            tdd.style.borderRadius = "35px";
            tdd.style.border= "3px solid blue";
     
            }     
            //l'animation sur le pion exact
            if(tableau[i][j]==0){
              var row = tdd.dataset.row;
              var column = tdd.dataset.column;

                 if(turn==1){
                   if(row<9&&column<9){
                     // les possibilités pour se deplacer dans le dames
                     if(tableau[i+1][j+1]==3){
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";              
                     }
                     // prevoir l
                     if(nb_step!=0){  
                       pre_mange_position(i,j,row,column,tdd,1); //console.log((i+1)+' '+(j+1)+' '+tableau[i+1][j+1]+' 781');
                     }     
                   }
                   
                     
                   if(row<9&&column>0){
                     if(tableau[i+1][j-1]==3){
                         tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";
                     }
                     if(nb_step!=0){
                       pre_mange_position(i,j,row,column,tdd,1); //console.log(tableau[i+1][j-1]+' 782');
                     }    
                   }
                 }
              
              
                if(turn==2){
                  if(row>0&&column<9){
                   if(tableau[i-1][j+1]==3){
                       tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; 
                   }
                    if(nb_step!=0){
                      pre_mange_position(i,j,row,column,tdd,2); //console.log('783');
                    }     
                  }
                  if(row>0&&column>0){
                  // lorsque j'utilise un pion il change de couleur dans le cas 3 
                   if(tableau[i-1][j-1]==3){
                       tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;";
                   }
                    if(nb_step!=0){
                      pre_mange_position(i,j,row,column,tdd,2); //console.log('784');
                    }
                  }
                }   
              
            }
            
          }else if(tableau[i][j]==3){
            console.log("here tmp_row_col:"+tmp_row_col);
            tdd.className ="choosen";   
            
            if(turn==1){
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/e95d2bec-803c-4cf7-9842-75a2a6969008%2Fpion_darkred.png?1557155864578') repeat scroll center; -webkit-background-size: cover;";
            }else if(turn==2){
              tdd.style="background:rgb(205,141,80) url('https://cdn.glitch.com/e95d2bec-803c-4cf7-9842-75a2a6969008%2Fpion_gold.png?1557156089606') repeat scroll center; -webkit-background-size: cover;";
            }
              //tmp_row_col = 0;
            //}
            tdd.style.borderRadius = "35px";
            tdd.style.border= "3px solid blue";
     
          }  
      } 
      tab.appendChild(trr);
    }
  divv.appendChild(tab);
  tab.addEventListener('click', function(event) { 
      var row = event.target.dataset.row;
      var column = event.target.dataset.column;
      //console.log('column'+column);
      if (row&&column) {   
        
        play(parseInt(row),parseInt(column));
        
        removeEle();
        render();
      }else{
        alert('wrong');
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
  for(var i = 0; i < tableau.length;i++){
        for(var j = 0; j < tableau[i].length;j++){
           console.log('tableau['+i+']['+j+']='+tableau[i][j]);
        }
   }
   console.log('********************');
}

function pre_mange_position(i,j,row,column,tdd,turn){
  
    if(row<8&&column<8){
        if((tableau[i+1][j+1]==(3-turn))&&tableau[i+2][j+2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7891');
         }
    }
    if(row<8&&column>1){
        if((tableau[i+1][j-1]==(3-turn))&&tableau[i+2][j-2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7892');
         }
    }
    if(row>1&&column<8){
        if((tableau[i-1][j+1]==(3-turn))&&tableau[i-2][j+2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7893');
         }
    }
    if(row>1&&column>1){
        if((tableau[i-1][j-1]==(3-turn))&&tableau[i-2][j-2]==3){
             tdd.style="-webkit-animation:twinkling 1.5s infinite ease-in-out alternate; background: blue;"; //console.log('7894');
        }
    }
}



var turn = 1;
var tmp_row=0;
var tmp_col=0;
var flag_choosen = 0;
var flag_change_color = 0;

function play(row,column){
  var alerttxt = document.querySelector('#alarmetext');
    if((row+column)%2==1){
      alerttxt.innerHTML="";
      if(tableau[row][column] != 0 ){  console.log("tableau[row][column] :"+tableau[row][column] +" turn: "+turn);
         if(tableau[row][column] != 3 && tableau[row][column] == turn){ 
           if(nb_step==0){
             flag_change_color = tableau[row][column];
           }
             
           if(flag_change_color!=tableau[row][column]){
             //tmp_row_col = 3 - tableau[row][column]; 
             flag_change_color = tableau[row][column];
           
           }
           console.log("nb_step:"+nb_step);
           if(flag_choosen==1){
             console.log("i am here");
             if(tableau[tmp_row][tmp_col]!=3){
               flag_choosen=0;
             }
             
             if(tableau[row][column]==tmp_row_col){
               console.log("same here");
               tableau[tmp_row][tmp_col]=flag_change_color;
             } else{
               
               flag_choosen=1;  
             }    
             tmp_row_col = turn;
             console.log("tmp_row_col:"+tmp_row_col);
              console.log('tmp: tableau['+tmp_row+']['+tmp_col+']= '+tableau[tmp_row][tmp_col]);
             
           }else if(flag_choosen==0){
             flag_choosen=1;  
             tmp_row_col = turn;
             
           }
           
           tmp_row=row;
           tmp_col=column; console.log('old: tableau['+tmp_row+']['+tmp_col+']= '+tableau[tmp_row][tmp_col]);
           if((turn==1&&row==0)||(turn==2&&row==9)){
             tableau[row][column]=4;
           }else{
             tableau[row][column]=3;
           }
           console.log('new: tableau['+row+']['+column+']= '+tableau[row][column]);
           console.log('flag_change_color '+flag_change_color);
           
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
             
         console.log('choosen : tableau['+row+']['+column+']='+tableau[row][column]);
         
         //console.log('tableau['+row+']['+column+']='+tableau[row][column]);
         
      }else if(tableau[row][column]==0){
   
          if(tmp_row_col==1){ 
              if(((tmp_row==row-2)&&(tmp_col==column+2)&&(tableau[row-1][column+1]==3-turn))||((tmp_row==row-2)&&(tmp_col==column-2)&&(tableau[row-1][column-1]==3-turn))||((tmp_row==row+2)&&(tmp_col==column+2)&&(tableau[row+1][column+1]==3-turn))||((tmp_row==row+2)&&(tmp_col==column-2)&&(tableau[row+1][column-1]==3-turn)) )
               {
                  mangerPion(row,column,turn,alerttxt);

               }else if(((tmp_row==row+1)&&(tmp_col==column+1))||((tmp_row==row+1)&&(tmp_col==column-1))){
                 deplacement(row,column,turn);
                 
                 //win(row,column,tableau[row][column]);
               }else{
                 alerttxt.innerHTML= "Can't move the chess piece here.";
                 alert("Can't move the chess piece here.");
               }
             
           }
           if(tmp_row_col==2){
             if(((tmp_row==row-2)&&(tmp_col==column+2)&&(tableau[row-1][column+1]==3-turn))||((tmp_row==row-2)&&(tmp_col==column-2)&&(tableau[row-1][column-1]==3-turn))||((tmp_row==row+2)&&(tmp_col==column+2)&&(tableau[row+1][column+1]==3-turn))||((tmp_row==row+2)&&(tmp_col==column-2)&&(tableau[row+1][column-1]==3-turn)) )
             {
                mangerPion(row,column,turn,alerttxt);

             }else if(((tmp_row==row-1)&&(tmp_col==column+1))||((tmp_row==row-1)&&(tmp_col==column-1))){
               deplacement(row,column,turn);             

               //win(row,column,tableau[row][column]);
             }else{
               alerttxt.innerHTML= "Can't move the chess piece here.";
               alert("Can't move the chess piece here.");
             }   
          }
       
      }
      return;
    
  }else{
    alerttxt.innerHTML= "Can't pose the chess piece at the blanc.";
    alert("Can't pose the chess piece at the blanc.");
  }
}

function deplacement(row,column,player){
   turn = tmp_row_col;
   tmp_row=row;
   tmp_col=column;

   tableau[row][column]=turn;
   if(player==1&&row==0){
     tableau[row][column]=4;
   }else if (player==2&&row==9){
     tableau[row][column]=5;
   }
   turn = 3 - turn;

   enlever_deplacement(row,column,tmp_row_col);

   //console.log("i am here1.. tmp_row_col:"+tmp_row_col);
   nb_step++;
   //console.log('row'+row);
   console.log('tableau['+row+']['+column+']='+tableau[row][column]);
}

// se deplacer sur un espace vide dans ma ligne droite
function enlever_deplacement(row,column,player){
    // je me position sur mon pion et je l'enleve avec le cas t=0;
    if(row<9&&column<9&&(tableau[row+1][column+1]==3||tableau[row+1][column+1]==6)){
      tableau[row+1][column+1] = 0;  console.log("here2");
    }
    if(row<9&&column>0&&(tableau[row+1][column-1]==3||tableau[row+1][column-1]==6)){
      tableau[row+1][column-1]=0;   console.log("here3");
    }
    if(row>0&&column<9&&(tableau[row-1][column+1]==3||tableau[row-1][column+1]==6)){
      tableau[row-1][column+1]=0;   console.log("here4");
    }
    if(row>0&&column>0&&(tableau[row-1][column-1]==3||tableau[row-1][column-1]==6)){
      tableau[row-1][column-1]=0;   console.log("here5");
    }

}
// la methode qui consiste a manger les pions 
function mangerPion(row,column,player,alerttxt){
    
       if(((tmp_row==row-2)&&(tmp_col==column+2)&&(tableau[row-1][column+1]==3-player))||((tmp_row==row-2)&&(tmp_col==column-2)&&(tableau[row-1][column-1]==3-player))||((tmp_row==row+2)&&(tmp_col==column+2)&&(tableau[row+1][column+1]==3-player))||((tmp_row==row+2)&&(tmp_col==column-2)&&(tableau[row+1][column-1]==3-player)) )
       {
           turn = tmp_row_col ;
           tmp_row=row;
           tmp_col=column;

           nb_step++;
           console.log("wo shi "+turn);
           //mangerPion(tmp_row,tmp_col,turn,alerttxt);
           console.log("wo shiii "+turn);
             //win(row,column,tableau[row][column]);
  
           enleverPion(row,column,tmp_row_col);
           tableau[row][column]=turn;  console.log("makesure0 ");
         
        
         // definir des deux damiers cas egale a 4 et cas egale a 5
           if((((row<9&&column>0)?tableau[row+1][column-1]:3-player)==3-player&&((row<8&&column>1)?tableau[row+2][column-2]:1)==0)||(((row<9&&column<9)?tableau[row+1][column+1]:3-player)==3-player&&((row<8&&column<8)?tableau[row+2][column+2]:1)==0)||(((row>0&&column>0)?tableau[row-1][column-1]:3-player)==3-player&&((row>1&&column>1)?tableau[row-2][column-2]:1)==0)||(((row>0&&column<9)?tableau[row-1][column+1]:3-player)==3-player&&((row>1&&column<8)?tableau[row-2][column+2]:1)==0)){
              alerttxt.innerHTML = "you don't finish eating the pions";
             // tableau[row][column]=3;
             //les deux damiers definis
           }else{
             if(player==1&&row==0){
               tableau[row][column]=4;
             }else if (player==2&&row==9){
               tableau[row][column]=5;
             }
             console.log('bord: tableau['+row+']['+column+']: '+tableau[row][column]);
             turn = 3 - turn;
             console.log("final turn1: "+turn);
           }
       return;
       }
} 

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
}

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
  flag_choosen = 0;
  flag_change_color = 0;
  
  var alarmetext = document.querySelector('#alarmetext');
  alarmetext.innerHTML = "";
  render();
}

function removeEle(){
  
  var removeTab = document.getElementById('plateau');
  var parentEl = removeTab.parentElement;
  parentEl.removeChild(removeTab);

  var removeBut = document.getElementById('bt');
  var parentEl1 = removeBut.parentElement;
  parentEl1.removeChild(removeBut);
}


this.render();
