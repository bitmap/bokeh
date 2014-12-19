(function() {
    'use strict';
    var makeWerk = function(werk) {

        function tabClick(e) {
            var index = e.target.getAttribute('data-index'), 
                imageCollection = werk.querySelectorAll('img'), 
                elem, j;

            if (tabItems[index].classname = 'active') {
                for (j = 0; j < imageCollection.length; j++) {
                    elem = imageCollection[j];
                    if (j == index) {
                        if (elem.hasAttribute('data-src')) {
                            elem.setAttribute('src', elem.getAttribute('data-src'));
                            elem.removeAttribute('data-src');
                        }
                        elem.classList.add('active');
                        tabItems[j].classList.add('active');
                    } else {
                        tabItems[j].classList.remove('active');
                        elem.classList.remove('active');
                    }
                }
            }
        }

        werk.appendChild(document.createElement('ul')).className = 'werk-tabs';
        werk.appendChild(document.createElement('div')).className = 'close';

        var tabHolder = werk.querySelector('.werk-tabs'), 
            tabItems = tabHolder.children, 
            tabCount = werk.querySelectorAll('img').length, 
            elem, i;
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
        img.classList.add('active');
        tabItems[0].classList.add('active');

        var closeBtn = werk.querySelector('.close');

        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', function() {
            werk.classList.remove('is-visible');
        });
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
