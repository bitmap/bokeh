(function() { 'use strict';

  var tabContainer = document.querySelectorAll('.bokeh')
  ,   blurContainer = document.querySelector('.bokeh-blur')
  ,   anchor = document.querySelectorAll('.bokeh-link')
  ,   each = Array.prototype.forEach;

  var makeModal = (function(el) {

    // Create the tab container and close button
    el.appendChild(document.createElement('ul')).className = 'bokeh__tabs';
    el.appendChild(document.createElement('div')).className = 'bokeh__close';

    var tabHolder = el.querySelector('.bokeh__tabs')
    ,   tabItems = tabHolder.children
    ,   imgs = el.querySelectorAll('img')
    ,   firstImg = imgs[0]
    ,   tabCount = imgs.length
    ,   closeBtn = el.querySelector('.bokeh__close')
    ,   activeClass = 'is-active'
    ,   li, i;

    // Make a new tab for each image
    for (i = 0; i < tabCount; i++) {
      li = document.createElement('li');
      tabHolder.appendChild(li);
      li.setAttribute('data-index', i);
      li.innerHTML = i + 1;

      // Attach event
      li.addEventListener('click', tabClick);
    }

    // Set the first image and tab as active
    firstImg.setAttribute('src', firstImg.getAttribute('data-src'));
    firstImg.removeAttribute('data-src');
    firstImg.classList.add(activeClass);
    tabItems[0].classList.add(activeClass);

    // Tidy up the close button
    closeBtn.innerHTML = 'CLOSE';
    closeBtn.addEventListener('click', function() {
     el.classList.remove('is-visible');
     if (blurContainer) blurContainer.classList.remove('has-blur');
    });

    function tabClick() {
      for (i = 0; i < tabCount; i++) {
        if (i == this.getAttribute('data-index')) makeActive();
        else removeActive();
      }

      function makeActive() {
        if (imgs[i].hasAttribute('data-src')) {
          imgs[i].setAttribute('src', imgs[i].getAttribute('data-src'));
          imgs[i].removeAttribute('data-src');
        }

        tabItems[i].classList.add(activeClass);
        imgs[i].classList.add(activeClass);
      }

      function removeActive() {
        tabItems[i].classList.remove(activeClass);
        imgs[i].classList.remove(activeClass);
      }
    }
  });

  var showModal = (function(el) {
    el.addEventListener('click', function() {
      var href = el.getAttribute('href').replace('#', '');
      document.getElementById(href).classList.add('is-visible');
      if (blurContainer) blurContainer.classList.add('has-blur');
    });
  });

  each.call(tabContainer, function(el) {
    makeModal(el);
  });

  each.call(anchor, function(el) {
    showModal(el);
  });

})();
