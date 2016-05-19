var LifeMeter = function (args) {
    function getStyle(styleName) {
        var configs = new StyleConfigs().styles;
        for (var i = 0; i < configs.length; i++) {
            if (configs[i].shortName === styleName) {
                return configs[i];
            }
        }
        return null;
    }
    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' ||
                    script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        }
        else {
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    var month = args.month || 0;
    var day = args.day || 0;
    var year = args.year || 0;
    var gender = args.gender || '';
    var style = args.style || '';
    var styleConfig = null;
    function validateArgs() {
        return (month > 0 && day > 0 && year > 0 && (gender === 'male' || gender === 'female') && style !== '' && styleConfig != null);
    }
    loadScript('style-config.js', function () {
        styleConfig = getStyle(style);
        if (validateArgs()) {
            document.write('<iframe src="lifemeter.html?month=' + month + '&day=' + day + '&year=' + year + '&gender=' + gender + '&style=' + style + '" class="lifemeter style-' + style + '" height="' + styleConfig.height + '" width="' + styleConfig.width + '" style="border: 0; overflow: hidden; margin: 0; padding: 0" scrolling="no"></iframe>');
        }
        else {
            document.write('<div>Invalid LifeMeter parameters</div>');
        }
    });
};
