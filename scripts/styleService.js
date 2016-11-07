var StyleService = (function() {

    function StyleService(args) {
        this.styles = args.styles;
    }

    StyleService.prototype.getImagePath = function(filename, style) {
        return 'styles/' + style.shortName + '/' + filename;
    }

    StyleService.prototype.getStyleByName = function(styleName) {

        for(var i = 0; i < this.styles.length; i++) {
            if(this.styles[i].shortName === styleName)
                return this.styles[i];
        }

        return null;
    }

    return StyleService;
})();