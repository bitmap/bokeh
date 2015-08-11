var should  = chai.should()
,   modal   = document.getElementById('test')
,   tabList = document.querySelector('.bokeh__tabs')
,   tabs    = document.querySelectorAll('.bokeh__tabs li')
,   i       = tabs.length
,   imgs    = document.querySelectorAll('img')
,   close   = document.querySelector('.bokeh__close')
,   src     = document.querySelector('img').hasAttribute('src')
,   datasrc = document.querySelector('img').hasAttribute('data-src')
,   link    = document.querySelector('.bokeh-link')
,   active  = 'is-active';

describe('DOM', function(){
    it('created tab list', function() {
        tabList.should.not.equal(null);
    })

    it('created tabs for each image', function() {
        tabs.length.should.equal(imgs.length);
    })

    it('created close button', function() {
        close.should.not.equal(null);
    })

    it('data-src -> src', function() {
        src.should.equal(true);
        datasrc.should.equal(false);
    })

    it('tabs have data-index attribute', function() {
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].hasAttribute('data-index').should.equal(true);
        };
    })
})

describe('Events', function(){

    it('opened successfully', function () {
         link.click();
         modal.className.should.equal('bokeh is-visible');
         tabs[0].className.should.equal(active);
         imgs[0].className.should.equal(active);
    })

    it('clicked second tab', function () {
         tabs[1].click();
         tabs[1].className.should.equal(active);
         tabs[0].className.should.not.equal(active);
         imgs[0].className.should.not.equal(active);
         imgs[1].className.should.equal(active);
    })

    it('clicked last tab', function () {
         tabs[i - 1].click();
         tabs[i - 1].className.should.equal(active);
         imgs[i - 1].className.should.equal(active);
         tabs[0].className.should.not.equal(active);
    })

    it('closed successfully', function () {
         close.click();
         modal.className.should.equal('bokeh');
    })
})
