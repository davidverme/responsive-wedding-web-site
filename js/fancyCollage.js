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
        this._pictureIndex = 0;
        this._elementIndex = 0;
        this.createBoxes();
        this.makeItFancy();
        this.loadPictures();
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
                var a = document.createElement("a");
                $(a).appendTo(el)
                    .attr("target", "_blank");
                var p = document.createElement("div");
                $(p).appendTo($(a))
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

    function loadPicture(me, elementIndex, pictureIndex) {
        var d;
        var item;
        if($(me._randomOrderItems[elementIndex]).has("div").length === 0) {
            d = document.createElement("div");
            item = $(d);
            item.css("opacity", "1")
                .css({backgroundImage : 'url("' + me._randomOrderPictures[pictureIndex].src + '")'})
                .appendTo(me._randomOrderItems[elementIndex]);
            item.ready(function(){
                setTimeout(function(){
                    item.css("opacity", "1");
                    }, 200);
            })

        } else {
            d = $(me._randomOrderItems[elementIndex]).children()[0];
            item = $(d);
            item.css({backgroundImage : 'url("' + me._randomOrderPictures[pictureIndex].src + '")'});
        }
    }

    function nextElementIndex(me){
        me._elementIndex ++;
        if(me._elementIndex > me._randomOrderItems.length - 1){
            me._elementIndex = 0;
        }

        return me._elementIndex;
    }

    function nextPictureIndex(me){
        me._pictureIndex ++;
        if(me._pictureIndex> me._randomOrderPictures.length - 1){
            me._pictureIndex = 0;
        }

        return me._pictureIndex;
    }

    FancyCollage.prototype.loadPictures= function () {
        var me = this;

        if(!me._randomOrderPictures){
            me._randomOrderPictures = me.options.pictures;
            randomOrder(me._randomOrderPictures);
        }

        if(!me._randomOrderItems){
            me._randomOrderItems = $(".fancyCollageItem");
            randomOrder(me._randomOrderItems);
        }

        var interval = setInterval(function(){
            loadPicture(me, nextElementIndex(me), nextPictureIndex(me));
            if(me._elementIndex == me._randomOrderItems.length - 1){
                setTimeout(function(){
                    clearInterval(interval);
                    interval = setInterval(function(){
                        loadPicture(me, nextElementIndex(me), nextPictureIndex(me));
                    }, 2000);
                }, 2000);
            }
        }, 500);
    }

    $.fn.fancyCollage = function ( options ) {
        return this.each(function () {
            var instance = new FancyCollage( this, options );

        });
    }

})( jQuery, window, document );