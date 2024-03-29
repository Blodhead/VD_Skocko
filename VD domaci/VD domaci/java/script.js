///////////////////////////////////////////////////////////

pobeda = "Torbica"

cvarcici = 7;
boskici = 7;
poeni = 0;

var model = {
    
    matrix : [

    {pokusaj : [0,0,0,0], pogodak : [false,false,false,false]},
    {pokusaj : [0,0,0,0], pogodak : [false,false,false,false]},
    {pokusaj : [0,0,0,0], pogodak : [false,false,false,false]},
    {pokusaj : [0,0,0,0], pogodak : [false,false,false,false]},
    {pokusaj : [0,0,0,0], pogodak : [false,false,false,false]},
    {pokusaj : [0,0,0,0], pogodak : [false,false,false,false]},
    {pokusaj : [0,0,0,0], pogodak : [false,false,false,false]},

]
}

///////////////// START - INITIALIZATION //////////////////



function start(){
    //SETUP

    if(window.location.href.includes('skocko-uputstvo.htm'))
        initUputstvo();
        else if(window.location.href.includes('skocko-igra.html'))
        initIgra();
        else initPodesavanja();
    
    
};

////////////////////// UPUTSTVO //////////////////////////

var p1Flag;
var p2Flag;

function initUputstvo(){

    document.getElementById("Cvarak").addEventListener("click", setP1);
    document.getElementById("Bosko").addEventListener("click", setP2);

};

///////////////////////////////////////////////////////////

function setP1() {
    p2Flag = 1;

    if((p1Flag == true) && (p2Flag == true))
    window.location.href = "../html/skocko-podesavanja.html";

}

function setP2() {
    p1Flag = 1;

    if((p1Flag == true) && (p2Flag == true))
    window.location.href = "../html/skocko-podesavanja.html";

}

///////////////////// PODESAVANJA /////////////////////////

var cvarkov = [0,0,0,0]
var boskic = [0,0,0,0]

var turn = "Cvarkov"

function initPodesavanja(){

    document.getElementById('Skocko').addEventListener('click',addElement);
    document.getElementById('Kordun').addEventListener('click',addElement);
    document.getElementById('Lika').addEventListener('click',addElement);
    document.getElementById('Banija').addEventListener('click',addElement);
    document.getElementById('Slavonija').addEventListener('click',addElement);
    document.getElementById('RepublikaRrspka').addEventListener('click',addElement);

    document.getElementById('Potvrdi').addEventListener('click',endPodesavanjaTurn);

    document.getElementById('igraci').innerHTML = "На потезу је Чварков!";

}
///////////////////////////////////////////////////////////

function addElement(){

    var icon = this.id; 

    switch(turn){

        case "Cvarkov":{

            for(var i = 0; i < 4; i++){

                if(cvarkov[i] == 0){
                    cvarkov[i] = this.id;
                    document.getElementById('n' + (i+1)).innerHTML = "<img class=\"icons\" id=" + (i+1) + " onclick=\"\" src=\"../Images/" + icon + ".png\" alt=\"\">"
                    document.getElementById(i+1).addEventListener('click',removeElement);
                    break;
                }

            }
            break;
        }
        case "Boskic":{

            for(var i = 0; i < 4; i++){

                if(boskic[i] == 0){
                    boskic[i] = this.id;
                    document.getElementById('n' + (i+1)).innerHTML = "<img class=\"icons\" id=" + (i+1) + " onclick=\"\" src=\"../Images/" + icon + ".png\" alt=\"\">"
                    document.getElementById(i+1).addEventListener('click',removeElement);
                    break;
                }

            }
            break;
        }
    }

}

///////////////////////////////////////////////////////////

function removeElement(){

    if(turn == "Cvarkov"){
        cvarkov[(parseInt(this.id)-1)] = 0;
        document.getElementById('n' + this.id).innerHTML = "";
    }
    else if(turn == "Boskic"){
        boskic[(parseInt(this.id)-1)] = 0;
        document.getElementById('n' + this.id).innerHTML = "";
    }

}

///////////////////////////////////////////////////////////

