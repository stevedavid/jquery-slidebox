/*!
	jQuery.slideBox v0.1
	(c) 2015 Steve David <http://www.steve-david.com>
	
	MIT-style license.
*/

;(function($) {

    $.fn.extend({
        slideBox: function(options) {
            if (options && typeof(options) == 'object') {
                options = $.extend({}, $.slideBox.defaults, options);
            }

            if($(this).length == 1) {
                new $.slideBox(this, options);
            } else if($(this).length > 1) {
                console.error($.messages.severalElements);
            } else if($(this).length == 0) {
                console.error($.messages.zeroElement);
            }

            return this;
        }
    });

    $.messages = {
        severalElements: '[jQuery.slideBox] Error: you have targetted more than one slideBox. Please use a different selector.',
        zeroElement: '[jQuery.slideBox] Error: could not find the slideBox in the DOM. Are you sure the selector is correct?'
    };

    $.closed = false;

    $.position = {
        horizontal: null,
        vertical: null
    };

    $.slideBox = function(elem, option) {
        var options  = option || $.slideBox.defaults
            , threShold = typeof(options.target) != 'number' ? $(options.target).offset().top : options.target;

        if($(elem).length === 1) {
            $.slideBox.applyCss(elem, options);

            $(window).on('scroll', function() {

                if($(this).scrollTop() + $(window).height() > threShold) {
                    if(!$(elem).is(':visible') && !$(elem).is(':animated')) {
                        $.slideBox.showBox(elem, options);
                        $(elem).find(options.closeLink).on('click', function(e) {
                            e.preventDefault();
                            $.closed = true;
                            $.slideBox.hideBox(elem, options);
                        });
                    }
                } else {
                    if($(elem).is(':visible') && !$(elem).is(':animated')) {
                        $.slideBox.hideBox(elem, options);
                    }
                }

            });
        }

        return;
    };

    $.slideBox.applyCss = function(elem, options) {
        var  position = options.position.split(' ')
            , cssPlacement = {}
            , propertiesNb
            , keys
            , value;

        $.position.vertical = position[0];
        $.position.horizontal = position[1];

        switch(position[0]) {
            case 'top':
                cssPlacement.top = 0;
                break;
            case 'middle':
                cssPlacement.top = '50%';
                cssPlacement.marginTop = parseInt($(elem).height()) / 2 * -1;
                break;
            case 'bottom':
                cssPlacement.bottom = 0;
                break;
        }

        switch(position[1]) {
            case 'left':
                cssPlacement.left = 0;
                break;
            case 'center':
                cssPlacement.left = '50%';
                cssPlacement.marginLeft = parseInt($(elem).width()) / 2 * -1;
                break;
            case 'right':
                cssPlacement.right = 0;
                break;
        }

        keys = Object.keys(cssPlacement);
        propertiesNb = keys.length;

        for(var i = 0; i < propertiesNb; i++) {
            $(elem).css(keys[i], cssPlacement[keys[i]]);
        }

        value = $.slideBox.calculateNewPosition(elem, options);
        $(elem).css(options.appearsFrom, value + 'px');

        $(elem).css({
            display: 'none',
            position: 'fixed'
        });

    };

    $.slideBox.hideBox = function(elem, options) {

        var animation = {};
        animation[options.appearsFrom] = $.slideBox.calculateNewPosition(elem, options);


        $(elem).animate(animation, {
            duration: options.slideDuration,
            complete: function() {
                $(elem).trigger('sb.hidden');
                $(elem).css('display', 'none');
            }
        });

    };

    $.slideBox.showBox = function(elem, options) {
        if(!$.closed) {

            $(elem).css('display', 'block');
            var animation = {}
                , value;

            switch(options.appearsFrom) {
                case 'top':
                case 'bottom':
                    if($.position.vertical == options.appearsFrom) {
                        value = 0;
                    } else {
                        value = $(window).innerHeight() - $(elem).outerHeight();
                    }
                    break;
                case 'left':
                case 'right':
                    if($.position.horizontal == options.appearsFrom) {
                        value = 0;
                    } else {
                        value = $(window).innerWidth() - $(elem).outerWidth();
                    }
                    break;
            }

            animation[options.appearsFrom] = value;
            $(elem).animate(animation, {
                duration: options.slideDuration,
                complete: function() {
                    $(elem).trigger('sb.shown');
                }
            });
        }
    };

    $.slideBox.calculateNewPosition = function(elem, options) {
        var width = $(elem).outerWidth()
            , height = $(elem).outerHeight()
            , value;

        switch(options.appearsFrom) {
            case 'right':
            case 'left':
                value = width * -1;
                break;
            case 'top':
            case 'bottom':
                value = height * -1;
                break;
        }

        return value;
    };

    $.slideBox.defaults = {
        position: 'bottom right',
        appearsFrom: 'right',
        slideDuration: 1500,
        target: 1250,
        closeLink: null
    };
})(jQuery);
