/*!
 * jQuery fancy picture gallery and collage
 * Original author: @davidverme
 * Licensed under the MIT license
 */

;(function ( $, window, document ) {
    var w = $(window);
    var defaults = {
        maxSize: Math.min(w.width(), w.height()) / 2,
        minSize: Math.min(w.width(), w.height()) / 6
    };

    function FancyCollage( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._items = [];

        this.init();
    }

    FancyCollage.prototype._calculateSize = function(){
        var e = $(this.element);
        var currentSize = this.options.minSize;
        do {
            this._columns = Math.floor(e.width() / currentSize);
            this._size = Math.floor(e.width() / this._columns);
            this._rows = Math.floor(e.height() / this._size);
            currentSize = currentSize + 1;
        } while(Math.floor(e.height() / (e.width() / (this._columns - 1))) >= this._rows)
    };

    FancyCollage.prototype.init = function () {
        debugger;
        this._pictureIndex = 0;
        this._elementIndex = 0;
        this.createBoxes();
        this.makeItFancy();
        this.loadPictures(function(){
            //this.startPictureChangeAnimation();
        });
    };

    FancyCollage.prototype.createBoxes = function () {
        var el = $(this.element);
        el.empty();
        var initialTop = 0;
        var initialLeft = 0;

        if(el.css("position") == "static"){
            initialTop = el.position().top;
            initialLeft = el.position().left;
        }

        this._calculateSize();
        for(var i = 0; i < this._rows; i++){
            for(var j = 0; j < this._columns; j++){
                var p = document.createElement("div");
                $(p).appendTo(el)
                    .addClass("fancyCollageItem")
                    .addClass("smallFancyCollageItem")
                    .css("width", this._size)
                    .css("height", this._size)
                    .css("top", initialTop + this._size * i)
                    .css("left", initialLeft + this._size * j);

                if(!this._items[i]){
                    this._items[i] = [];
                }
                this._items[i][j] = p;
            }
        }
    };

    FancyCollage.prototype.makeItFancy = function () {
        var l = this._items;
        var me = this;

        function addBox(size){
            var q = 0;
            var validFound = false;
            while (!validFound && q < (me._columns * me._rows)){
                var posX = Math.floor(Math.random() * (me._rows - size));
                var posY = Math.floor(Math.random() * (me._columns - size));
                q++;

                var isValid = true;
                for(var j=0; j<=size; j++){
                    for(var k=0; k<=size; k++){
                        if(!$(l[posX + j][posY + k])
                            || !$(l[posX + j][posY + k]).hasClass("smallFancyCollageItem")){
                            isValid = false;
                        }
                    }
                }

                if(isValid) {
                    for(j=0; j<=size; j++){
                        for(k=0; k<=size; k++){
                            if(j !== 0 || k !== 0){
                                $(l[posX + j][posY + k]).remove();
                                l[posX + j][posY + k] = null;
                            }

                            $(l[posX][posY]).removeClass("smallFancyCollageItem")
                                .addClass("fancyCollageItem-" + size)
                                .css("width", me._size * (1 + size))
                                .css("height", me._size * (1 + size))
                        }
                    }
                    validFound = true;
                }
            }
        }

        var bigSizeCount = Math.floor(this._columns * this._rows * (5 / 100));
        var mediumSizeCount = Math.floor(this._columns * this._rows * (10 / 100));
        var q = 0;

        while (q < bigSizeCount + mediumSizeCount){
            addBox(2);
            addBox(1);
            addBox(1);
            q = q + 3;
        }

    };

    function randomOrder(array){
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function loadNextPicture(me, callback){
        if(!me._randomOrderPictures){
            me._randomOrderPictures = me.options.pictures;    
            randomOrder(me._randomOrderPictures);
        }

        if(!me._randomOrderItems){
            me._randomOrderItems = $(".fancyCollageItem");
            randomOrder(me._randomOrderItems);
        }

        if(me._elementIndex > me._randomOrderItems.length){
            callback();
        } else {
            if(me._pictureIndex > me._randomOrderPictures.length){
                me._pictureIndex = 0;
            }

            var i =document.createElement("div");
            $(i).css("background-image", "url(" + me._randomOrderPictures[me._pictureIndex].src + ")")
                .css("opacity", "0")
                .appendTo(me._randomOrderItems[me._elementIndex])
                .ready(function(){
                    setTimeout(function(){
                        $(".fancyCollageItem div").css("opacity", "1");
                        loadNextPicture(me, callback);
                    }, 500);
                });

            me._pictureIndex ++;
            me._elementIndex ++;
        }
    }

    FancyCollage.prototype.loadPictures= function (callback) {
        loadNextPicture(this, callback);
    };

    FancyCollage.prototype.startPictureChangeAnimation = function(){
        var me = this;
        if(!me._timeAnimationList) {
            me._timeAnimationList = [];
        }

        for(var i = 0; i < me._timeAnimationList.length; i++){
            clearInterval(me._timeAnimationList[i]);
        }

        var q = me._rows * me._columns * 10 / 100;
        for(i = 0; i < q; i++){
            var timeItem;
            timeItem = setInterval(function () {
                var l = me._items;
                var posX = Math.floor(Math.random() * (me._rows));
                var posY = Math.floor(Math.random() * (me._columns));
                while (!l[posX][posY]) {
                    posX = Math.floor(Math.random() * (me._rows));
                    posY = Math.floor(Math.random() * (me._columns));
                }
                var pictures = me.options.pictures;

                if (!pictures[me._pictureIndex]) {
                    me._pictureIndex = 0;
                }

                $($(l[posX][posY]).children()[0]).css("background-image", "url(" + pictures[me._pictureIndex].src + ")");

                me._pictureIndex++;
            }, 2000 + (Math.random() * 2000));
            me._timeAnimationList[i] = timeItem;
        }
    };

    $.fn.fancyCollage = function ( options ) {
        return this.each(function () {
            var instance = new FancyCollage( this, options );

        });
    }

})( jQuery, window, document );