function endPodesavanjaTurn(){

    if(turn == "Cvarkov") {

        if(isFull(cvarkov) == true)
        turn = "Boskic";
        else {alert("Чварков, унесите све ознаке, немојте се зафркавати...");return;}
        document.getElementById('igraci').innerHTML = "На потезу је Бошкић!";
    }
    else {
        if(isFull(boskic) == true)
        turn = "Cvarkov";
        else {alert("Бошкић, унесите све знакове!"); return;}
        } 

    for(var i = 0; i < 4; i++){
        //mora i za citavu matricu da radi!!!!!
        document.getElementById('n' + (i+1)).innerHTML =  "" ;

    }

    if(isFull(cvarkov) && isFull(boskic)){ ////ekskluzivno za ekran za podesavanja

        localStorage.setItem('Igrac1', JSON.stringify(cvarkov));
        localStorage.setItem('Igrac2', JSON.stringify(boskic));

        document.getElementById('Skocko').removeEventListener('click',addElement);
        document.getElementById('Kordun').removeEventListener('click',addElement);
        document.getElementById('Lika').removeEventListener('click',addElement);
        document.getElementById('Banija').removeEventListener('click',addElement);
        document.getElementById('Slavonija').removeEventListener('click',addElement);
        document.getElementById('RepublikaRrspka').removeEventListener('click',addElement);
    
        document.getElementById('Potvrdi').removeEventListener('click',endPodesavanjaTurn);

        window.location.href = "../html/skocko-igra.html";

    }

}

///////////////////////////////////////////////////////////

function isFull(arr){

    for(var i = 0; i < arr.length ; i++){

        if(arr[i] == 0) return false;

    }

    return true;

}

///////////////////////// IGRA ////////////////////////////

var timer = 60;

var row = 0,col = 0;
var wait = true;

function initIgra(){
    
    document.getElementById('Start').addEventListener('click', startTimer);
    document.getElementById('NovaIgra').addEventListener('click', newGame);

    cvarkov = JSON.parse(localStorage.getItem('Igrac1'));
    boskic = JSON.parse(localStorage.getItem('Igrac2'));

    turn = "Boskic";

    buttonsON(false);

}

///////////////////////////////////////////////////////////

function addSign(){

    var icon = this.id; 


    for(var i = 0; i < 4; i++){

        if(model.matrix[row].pokusaj[i] == 0){
            icon = icon.slice(0,-1);
            model.matrix[row].pokusaj[i] = icon;
            document.getElementById(""+ row + i).innerHTML = "<img class=\"icons\" id="+ "2" + row + (i+1) +" onclick=\"\" src=\"../Images/" + icon + ".png\" alt=\"\">"
            document.getElementById("2" + row + (i+1)).addEventListener('click',removeSign);
            break;
        }

    }

}
///////////////////////////////////////////////////////////

function removeSign(){

    document.getElementById(this.id).removeEventListener('click',removeSign);
    document.getElementById(""+ row + (parseInt(this.id)- parseInt("2" + row + "1"))).innerHTML = "";
    model.matrix[row].pokusaj[parseInt(this.id)-parseInt("2" + row + "1")] = 0;

}


///////////////////////////////////////////////////////////
function check(){ 

    for(var i = 0; i < 4 ; i++){
        if(document.getElementById("" + row + i).innerHTML == "&nbsp; ") {
            alert("Нису сва пољу попуњена!");
            return;
        }

    }

    switch(turn){

        case "Cvarkov":{provera(cvarkov); cvarcici--; poeni = cvarcici; break;}
        case "Boskic":{provera(boskic); boskici--; poeni = boskici; break;}

    }

    endTurn();

}
//////////////////////////////////////////////////////////

function provera(igr){
    var correct = 0, wrong = 0;
    
    var igrac = {

        matrix : [
    
        {kombinacija:[0,0,0,0], pogodak : [0,0,0,0]}            
    ]
    }

    igrac.matrix[0].kombinacija = igr;

    for(var i = 0; i < 4; i++){

        if(model.matrix[row].pokusaj[i] == igrac.matrix[0].kombinacija[i]) {
            model.matrix[row].pogodak[i] = true; 
            igrac.matrix[0].pogodak[i] = 1;
            correct++;
        }

    }  

    for(var i = 0; i < 4; i++){

        if(igrac.matrix[0].pogodak[i] != 1)
        for(var j = 0; j < 4; j++)
            if(model.matrix[row].pogodak[j] != true)

                if(model.matrix[row].pokusaj[j] == igrac.matrix[0].kombinacija[i]){
                igrac.matrix[0].pogodak[i] = 2;
                wrong++;
                model.matrix[row].pogodak[j] = true;
                break;
                }


    }

    for(var i = 0 ; i < 4 ; i++){
        
        if(correct-- > 0)
            document.getElementById('1' + row + i).style.backgroundColor = "red";

        else if(wrong-- >0)

            document.getElementById('1' + row + i).style.backgroundColor = "yellow";

    }

    document.getElementById("dd" + row).disabled = true;

    row++;
        
    

}


