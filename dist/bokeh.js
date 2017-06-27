(function () {
  'use strict'

  var bokeh = {
    anchors: document.querySelectorAll('.bokeh-link'),
    blur: document.querySelector('.bokeh-blur'),

    init: function (modal) {
      var bokeh = this
      var imgs
      var tabs
      var controls = create('div')

      modal.setAttribute('data-bokeh', true)

      // Create DOM elements
      imgs = modal.querySelectorAll('img')
      bokeh.makeTabs(modal, imgs, controls)
      bokeh.makeButtons(modal, controls)

      // Attach events
      tabs = modal.querySelectorAll('.bokeh__tabs > li')
      bokeh.setActive(tabs[0], imgs[0])
    },

    makeTabs: function (el, imgs, controls) {
      // Make a container for the controls
      el.appendChild(controls).className = 'bokeh__controls'
      controls.appendChild(create('ul')).className = 'bokeh__tabs'
      var tabs = el.querySelector('.bokeh__tabs', el)
      var li

      // Make a tab for each image
      each(imgs, function (img, idx) {
        li = create('li')
        tabs.appendChild(li)
        li.setAttribute('data-index', idx)
        img.setAttribute('data-index', idx)
        li.innerHTML = idx + 1
        bokeh.tabClickHandler(li, img)
      })
    },

    closeModal: function (el) {
      el.classList.remove('is-visible')
      if (bokeh.blur) bokeh.blur.classList.remove('has-blur')
    },

    nextImg: function(e) {
      var parent = e.target.parentElement.parentElement
      var nextTab
      var nextImg
      var firstTab = parent.querySelector('.bokeh__tabs li')
      var firstImg = parent.querySelector('img')
      var tab = parent.querySelector('.bokeh__tabs .is-active')
      var img = parent.querySelector('img.is-active')

      nextTab = tab.nextElementSibling
      nextImg = img.nextElementSibling

      if (!nextTab) nextTab = firstTab

      if (nextImg.tagName !== 'IMG') nextImg = firstImg

      bokeh.setActive(nextTab, nextImg)
    },

    prevImg: function(e) {
      var parent = e.target.parentElement.parentElement
      var prevTab
      var prevImg
      var lastTab = parent.querySelector('.bokeh__tabs li:last-of-type')
      var lastImg = parent.querySelector('img:last-of-type')
      var tab = parent.querySelector('.bokeh__tabs .is-active')
      var img = parent.querySelector('img.is-active')
      prevTab = tab.previousElementSibling
      prevImg = img.previousElementSibling
      if (!prevTab) prevTab = lastTab
      if (!prevImg) prevImg = lastImg
      bokeh.setActive(prevTab, prevImg)
    },

    makeButtons: function (modal, controls) {
      // Make next/prev
      var next = create('button')
      var prev = create('button')
      next.className = 'bokeh__next'
      prev.className = 'bokeh__prev'

      next.innerHTML = 'Next'
      prev.innerHTML = 'Prev'

      next.addEventListener('click', bokeh.nextImg)
      prev.addEventListener('click', bokeh.prevImg)

      controls.appendChild(prev)
      controls.appendChild(next)

      // Make a close button
      controls.appendChild(create('button')).className = 'bokeh__close'
      var closeBtn = modal.querySelector('.bokeh__close', modal)
      closeBtn.innerHTML = 'CLOSE'

      // Attach click handler to close modal
      closeBtn.addEventListener('click', function() {
        bokeh.closeModal(modal)
      })
    },

    tabClickHandler: function (tab, img) {
      tab.addEventListener('click', function () {
        if (tab.getAttribute('data-index') === img.getAttribute('data-index')) {
          bokeh.setActive(tab, img)
        }
      })
    },

    setActive: function (tab, img) {
      var activeClass = 'is-active'

      if (parent(tab) !== null) parent(tab).classList.remove(activeClass)
      if (parent(img) !== null) parent(img).classList.remove(activeClass)

      if (img.hasAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'))
        img.removeAttribute('data-src')
      }
      tab.classList.add(activeClass)
      img.classList.add(activeClass)

      function parent (e) {
        return e.parentNode.querySelector('.' + activeClass)
      }
    },

    showModal: function (el) {
      var href = el.getAttribute('href').replace('#', '')
      var modal = document.getElementById(href)

      el.addEventListener('click', function () {
        modal.classList.add('is-visible')
        if (bokeh.blur) bokeh.blur.classList.add('has-blur')
        if (!modal.getAttribute('data-bokeh')) bokeh.init(modal)
      })

      modal.addEventListener('click', function(el) {
        if (el.target === modal) bokeh.closeModal(modal)
      })
    }
  }

  each(bokeh.anchors, function (el) {
    bokeh.showModal(el)
  })

  // Helpers
  function each (el, fn) {
    Array.prototype.forEach.call(el, fn)
  }

  function create (el) {
    return document.createElement(el)
  }
})()
