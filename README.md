# jQuery.slideBox
A simple light-weight jQuery plugin that makes a `<div>` (or another `block` element) moving from outside the page to one side of your choice.

## Demo
Please [check this link](http://jsfiddle.net/D4V1D/yyj5zaLw/) to see this plugin in action. 

## Releases
* **v0.1** - 31/07/0215

## Requirements
`jQuery.slideBox` requires the latest version of [`jQuery`](https://jquery.com/download/).

## Features
* uses `.animate()` with callback function
* all directions are customizable
* can be triggered when any DOMElement is visible **or** at any specific offset

## Usage
* **HTML**

First of all, you would need to design your slideBox. Here is a short exemple of what you can do:
```html
<div id="slidebox">
    <h3>Follow us!</h3>
    <p style="margin-bottom: 50px;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <p class="text-center">
        <img style="width: 50px;" src="http://icons.iconarchive.com/icons/yootheme/social-bookmark/512/social-facebook-box-blue-icon.png" alt="social_icons"/>
    </p>
</div>
```

* **CSS**

Do a bit of styling:
```css
#slidebox {
    width: 300px;
    height: 250px;
    background-color: white;
    border: 1px solid black;
    padding: 20px;
    -webkit-box-shadow: -10px -10px 50px 5px #A6A6A6;
    box-shadow: -10px -10px 50px 5px #A6A6A6;
}
```

* **jQuery**

The syntax of `jQuery.slideBox`'s initialization is the following:
```javascript
jQuery(function($) {

    $('#slidebox').slideBox({
        position: 'bottom right',
        appearsFrom: 'right',
        slideDuration: 500,
        target: 'h2'
    }).on('sb.hidden', function() {
        alert('hidden');
    }).on('sb.shown', function() {
       alert('shown');
    });

});
```

## Options
Name | Type | Default | Description
------------ | ------------- | ------------- | -------------
position | string | 'bottom right' | The position where the box will appears. The string is a two-element space-separated list where the first element can be 'bottom\|middle\|top' and the second can be 'left\|center\|right'.
appearsFrom | string | 'right' | The side where the box will slide from. This string can be 'left\|top\|right\|bottom'.
slideDuration | integer | 1500 | The duration of the sliding animation for both showBox and hideBox events (in `ms`)
target | integer\|string | 1250 | This represents what is triggering both events. Can be a integer (offset in `px`) or a string (jQuery selector)

## Events
Name | Description
------------ | -------------
sb.shown | This is triggered when the show animation is completed.
sb.hidden | This is triggered when the hide animation is completed.


## Licence
Copyright (c) 2015 Steve David

Licensed under the MIT license.
