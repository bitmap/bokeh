(function() {
  'use strict';

  var ACTIVE_CLASS = 'is-active'
  ,   containers = document.querySelectorAll('.bokeh')
  ,   anchors = document.querySelectorAll('.bokeh-link')
  ,   blurEl = document.querySelector('.bokeh-blur')
  ,   each = Array.prototype.forEach
  ;

  var bokeh = {
    init: function(el) {
      var bokeh = this;

      // Create the tab container and close button
      el.appendChild(document.createElement('ul')).className = 'bokeh__tabs';
      el.appendChild(document.createElement('div')).className = 'bokeh__close';

      var tabHolder = el.querySelector('.bokeh__tabs')
      ,   tabItems = tabHolder.children
      ,   imgs = el.querySelectorAll('img')
      ,   closeBtn = el.querySelector('.bokeh__close')
      ,   li, i
      ;

      // Make a new tab for each image
      for (i = 0; i < imgs.length; i++) {
        li = document.createElement('li');
        tabHolder.appendChild(li);
        li.setAttribute('data-index', i);
        li.innerHTML = i + 1;
      }

      each.call(tabItems, function(index) {
        index.addEventListener('click', function() {
          for (i = 0; i < imgs.length; i++) {
            if (index.getAttribute('data-index') == i) {
              bokeh.makeActive(imgs[i], tabItems[i]);
            }
            else bokeh.removeActive(imgs[i], tabItems[i]);
          }
        });
      });

      // Set the first image and tab as active
      bokeh.makeActive(imgs[0], tabItems[0]);

      // Tidy up the close button
      closeBtn.innerHTML = 'CLOSE';
      closeBtn.addEventListener('click', function() {
       el.classList.remove('is-visible');
       if (blurEl) blurEl.classList.remove('has-blur');
      });
    },

    makeActive: function(img, tabs) {
      if (img.hasAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
      }

      tabs.classList.add(ACTIVE_CLASS);
      img.classList.add(ACTIVE_CLASS);
    },

    removeActive: function(img, tabs) {
      tabs.classList.remove(ACTIVE_CLASS);
      img.classList.remove(ACTIVE_CLASS);
    },


    showModal: function(el) {
      el.addEventListener('click', function() {
        var href = el.getAttribute('href').replace('#', '');
        document.getElementById(href).classList.add('is-visible');
        if (blurEl) blurEl.classList.add('has-blur');
      });
    }
  };

  each.call(containers, function(el) {
    bokeh.init(el);
  });

  each.call(anchors, function(el) {
    bokeh.showModal(el);
  });

})();
