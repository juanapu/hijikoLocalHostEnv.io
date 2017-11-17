"use strict";
require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
require('../common/header/index.js');
//require('./range-touch.min.js');
var _mm=require('../../util/mm.js');

var testJs={
	init: function(){
			 
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Slider tooltip extension
//>>label: Slidertooltip
//>>group: Forms
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.structure: ../css/structure/jquery.mobile.slider.tooltip.css
define( [ "jquery", "./slider" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {
$.widget( "mobile.slider", $.mobile.slider, {
    options: {
        popupEnabled: false,
        showValue: false
    },
    _create: function() {
        var o = this.options,
            popup = $( "<div></div>", {
                class: "ui-slider-popup ui-shadow ui-corner-all ui-body-" + ( o.theme ? o.theme : $.mobile.getInheritedTheme( this.element, "c" ) )
            });
        this._super();
        $.extend( this, {
            _currentValue: null,
            _popup: popup,
            _popupVisible: false,
            _handleText: this.handle.find( ".ui-btn-text" )
        });
        this.slider.before( popup );
        popup.hide();
        this._on( this.handle, { "vmousedown" : "_showPopup" } );
        this._on( this.slider.add( $.mobile.document ), { "vmouseup" : "_hidePopup" } );
        this._refresh();
    },
    // position the popup centered 5px above the handle
    _positionPopup: function() {
        var dstOffset = this.handle.offset();
        this._popup.offset( {
            left: dstOffset.left + ( this.handle.width() - this._popup.width() ) / 2,
            top: dstOffset.top - this._popup.outerHeight() - 5
        });
    },
    _setOption: function( key, value ) {
        this._super( key, value );
        if ( key === "showValue" ) {
            if ( value ) {
                this._handleText.html( this._value() ).show();
            } else {
                this._handleText.hide();
            }
        }
    },
    // show value on the handle and in popup
    refresh: function() {
        this._super.apply( this, arguments );
        // necessary because slider's _create() calls refresh(), and that lands
        // here before our own _create() has even run
        if ( !this._popup ) {
            return;
        }
        this._refresh();
    },
    _refresh: function() {
        var o = this.options, newValue;
        if ( o.popupEnabled ) {
            // remove the title attribute from the handle (which is
            // responsible for the annoying tooltip); NB we have
            // to do it here as the jqm slider sets it every time
            // the slider's value changes :(
            this.handle.removeAttr( 'title' );
        }
        newValue = this._value();
        if ( newValue === this._currentValue ) {
            return;
        }
        this._currentValue = newValue;
        if ( o.popupEnabled ) {
            this._positionPopup();
            this._popup.html( newValue );
        }
        if ( o.showValue ) {
            this._handleText.html( newValue );
        }
    },
    _showPopup: function() {
        if ( this.options.popupEnabled && !this._popupVisible ) {
            this._handleText.hide();
            this._popup.show();
            this._positionPopup();
            this._popupVisible = true;
        }
    },
    _hidePopup: function() {
        if ( this.options.popupEnabled && this._popupVisible ) {
            this._handleText.show();
            this._popup.hide();
            this._popupVisible = false;
        }
    }
});
})( jQuery );
	

	}

};

$(function(){
	testJs.init();
});

