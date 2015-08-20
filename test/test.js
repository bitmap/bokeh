var should  = chai.should()

// Appease PhantomJS
function click(el){
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    el.dispatchEvent(ev);
}

click(document.querySelector('.bokeh-link'));

var MODAL   = document.querySelector('.bokeh')
  , BLUR    = document.querySelector('.bokeh-blur')
  , TABLIST = MODAL.querySelector('.bokeh__tabs')
  , TABS    = MODAL.querySelectorAll('.bokeh__tabs li')
  , IMGS    = MODAL.querySelectorAll('img')
  , CLOSE   = MODAL.querySelector('.bokeh__close')
  , SRC     = MODAL.querySelector('img').hasAttribute('src')
  , DATASRC = MODAL.querySelector('img').hasAttribute('data-src')
  , ACTIVE  = 'is-active'
  , t       = TABS.length
  ;

describe('DOM', function() {
  it('created tabs container', function() {
    TABLIST.should.not.equal(null);
  })

  it('created tabs for each image', function() {
    t.should.equal(IMGS.length);
  })

  it('data-src' + ' \u2192 ' + 'src', function() {
    SRC.should.equal(true);
    DATASRC.should.equal(false);
  })

  it('created close button', function() {
    CLOSE.should.not.equal(null);
  })

  it('tabs have data-index attr', function() {
    for (var i = 0; i < t; i++) {
      TABS[i].hasAttribute('data-index').should.equal(true);
    };
  })
})

describe('Events', function() {

  it('opened', function() {
    MODAL.className.should.equal('bokeh is-visible');
    TABS[0].className.should.equal(ACTIVE);
    IMGS[0].className.should.equal(ACTIVE);
  })

  it('blur on', function() {
    BLUR.className.should.equal('bokeh-blur has-blur')
  })

  it('first tab selected', function() {
    TABS[0].className.should.equal(ACTIVE);
    IMGS[0].className.should.equal(ACTIVE);
  })

  it('clicked second tab', function() {
    click(TABS[1]);
    TABS[1].className.should.equal(ACTIVE);
    TABS[0].className.should.not.equal(ACTIVE);
    IMGS[0].className.should.not.equal(ACTIVE);
    IMGS[1].className.should.equal(ACTIVE);
  })

  it('clicked last tab', function() {
    click(TABS[t - 1]);
    TABS[t - 1].className.should.equal(ACTIVE);
    IMGS[t - 1].className.should.equal(ACTIVE);
    TABS[0].className.should.not.equal(ACTIVE);
  })

  it('closed', function() {
    click(CLOSE);
    MODAL.className.should.equal('bokeh');
  })

  it('blur off', function() {
    BLUR.className.should.equal('bokeh-blur')
  })
})
