##Bokeh

Image gallery thing.

Include `bokeh.js` and `bokeh.css` in your application.

Wrap your images in an element (outside of your wrapper!) with some ID and a class of `.bokeh`. Make sure you use `data-src` instead of the `src` attribute. Slap that `bokeh-blur` class on your wrapper to get that fuzzy effect.
```html
<div class="wrapper bokeh-blur"> ... </div>

<div id="gallery" class="bokeh">
    <img data-src="http://placehold.it/350x150">
    <img data-src="http://placehold.it/250x250">
    <img data-src="http://placehold.it/350x250">
</div>
```

Put an anchor somewhere on the page with `href="yourID"` and the `.bokeh-link` class
```html
<a class="bokeh-link" href="#gallery">Test 1</a>
```

And then it just works. I promise.

Chrome, Firefox, & IE10+
