
window.onload = function() {
    var data = new Data();
    var calculator = new Calculator({
        birthMonth: 3,
        birthDay: 12,
        birthYear: 1984,
        expectancyData: data.Male
    })

    var results = calculator.calculate();

    calculator.toLog();

    var styleService = new StyleService({
        styles: styles
    });

    var container = document.getElementById('lifemeters');

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

    return canvas;
}