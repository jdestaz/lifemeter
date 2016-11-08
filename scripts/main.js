
var data = new Data();
var styleService = new StyleService({ styles: styles });

window.onload = function() {
    SetInitialInputValues();
    GenerateMeters();

    document.getElementById('go').addEventListener('click', GenerateMeters);
}

function SetInitialInputValues() {
    document.getElementById('input-month').value = 3;
    document.getElementById('input-day').value = 12;
    document.getElementById('input-year').value = 1984;
    document.getElementById('input-gender-male').checked = 'checked';
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