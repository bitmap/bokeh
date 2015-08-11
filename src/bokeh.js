(function() { 'use strict';

  var ACTIVE_CLASS = 'is-active'
  ,   bokehContainers = document.querySelectorAll('.bokeh')
  ,   blurContainer = document.querySelector('.bokeh-blur')
  ,   bokehAnchors = document.querySelectorAll('.bokeh-link')
  ,   each = Array.prototype.forEach;

  var bokeh = {
    init: function(el) {
      var bokeh = this;

      // Create the tab container and close button
      el.appendChild(document.createElement('ul')).className = 'bokeh__tabs';
      el.appendChild(document.createElement('div')).className = 'bokeh__close';

      var tabHolder = el.querySelector('.bokeh__tabs')
      ,   tabItems = tabHolder.children
      ,   imgs = el.querySelectorAll('img')
      ,   firstImg = imgs[0]
      ,   tabCount = imgs.length
      ,   closeBtn = el.querySelector('.bokeh__close')
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
      firstImg.classList.add(ACTIVE_CLASS);
      tabItems[0].classList.add(ACTIVE_CLASS);

      // Tidy up the close button
      closeBtn.innerHTML = 'CLOSE';
      closeBtn.addEventListener('click', function() {
       el.classList.remove('is-visible');
       if (blurContainer) blurContainer.classList.remove('has-blur');
      });

      function tabClick() {
        var tab = this;
        for (i = 0; i < tabCount; i++) {
          if (tab.getAttribute('data-index') == i) bokeh.makeActive(imgs[i], tabItems[i]);
          else bokeh.removeActive(imgs[i], tabItems[i]);
        }
      }
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
        if (blurContainer) blurContainer.classList.add('has-blur');
      });
    }
  };

  each.call(bokehContainers, function(el) {
    bokeh.init(el);
  });

  each.call(bokehAnchors, function(el) {
    bokeh.showModal(el);
  });

})();