///////////////////////////////////////////////////////////

function endTurn(){

    var temp = 0;

    for(var i = 0; i < 4 ; i++){
        if(document.getElementById("1" + (row-1) + i).style.backgroundColor == "red") temp++;
    }

    if(temp == 4) {

        buttonsON(false);
        row--;
        document.getElementById("Sledeci").innerHTML = "Освијили сте: " + poeni + " поена! <br> <button onclick=\"resetTimer()\" id=\"Ddugme\" class=\"btn btn-primary\" style=\"width: 150px; border: black; border: 2px solid black; font-size: medium; font-family:cursive; color: white;\">Следећи играч</button>"
        document.getElementById("Ddugme").addEventListener('click',nextPlayer);

        for(var i = 0; i < 4; i++)
        if(turn == "Boskic")
        document.getElementById('n' + (i+1)).innerHTML = "<img class=\"icons\" src=\"../Images/" + boskic[i] + ".png\" alt=\"\">";
        else
        document.getElementById('n' + (i+1)).innerHTML = "<img class=\"icons\" src=\"../Images/" + cvarkov[i] + ".png\" alt=\"\">";

    }

}

///////////////////////////////////////////////////////////

function nextPlayer(){


    while(row>=0){
        for(var i = 0; i < 4 ; i++){
        
        model.matrix[row].pokusaj[i] = 0;
        model.matrix[row].pogodak[i] = false;

        document.getElementById(""+ row + i).innerHTML = "";
        document.getElementById('1' + row + i).style.backgroundColor = "rgb(139, 136, 136)";

        }
        row--;
    }

    row=0;
    document.getElementById("Sledeci").innerHTML = "";

    for(var i = 0; i < 4; i++)
    if(turn == "Boskic")
    document.getElementById('n' + (i+1)).innerHTML = "";
    else
    document.getElementById('n' + (i+1)).innerHTML = "";

    if(turn == "Boskic"){
        turn = "Cvarkov"
        //document.getElementById('Start').disabled = false;
    }else if(turn == "Cvarkov") {endGame();return;}

    buttonsON(true);

}

///////////////////////////////////////////////////////////

function buttonsON(bool){

    if(bool == true){

        document.getElementById('dd0').disabled = false;
        document.getElementById('dd1').disabled = false;
        document.getElementById('dd2').disabled = false;
        document.getElementById('dd3').disabled = false;
        document.getElementById('dd4').disabled = false;
        document.getElementById('dd5').disabled = false;
        document.getElementById('dd6').disabled = false;

        document.getElementById('dd0').addEventListener('click',check);
        document.getElementById('dd1').addEventListener('click',check);
        document.getElementById('dd2').addEventListener('click',check);
        document.getElementById('dd3').addEventListener('click',check);
        document.getElementById('dd4').addEventListener('click',check);
        document.getElementById('dd5').addEventListener('click',check);
        document.getElementById('dd6').addEventListener('click',check);

        document.getElementById('Skocko1').addEventListener('click',addSign);
        document.getElementById('Kordun1').addEventListener('click',addSign);
        document.getElementById('Lika1').addEventListener('click',addSign);
        document.getElementById('Banija1').addEventListener('click',addSign);
        document.getElementById('Slavonija1').addEventListener('click',addSign);
        document.getElementById('RepublikaRrspka1').addEventListener('click',addSign);

    }
    else if(bool == false){

        document.getElementById('dd0').disabled = true;
        document.getElementById('dd1').disabled = true;
        document.getElementById('dd2').disabled = true;
        document.getElementById('dd3').disabled = true;
        document.getElementById('dd4').disabled = true;
        document.getElementById('dd5').disabled = true;
        document.getElementById('dd6').disabled = true;

        document.getElementById('dd0').removeEventListener('click',check);
        document.getElementById('dd1').removeEventListener('click',check);
        document.getElementById('dd2').removeEventListener('click',check);
        document.getElementById('dd3').removeEventListener('click',check);
        document.getElementById('dd4').removeEventListener('click',check);
        document.getElementById('dd5').removeEventListener('click',check);
        document.getElementById('dd6').removeEventListener('click',check);

        document.getElementById('Skocko1').removeEventListener('click',addSign);
        document.getElementById('Kordun1').removeEventListener('click',addSign);
        document.getElementById('Lika1').removeEventListener('click',addSign);
        document.getElementById('Banija1').removeEventListener('click',addSign);
        document.getElementById('Slavonija1').removeEventListener('click',addSign);
        document.getElementById('RepublikaRrspka1').removeEventListener('click',addSign);

    }

}


