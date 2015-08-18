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
      var bokeh = this
      , imgs, tabs
      ;

      // Create DOM elements
      imgs = el.querySelectorAll('img');
      bokeh.createTabs(el, imgs);
      bokeh.createCloseButton(el);

      // Attach events
      tabs = el.querySelectorAll('.bokeh__tabs li');
      bokeh.tabClickHandler(imgs, tabs);
      bokeh.makeActive(imgs[0], tabs[0]);
    },

    createTabs: function(el, imgs) {
      // Make a container for the tabs
      el.appendChild(document.createElement('ul')).className = 'bokeh__tabs';
      var tabs = el.querySelector('.bokeh__tabs'), i, li;

      // For each image in container, make an li
      for (i = 0; i < imgs.length; i++) {
        li = document.createElement('li');
        tabs.appendChild(li);
        li.setAttribute('data-index', i);
        imgs[i].setAttribute('data-index', i);
        li.innerHTML = i + 1;
      }
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

    tabClickHandler: function(imgs, tabs) {
      each.call(tabs, function(el) {
        el.addEventListener('click', function() {
          for (var i = 0; i < tabs.length; i++) {
            if (el.getAttribute('data-index') === imgs[i].getAttribute('data-index')) {
              bokeh.makeActive(imgs[i], tabs[i]);
            }
            else bokeh.removeActive(imgs[i], tabs[i]);
          }
        });
      });
    },

    makeActive: function(img, tab) {
      if (img.hasAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
      }
      tab.classList.add(ACTIVE_CLASS);
      img.classList.add(ACTIVE_CLASS);
    },

    removeActive: function(img, tab) {
      tab.classList.remove(ACTIVE_CLASS);
      img.classList.remove(ACTIVE_CLASS);
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
