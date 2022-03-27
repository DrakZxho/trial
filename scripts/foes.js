var page=2;

function createFoeChart(dato){

    $("#chart").html("");

    switch(lang){
        case "en":
            atrLN=atrEN;
            break;

        default:
        
        case "es":  
            atrLN=atrES;
            break;                  
    }
    
    var max = dato.foes[i].maxattributes;
    var min = dato.foes[i].minattributes;

    var chart = new ej.charts.Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: "Category",
            labelPlacement: "OnTicks",
            interval: 1,
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            minimum: -0.3,
            maximum: 50,
            interval: 13,
            edgeLabelPlacement: "Shift",
        },
        //Initializing Chart Series
        series: [
            {
                type: "Radar",
                dataSource: [
                    { x: atrLN[0]+" : "+min.vit+"-"+max.vit, y: max.vit },
                    { x: atrLN[1]+" : "+min.str+"-"+max.str, y: max.str },
                    { x: atrLN[2]+" : "+min.def+"-"+max.def, y: max.def },
                    { x: atrLN[3]+" : "+min.dex+"-"+max.dex, y: max.dex },
                    { x: atrLN[4]+" : "+min.spr+"-"+max.spr, y: max.spr },
                    { x: atrLN[5]+" : "+min.lck+"-"+max.lck, y: max.lck },
                    { x: atrLN[6]+" : "+min.res+"-"+max.res, y: max.res },
                    { x: atrLN[7]+" : "+min.mag+"-"+max.mag, y: max.mag }
                ],
                xName: "x",
                width: 2,
                yName: "y",
                name: "max",
                drawType: 'Area',
                fill: '#04b9bf',
            },
            {
                type: "Radar",
                dataSource: [
                    { x: atrLN[0]+" : "+min.vit+"-"+max.vit, y: min.vit },
                    { x: atrLN[1]+" : "+min.str+"-"+max.str, y: min.str },
                    { x: atrLN[2]+" : "+min.def+"-"+max.def, y: min.def },
                    { x: atrLN[3]+" : "+min.dex+"-"+max.dex, y: min.dex },
                    { x: atrLN[4]+" : "+min.spr+"-"+max.spr, y: min.spr },
                    { x: atrLN[5]+" : "+min.lck+"-"+max.lck, y: min.lck },
                    { x: atrLN[6]+" : "+min.res+"-"+max.res, y: min.res },
                    { x: atrLN[7]+" : "+min.mag+"-"+max.mag, y: min.mag }
                ],
                xName: "x",
                width: 2,
                yName: "y",
                name: "min",
                drawType: 'Area',
                fill: '#bf3f5b',
            }
        ],
    });
    chart.appendTo("#chart");
}//createFoeChart

function createFoeResult(dato){
    var sel = dato.foes[i];
    var type = sel.type;
    switch(lang){

        case "en":
            var name = sel.name.en;
            var desc = sel.description.en;
            $("#legend").text("Foe No."+(i+1)+".");
            break;

        default:
        
        case "es":
            var name = sel.name.es;
            var desc = sel.description.es;
            $("#legend").text("Enemigo nº "+(i+1)+".");
            break;
    }

    var out="<table><tr>";
    out+="<td style='width: 69px;'><img class='typeIcon' src='https://drakzxho.github.io/trial/graphics/foe-type/"+type+".svg' alt='"+type+" icon' width='64' height='64'></td>";
    out+="<td><h1 class='name'>"+name+"</h1></td>";
    out+="</tr><tr>";
    out+="<td colspan=\"2\"><h3 class='description'>"+desc+"</h3></td></tr>";

    $("#result").html(out);

    createFoeChart(dato);
}//createFoeResult

function arrowMove(e){
    if(e.key=="ArrowLeft"){
        prevFoe(dato);
    }else if(e.key=="ArrowRight"){
        nextFoe(dato);
    }else if(e.key=="ArrowUp"){
        pageUp();
    }else if(e.key=="ArrowDown"){
        pageDown();
    }
}//arrowMove

function nextFoe(dato){
    if(i<dato.foes.length-1){
        i=i+1;
    }else{
        i=0;
    }
    createFoeResult(dato);
}//nextFoe

function prevFoe(dato){
    if(i>0){
        i=i-1;
    }else{
        i=dato.foes.length-1;
    }
    createFoeResult(dato);
}//prevFoe

function fillFoeDatalist(dato){
    var out="";
    switch(lang){
        case "en":
            for(var index=0;index<dato.foes.length;index++){
                out+="<option value=\""+dato.foes[index].name.en+"\"/>";
            }
            break;

        default:

        case "es":
            for(var index=0;index<dato.foes.length;index++){
                out+="<option value=\""+dato.foes[index].name.es+"\"/>";
            }
            break;
    }
    $("#foeslist").html(out);
}//fillFoeDatalist

function changeToES(dato){
    lang="es";
    createFoeResult(dato);
    $("title").text("Enemigos");
    fillFoeDatalist(dato);
}//changeToES

function changeToEN(dato){
    lang="en";
    createFoeResult(dato);
    $("title").text("Foes");
    fillFoeDatalist(dato);
}//changeToEN

function searchFoe(term) {

    var pos;
    var match=false;
    var msgerr="";

    switch(lang){
        case "en":
            msgerr="Sorry, but we couldn't find \""+term+"\".";
            for(var index=0;index<dato.foes.length;index++){
                if(dato.foes[index].name.en==term){
                    pos=index;
                    match=true;
                }
            }
            break;

        default:

        case "es":
            msgerr="Lo sentimos, pero no hemos podido encontrar \""+term+"\".";
            for(var index=0;index<dato.foes.length;index++){
                if(dato.foes[index].name.es==term){
                    pos=index;
                    match=true;
                }
            }
            break;
    }

    if(match){
        i=pos;
        createFoeResult(dato);
    }else{
        alert(msgerr);
    }
    
}//searchFoe