function $(e) {
  return document.querySelector(e);
}

function $$(e) {
  return document.querySelectorAll(e);
}

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

var should  = chai.should()
,   MODAL   = document.getElementById('test')
,   TABLIST = $('.bokeh__tabs')
,   TABS    = $$('.bokeh__tabs li')
,   BLUR    = $('.bokeh-blur')
,   IMGS    = $$('img')
,   CLOSE   = $('.bokeh__close')
,   SRC     = $('img').hasAttribute('src')
,   DATASRC = $('img').hasAttribute('data-src')
,   LINK    = $('.bokeh-link')
,   ACTIVE  = 'is-active'
,   t       = TABS.length
;

describe('DOM', function() {
  it('created tabs container', function() {
    TABLIST.should.not.equal(null);
  })

  it('created tabs for each image', function() {
    t.should.equal(IMGS.length);
  })

  it('created close button', function() {
    CLOSE.should.not.equal(null);
  })

  it('data-src => src', function() {
    SRC.should.equal(true);
    DATASRC.should.equal(false);
  })

  it('tabs have data-index attr', function() {
    for (var i = 0; i < t; i++) {
      TABS[i].hasAttribute('data-index').should.equal(true);
    };
  })
})

describe('Events', function() {

  it('opened', function() {
    click(LINK);
    MODAL.className.should.equal('bokeh is-visible');
    TABS[0].className.should.equal(ACTIVE);
    IMGS[0].className.should.equal(ACTIVE);
  })

  it('blur on', function() {
    BLUR.className.should.equal('bokeh-blur has-blur')
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
