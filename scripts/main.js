
var data = new Data();
var styleService = new StyleService({ styles: styles });

window.onload = function() {
    SetInitialInputValues();
    GenerateMeters();
}

function SetInitialInputValues() {
    document.getElementById('input-month').value = GetQueryParameter('month') || GetRandomIntInclusive(1, 12);
    document.getElementById('input-day').value = GetQueryParameter('day') || GetRandomIntInclusive(1, 28);
    document.getElementById('input-year').value = GetQueryParameter('year') || GetRandomIntInclusive(1940, 2010);
    
    var gender = GetQueryParameter('gender') || GetRandomGender();

    if(gender === 'male') { document.getElementById('input-gender-male').checked = 'checked'; }
    if(gender === 'female') { document.getElementById('input-gender-female').checked = 'checked'; }
}

function GenerateMeters() {
    var calculator = new Calculator({
        birthMonth: document.getElementById('input-month').value,
        birthDay: document.getElementById('input-day').value,
        birthYear: document.getElementById('input-year').value,
        expectancyData: (document.getElementById('input-gender-male').checked === 'checked') ? data.Male : data.Female
    })

    var results = calculator.calculate();

    var container = document.getElementById('lifemeters');
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }


    for(var i = 0; i < styles.length; i++) {
        var style = styles[i];
        var canvas = CreateCanvasForStyle(style)
        container.appendChild(canvas);
        
        var canvasWriter = new CanvasWriter({
            canvasId: canvas.id,
            height: style.height,
            width: style.width
        });

        style.renderTo(canvasWriter, styleService, results);
    }
}

function CreateCanvasForStyle(style) {
    var canvas = document.createElement('canvas');
    canvas.id = 'lifemeter-' + style.shortName;
    canvas.className = 'meter';

    return canvas;
}

function GetQueryParameter(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function GetRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRandomGender() {
    return GetRandomIntInclusive(0,1) === 0 ? 'male' : 'female';
}