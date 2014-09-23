var expect = chai.expect;


describe('DOM', function(){
    var tabs = document.querySelector('.werk-tabs');
    var close = document.querySelector('.werk-tabs');
    var src = document.querySelector('img').hasAttribute('src');
    var datasrc = document.querySelector('img').hasAttribute('data-src');

    it('created tabs', function() {
        expect(tabs).to.not.equal(null);
    })

    it('created close button', function() {
        expect(close).to.not.equal(null);
    })

    it('data-src -> src', function() {
        expect(src).to.equal(true);
        expect(datasrc).to.equal(false);
    })
})

describe('Events', function(){

})