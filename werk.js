(function() {
  'use strict';

  function makeWerk(werk) {

    var tabClass = 'werk__tabs'
    ,   closeClass = 'werk__close';

    werk.appendChild(document.createElement('ul')).className = tabClass;
    werk.appendChild(document.createElement('div')).className = closeClass;

    var tabHolder = werk.querySelector('.' + tabClass)
    ,   tabItems = tabHolder.children
    ,   tabCount = werk.querySelectorAll('img').length
    ,   activeClass = 'is-active'
    ,   elem, i;

    for (i = 0; i < tabCount; i++) {
      elem = document.createElement('li');
      tabHolder.appendChild(elem);
      elem.setAttribute('data-index', i);
      elem.innerHTML = i + 1;
      elem.addEventListener('click', tabClick);
    }

    var img = werk.querySelector('img');
      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
      img.classList.add(activeClass);
      tabItems[0].classList.add(activeClass);

      var closeBtn = werk.querySelector('.' + closeClass);

    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', function() {
      werk.classList.remove('is-visible');
    });

    function tabClick(e) {
      var index = e.target.getAttribute('data-index')
      ,   imageCollection = werk.querySelectorAll('img')
      ,   elem, j;

      if (tabItems[index].classname = activeClass) {
        for (j = 0; j < imageCollection.length; j++) {
          elem = imageCollection[j];
          if (j == index) {
            if (elem.hasAttribute('data-src')) {
              elem.setAttribute('src', elem.getAttribute('data-src'));
              elem.removeAttribute('data-src');
            }
            elem.classList.add(activeClass);
            tabItems[j].classList.add(activeClass);
          } else {
            tabItems[j].classList.remove(activeClass);
            elem.classList.remove(activeClass);
          }
        }
      }
    }
  };

  function getWerk(el) {
    el.addEventListener('click', function() {
      var href = el.getAttribute('href').replace('#', '');
      document.getElementById(href).classList.add('is-visible');
    });
  }

  var tabContainer = document.querySelectorAll('.werk'),
    link = document.querySelectorAll('.werk-link'),
    each = Array.prototype.forEach;

  each.call(tabContainer, function(el) {
    makeWerk(el);
  });

  each.call(link, function(el) {
    getWerk(el);
  });

})();
