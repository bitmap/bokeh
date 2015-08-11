function $(e) {
  return document.querySelector(e);
}

function $$(e) {
  return document.querySelectorAll(e);
}

var should  = chai.should()
,   MODAL   = document.getElementById('test')
,   TABLIST = $('.bokeh__tabs')
,   TABS    = $$('.bokeh__tabs li')
,   i       = TABS.length
,   IMGS    = $$('img')
,   CLOSE   = $('.bokeh__close')
,   SRC     = $('img').hasAttribute('src')
,   DATASRC = $('img').hasAttribute('data-src')
,   LINK    = $('.bokeh-link')
,   ACTIVE  = 'is-active';

describe('DOM', function(){
    it('created tab list', function() {
        TABLIST.should.not.equal(null);
    })

    it('created tabs for each image', function() {
        TABS.length.should.equal(IMGS.length);
    })

    it('created close button', function() {
        CLOSE.should.not.equal(null);
    })

    it('data-src -> src', function() {
        SRC.should.equal(true);
        DATASRC.should.equal(false);
    })

    it('tabs have data-index attribute', function() {
        for (var i = 0; i < TABS.length; i++) {
            TABS[i].hasAttribute('data-index').should.equal(true);
        };
    })
})

describe('Events', function(){

    it('opened successfully', function () {
         LINK.click();
         MODAL.className.should.equal('bokeh is-visible');
         TABS[0].className.should.equal(ACTIVE);
         IMGS[0].className.should.equal(ACTIVE);
    })

    it('clicked second tab', function () {
         TABS[1].click();
         TABS[1].className.should.equal(ACTIVE);
         TABS[0].className.should.not.equal(ACTIVE);
         IMGS[0].className.should.not.equal(ACTIVE);
         IMGS[1].className.should.equal(ACTIVE);
    })

    it('clicked last tab', function () {
         TABS[i - 1].click();
         TABS[i - 1].className.should.equal(ACTIVE);
         IMGS[i - 1].className.should.equal(ACTIVE);
         TABS[0].className.should.not.equal(ACTIVE);
    })

    it('closed successfully', function () {
         CLOSE.click();
         MODAL.className.should.equal('bokeh');
    })
})
