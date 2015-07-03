segmented-slider-js
===================

# Introduction

segmented-slider-js is a simple slider with three segment.

That's all. No more words. Just use it.

# Demo

# Requirements

* jQuery
* jQuery.event.drag

This control uses `jQuery` and `jQuery.event.drag` as dragging stuff helper.

Therefore, make sure these two libraries are imported already.

You can learn more jQuery.event.drag [here](http://threedubmedia.com/code/event/drag)

# Usage

## HTML

Firstly, you need to create a skeleton for this control.

```html
<div class="segmented-slider" data-init-green="40" data-init-amber="60">
    <ul class="point-container">
        <li>0</li>
        <li>10</li>
        <li>20</li>
        <li>30</li>
        <li>40</li>
        <li>50</li>
        <li>60</li>
        <li>70</li>
        <li>80</li>
        <li>90</li>
        <li>100</li>
    </ul>
    <div class="handle-container">
        <div class="segment green"></div>
        <div class="segment amber"></div>
        <div class="segment red"></div>
        <div class="handle green"></div>
        <div class="handle amber"></div>
    </div>
</div>
```

`data-init-green` and `data-init-amber` attributes are to set the initial position of the green and amber handle.

Unless they are set, the control itself has default value.

## Javascript

```js
$(".segmented-slider").segmentedSlider(function(greenPoint, amberPoint) {
    // Do your stuff with new green point and amber point value here

    /* Example
    $(".handle.green").text(greenPoint);
    $(".handle.amber").text(amberPoint);
    */
});
```
# Todo

* Make it responsive

# License

The MIT License (MIT)

Copyright (c) 2015 Nguyen Vinh [@ninjaprox](http://twitter.com/ninjaprox)