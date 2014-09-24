var should  = chai.should(),
    modal   = document.getElementById('test');
    tabList = document.querySelector('.werk-tabs'),
    tabs    = document.querySelectorAll('.werk-tabs li'),
    lastTab = tabs.length - 1,
    imgs    = document.querySelectorAll('img'),
    close   = document.querySelector('.close'),
    src     = document.querySelector('img').hasAttribute('src'),
    datasrc = document.querySelector('img').hasAttribute('data-src'),
    link    = document.querySelector('.werk-link');

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
         modal.className.should.equal('werk is-visible');
    })

    it('clicked a tab', function () {
         tabs[lastTab].click();
         tabs[lastTab].className.should.equal('active');
    })

    it('closed successfully', function () {
         close.click();
         modal.className.should.equal('werk');
    })
})