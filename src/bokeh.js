(function() {
  'use strict';

  var containers = document.querySelectorAll('.bokeh')
  ,   anchors = document.querySelectorAll('.bokeh-link')
  ,   blurEl = document.querySelector('.bokeh-blur')
  ,   each = Array.prototype.forEach
  ;

  var bokeh = {
    init: function(el) {
      var bokeh = this
      , imgs, tabs
      ;

      // Create DOM elements
      imgs = el.querySelectorAll('img');
      bokeh.createTabs(el, imgs);
      bokeh.createCloseButton(el);

      // Attach events
      tabs = el.querySelectorAll('.bokeh__tabs > li');
      bokeh.setActive(tabs[0], imgs[0]);
    },

    createTabs: function(el, imgs) {
      // Make a container for the tabs
      el.appendChild(document.createElement('ul')).className = 'bokeh__tabs';
      var tabs = el.querySelector('.bokeh__tabs'), li;

      // Make a tab for each image
      each.call(imgs, function(img, idx) {
        li = document.createElement('li');
        tabs.appendChild(li);
        li.setAttribute('data-index', idx);
        img.setAttribute('data-index', idx);
        li.innerHTML = idx + 1;
        bokeh.tabClickHandler(li, img);
      });
    },

    createCloseButton: function(el) {
      // Make a close button
      el.appendChild(document.createElement('div')).className = 'bokeh__close';
      var closeBtn = el.querySelector('.bokeh__close');
      closeBtn.innerHTML = 'CLOSE';

      // Attach click handler to close modal
      closeBtn.addEventListener('click', function() {
       el.classList.remove('is-visible');
       if (blurEl) blurEl.classList.remove('has-blur');
      });
    },

    tabClickHandler: function(tab, img) {
      tab.addEventListener('click', function() {
        if (tab.getAttribute('data-index') === img.getAttribute('data-index')) {
          bokeh.setActive(tab, img);
        }
      });
    },

    setActive: function(tab, img) {
      var ACTIVE_CLASS = 'is-active';

      if (parent(tab) !== null) parent(tab).classList.remove(ACTIVE_CLASS);
      if (parent(img) !== null) parent(img).classList.remove(ACTIVE_CLASS);

      if (img.hasAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
      }
      tab.classList.add(ACTIVE_CLASS);
      img.classList.add(ACTIVE_CLASS);

      function parent(e) {
        return e.parentNode.querySelector('.is-active');
      }
    },

    showModal: function(el) {
      el.addEventListener('click', function() {
        var href = el.getAttribute('href').replace('#', '')
        ,   modal = document.getElementById(href)
        ;

        modal.classList.add('is-visible');
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
