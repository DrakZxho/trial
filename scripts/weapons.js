var page=1;

function createWeaponChart(dato){

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
    
    var sel = dato.weapons[i].attributes;

    const maxatr = Math.max(sel.vit, sel.str, sel.def, sel.dex, sel.spr, sel.lck, sel.res, sel.mag);
    console.log(maxatr+(10-maxatr%10));

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
            maximum: 10,
            interval: 10,
            edgeLabelPlacement: "Shift",
        },
        //Initializing Chart Series
        series: [
            {
                type: "Radar",
                dataSource: [
                    { x: atrLN[0]+" : "+sel.vit, y: sel.vit },
                    { x: atrLN[1]+" : "+sel.str, y: sel.str },
                    { x: atrLN[2]+" : "+sel.def, y: sel.def },
                    { x: atrLN[3]+" : "+sel.dex, y: sel.dex },
                    { x: atrLN[4]+" : "+sel.spr, y: sel.spr },
                    { x: atrLN[5]+" : "+sel.lck, y: sel.lck },
                    { x: atrLN[6]+" : "+sel.res, y: sel.res },
                    { x: atrLN[7]+" : "+sel.mag, y: sel.mag }
                ],
                xName: "x",
                width: 2,
                yName: "y",
                drawType: 'Area',
                fill: '#04b9bf',
            }
        ],
    });
    chart.appendTo("#chart");
}//createWeaponChart

function createWeaponResult(dato){
    var sel = dato.weapons[i];
    var type = sel.type;
    switch(lang){

        case "en":
            var name = sel.name.en;
            var desc = sel.description.en;
            var prop = sel.properties.en;
            $("#legend").text("Weapon No."+(i+1)+".");
            break;

        default:
        
        case "es":
            var name = sel.name.es;
            var desc = sel.description.es;
            var prop = sel.properties.es;
            $("#legend").text("Arma nº "+(i+1)+".");
            break;
    }

    var out="<table><tr>";
    out+="<td style='width: 69px;'><img class='typeIcon' src='https://drakzxho.github.io/trial/graphics/weapon-type/"+type+".svg' alt='"+type+" icon' width='64' height='64'></td>";
    out+="<td><h1 class='name'>"+name+"</h1></td>";
    out+="</tr><tr>";
    out+="<td colspan=\"2\"><h3 class='description'>"+desc+"</h3></td>";
    out+="</tr><tr><td colspan=\"2\" rowspan=\"3\">";
    for(var index =0; index<prop.length; index++){
        if(prop[index]!=null)out+="<i class='property'>"+prop[index]+"</i>";
        else out+="<i class='property'>-</i>";
    }
    out+="</td></tr></table>";

    $("#result").html(out);

    createWeaponChart(dato);
}//createWeaponResult

function arrowMove(e){
    if(e.key=="ArrowLeft"){
        prevWeapon(dato);
    }else if(e.key=="ArrowRight"){
        nextWeapon(dato);
    }else if(e.key=="ArrowUp"){
        pageUp();
    }else if(e.key=="ArrowDown"){
        pageDown();
    }
}//arrowMove

function nextWeapon(dato){
    if(i<dato.weapons.length-1){
        i=i+1;
    }else{
        i=0;
    }
    createWeaponResult(dato);
}//nextWeapon

function prevWeapon(dato){
    if(i>0){
        i=i-1;
    }else{
        i=dato.weapons.length-1;
    }
    createWeaponResult(dato);
}//prevWeapon

function fillWeaponDatalist(dato){
    var out="";
    switch(lang){
        case "en":
            for(var index=0;index<dato.weapons.length;index++){
                out+="<option value=\""+dato.weapons[index].name.en+"\"/>";
            }
            break;

        default:

        case "es":
            for(var index=0;index<dato.weapons.length;index++){
                out+="<option value=\""+dato.weapons[index].name.es+"\"/>";
            }
            break;
    }
    $("#weaponslist").html(out);
}//fillWeaponDatalist

function changeToES(dato){
    lang="es";
    createWeaponResult(dato);
    $("title").text("Armas");
    fillWeaponDatalist(dato);
}//changeToES

function changeToEN(dato){
    lang="en";
    createWeaponResult(dato);
    $("title").text("Weapons");
    fillWeaponDatalist(dato);
}//changeToEN

function searchWeapon(term) {

    var pos;
    var match=false;
    var msgerr="";

    switch(lang){
        case "en":
            msgerr="Sorry, but we couldn't find \""+term+"\".";
            for(var index=0;index<dato.weapons.length;index++){
                if(dato.weapons[index].name.en==term){
                    pos=index;
                    match=true;
                }
            }
            break;

        default:

        case "es":
            msgerr="Lo sentimos, pero no hemos podido encontrar \""+term+"\".";
            for(var index=0;index<dato.weapons.length;index++){
                if(dato.weapons[index].name.es==term){
                    pos=index;
                    match=true;
                }
            }
            break;
    }

    if(match){
        i=pos;
        createWeaponResult(dato);
    }else{
        alert(msgerr);
    }
    
}//searchWeapon