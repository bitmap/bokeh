(function() {
  'use strict';

  var containers = $all('.bokeh')
    , anchors = $all('.bokeh-link')
    , blurEl = $('.bokeh-blur')
    ;

  var bokeh = {
    init: function(el) {
      var bokeh = this
        , imgs, tabs
        ;

      // Create DOM elements
      imgs = $all('img', el);
      bokeh.createTabs(el, imgs);
      bokeh.createCloseButton(el);

      // Attach events
      tabs = $all('.bokeh__tabs > li', el);
      bokeh.setActive(tabs[0], imgs[0]);
    },

    createTabs: function(el, imgs) {
      // Make a container for the tabs
      el.appendChild(make('ul')).className = 'bokeh__tabs';
      var tabs = $('.bokeh__tabs', el)
        , li
        ;

      // Make a tab for each image
      each(imgs, function(img, idx) {
        li = make('li');
        tabs.appendChild(li);
        li.setAttribute('data-index', idx);
        img.setAttribute('data-index', idx);
        li.innerHTML = idx + 1;
        bokeh.tabClickHandler(li, img);
      });
    },

    createCloseButton: function(el) {
      // Make a close button
      el.appendChild(make('div')).className = 'bokeh__close';
      var closeBtn = $('.bokeh__close', el);
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
          , modal = document.getElementById(href)
          ;

        modal.classList.add('is-visible');
        if (blurEl) blurEl.classList.add('has-blur');
      });
    }
  };

  each(containers, function(el) {
    bokeh.init(el);
  });

  each(anchors, function(el) {
    bokeh.showModal(el);
  });

  // Helpers
  function each(el, fn) {
    Array.prototype.forEach.call(el, fn);
  }

  function make(el) {
    return document.createElement(el);
  }

  function $(selector, node) {
    return (node || document).querySelector(selector);
  }

  function $all(selector, node) {
    return (node || document).querySelectorAll(selector);
  }

})();
