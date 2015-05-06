(function() {
  'use strict';

  var notWerk = document.querySelector('.not-werk');

  function makeModal(werk) {

    // Create the tab container and close button
    var tabClass = 'werk__tabs'
    ,   closeClass = 'werk__close'
    ,   activeClass = 'is-active';

    werk.appendChild(document.createElement('ul')).className = tabClass;
    werk.appendChild(document.createElement('div')).className = closeClass;

    var tabHolder = werk.querySelector('.' + tabClass)
    ,   tabItems = tabHolder.children
    ,   tabCount = werk.querySelectorAll('img').length
    ,   img = werk.querySelector('img')
    ,   closeBtn = werk.querySelector('.' + closeClass)
    ,   el, i;

    // Make a new tab for each image
    for (i = 0; i < tabCount; i++) {
      el = document.createElement('li');
      tabHolder.appendChild(el);
      el.setAttribute('data-index', i);
      el.innerHTML = i + 1;

      // Attach event
      el.addEventListener('click', tabClick);
    }

    // Set the first imag eand tab as active
    img.setAttribute('src', img.getAttribute('data-src'));
    img.removeAttribute('data-src');
    img.classList.add(activeClass);
    tabItems[0].classList.add(activeClass);

    // Tidy up the close button
    closeBtn.innerHTML = 'CLOSE';
    closeBtn.addEventListener('click', function() {
      werk.classList.remove('is-visible');
      if (notWerk) notWerk.classList.remove('blur');
    });

    function tabClick(e) {

      var index = e.target.getAttribute('data-index')
      ,   imageCollection = werk.querySelectorAll('img')
      ,   el, i;

      if ((tabItems[index].classname = activeClass)) {
        for (i = 0; i < imageCollection.length; i++) {
          el = imageCollection[i];

          if (i == index) {
            if (el.hasAttribute('data-src')) {
              el.setAttribute('src', el.getAttribute('data-src'));
              el.removeAttribute('data-src');
            }

            el.classList.add(activeClass);
            tabItems[index].classList.add(activeClass);

          } else {
            tabItems[i].classList.remove(activeClass);
            el.classList.remove(activeClass);
          }
        }
      }
    }
  }

  function showModal(el) {
    el.addEventListener('click', function() {
      var href = el.getAttribute('href').replace('#', '');
      document.getElementById(href).classList.add('is-visible');
      if (notWerk) notWerk.classList.add('blur');
    });
  }

  var tabContainer = document.querySelectorAll('.werk'),
    link = document.querySelectorAll('.werk-link'),
    each = Array.prototype.forEach;

  each.call(tabContainer, function(el) {
    makeModal(el);
  });

  each.call(link, function(el) {
    showModal(el);
  });

})();
