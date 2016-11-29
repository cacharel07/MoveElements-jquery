// Il faut que les élèment à déplacer soit en position absolute avec des tailles fixes
// Il faut également qu'ils comportent un id unique

$(document).ready(initialiser);
var test = 0;
var testR = 0;
var clicD = 0;
var clicR = 0;
var classe=indiquerClasse();

function initialiser()
{
    //$('.'+classe).css('position','absolute')
    $('body').append("<div class='menuoption'> <div class='optiondeplacer'><img src='img/deplacement.png'/></div><div class='optionrotation'><img src='img/rotation.png'/></div> </div>"); 
    $('body').append("<div class='message'>Veuillez arrêter l'action en cours pour pouvoir en effectuer une autre.</div>"); 
    $(".menuoption div").click(choixMenu);
    $("."+classe).mousedown(gererAction);
}

function choixMenu(evt){
    test=0;
    $(document).off("mousemove");
    var bouton=$(this).attr('class');    
    if(bouton=="optiondeplacer" || bouton=="optiondeplacer active"){
        if(clicD==1){
            clicD=0;
            $(".optiondeplacer.active").removeClass('active');//Si l'utilisateur clic sur le bouton activé, il se desactive, la classe active est alors retirée
        }
        else{
            $(".optiondeplacer").addClass('active');// Si l'utilisateur clic sur le bouton deplacement alors on ajoute la classe active
            $(".optionrotation.active").removeClass('active');// Et on retire la classe au bouton de rotation
            clicD=1;
            clicR=0;
        }
        
    } 
    else if(bouton=="optionrotation" || bouton=="optionrotation active"){// Reprise du même principe que pour le deplacement
        if(clicR==1){
            clicR=0;
            $(".optionrotation.active").removeClass('active');
        }
        else{
           
            $(".optionrotation").addClass('active');
            $(".optiondeplacer.active").removeClass('active');
            clicR=1;
            clicD=0;
        }
    }
}

function gererAction(evt){//La fonction gererDeplacement gerer 
    var classecliquee=$(this).attr('class');
    classecliquee = classecliquee.split(" ");//dans le cas ou l'élément cliqué a plusieurs classes, on les met dans un tableau.
    var nbclasses=classecliquee.length;
    for(i=0;i<nbclasses+1;i++){
       if(classe==classecliquee[i]){
            var elementclic=$(this).attr('id'); //On récupére l'id UNIQUE de l'élèment cliqué
            if(clicD==1){
                $(".menuoption").toggleClass("disabled");//Lorsque le déplacement est en cours, le menu devient inclicable jusqu'à ce que l'élèment soit positionné
                if(test==0){
                    $(document).mousemove(function(evt){ //Fonction qui permet de gérer le deplacement de l'élèment
                            var hauteur = $("#"+elementclic).height(); 
                            var largeur = $("#"+elementclic).width();
                            var y = evt.pageY;
                            var x = evt.pageX;  
                            $('#'+elementclic).css({'top': y-(hauteur/2)}); 
                            $('#'+elementclic).css({'left': x-(largeur/2)});
                        test=1;
                    })
                }
                else{ 
                    test=0;
                    $(document).off("mousemove"); //Si après avoir cliqué une première fois, l'utilisateur reclique alors l'élèment prend une nouvelle position fixe.
                }
            } 

            if (clicR==1){
                $(".menuoption").toggleClass("disabled");//Lorsque la rotation est en cours, le menu devient inclicable jusqu'à ce que la rotation soit arrété
                if(testR==0){
                    $("div#"+elementclic).removeClass("pause"); //Au lancement de la rotation, si la classe pause est présente, alors on l'enlève
                    $("div#"+elementclic).addClass("rotationinfinie");  //Et on ajoute la classe rotation infinie, ces deux classe sont definie en CSS
                    testR=1;
                }
                else {   
                    $("div#"+elementclic).addClass("pause");//Au clic suivant, on ajoute la classe pause
                    testR=0;
                }   
            }
             else {   
                $("div#"+elementclic).addClass("pause");//Au clic suivant, on ajoute la classe pause
                testR=0;
            }   
            if($(".menuoption").hasClass('disabled')){
                $(".message").css('display','block');
            }
            else{
                $(".message").css('display','none');
            }
        }
        else{
            
        }
   }
}
