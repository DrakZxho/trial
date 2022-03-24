let lang="es";
var i=0;
var dato;
var atrEN=new Array("VIT", "STR", "DEF", "DEX", "SPR", "LCK", "RES", "MAG");
var atrES=new Array("VIT", "FUE", "DEF", "DES", "ESP", "SUE", "RES", "MAG");
var atrLN;
var pages=new Array("https://drakzxho.github.io/trial/pages/index.html","https://drakzxho.github.io/trial/pages/weapons.html","https://drakzxho.github.io/trial/pages/foes.html")

function pageUp(){
    if(page<1){
        window.location.replace(pages[pages.length-1]);
    }else window.location.replace(pages[page-1]);
}

function pageDown(){
    if(page>pages.length-1){
        window.location.replace(pages[0]);
    }else window.location.replace(pages[page+1]);
}