///////////////////////////////////////////////////////////
                /////// TIMER ///////
///////////////////////////////////////////////////////////

function startTimer() {

    if(wait == true){

        setTimeout(function(){ alert("Почиње играч Чварков"); }, 0); 
        wait = false;
        buttonsON(true);

    }

    min = parseInt(timer);

    if (timer < 1 && end == false) {
        document.getElementById('time-left').innerHTML = "Време је истекло!";
        document.getElementById("time").innerHTML = min.toString();
        return;
    }
if(document.getElementById("time") != null)
    document.getElementById("time").innerHTML = min.toString();
    timer--;

    if(parseInt(timer) == 0){

        buttonsON(false);
        row--;
        document.getElementById("Sledeci").innerHTML = "Освијили сте: " + poeni + " поена! <br> <button onclick=\"resetTimer()\" id=\"Ddugme\" class=\"btn btn-primary\" style=\"width: 150px; border: black; border: 2px solid black; font-size: medium; font-family:cursive; color: white;\">Следећи играч</button>"
        document.getElementById("Ddugme").addEventListener('click',nextPlayer);

        for(var i = 0; i < 4; i++)
        if(turn == "Boskic"){
        document.getElementById('n' + (i+1)).innerHTML = "<img class=\"icons\" src=\"../Images/" + boskic[i] + ".png\" alt=\"\">";boskici = 0;}
        else{
        document.getElementById('n' + (i+1)).innerHTML = "<img class=\"icons\" src=\"../Images/" + cvarkov[i] + ".png\" alt=\"\">";cvarcici = 0;}

        timer = 60;
    }

    setTimeout(function () {
        startTimer();
    }, 1000);



}

function resetTimer(){

    document.getElementById('time-left').innerHTML = "Преостало време за погађање:";
    document.getElementById("time").innerHTML = min.toString();
    timer = 60;

}

///////////////////////////////////////////////////////////

function newGame(){

    localStorage.setItem('Igrac1',0);
    localStorage.setItem('Igrac1',0);
    
    window.location.href = "../html/skocko-podesavanja.html";
}
var end = false;
function endGame(){

    timer = 0;
    end = true;
    clearTimeout(function () {
        startTimer();
    }, 1000);
    if(cvarcici >= boskici) pobeda = "Cvarkov"
    else pobeda = "Boskic";

    document.getElementById('Voditeljka').pause();

    if(pobeda == "Boskic"){

        var x = document.createElement("VIDEO");

        x.setAttribute("src","../video/Boskic pobeda.mp4");

        x.setAttribute("width", "270");
        x.setAttribute("height", "190");
        x.setAttribute("autoplay", "autoplay");
        document.getElementById("time-left").innerHTML = "Честитам на победи Бошкић, али дошло је до преступа...";
        document.getElementById("timer").innerHTML = "";
        document.getElementById("time-left").appendChild(x);

    }
    else if(pobeda == "Cvarkov"){

        var x = document.createElement("VIDEO");

        x.setAttribute("src","../video/Cvarkov pobeda.mp4");

        x.setAttribute("width", "270");
        x.setAttribute("height", "190");
        x.setAttribute("autoplay", "autoplay");
        document.getElementById("time-left").innerHTML = "Честитам Ђорђе Чварков!";
        document.getElementById("timer").innerHTML = "";
        document.getElementById("time-left").appendChild(x);

    } 

    buttonsON(false);

}


///////////////////////////////////////////////////////////
window.onload = start;
///////////////////////////////////////////////////////////