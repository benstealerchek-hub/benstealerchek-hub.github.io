// Shows the page in one language: the one named in the address (#ru), or else the reader's own, or else English.
// The languages are marked with data-lang rather than an id, so that the address does not scroll the page down.
(function () {
  var articles = Array.prototype.slice.call(document.querySelectorAll('article[data-lang]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.languages a'));
  var codes = articles.map(function (article) {
    return article.getAttribute('data-lang');
  });

  function preferred() {
    var wanted = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < wanted.length; i++) {
      var code = wanted[i].toLowerCase().split('-')[0];
      if (codes.indexOf(code) !== -1) return code;
    }
    return 'en';
  }

  function show() {
    var named = location.hash.slice(1);
    var code = codes.indexOf(named) !== -1 ? named : preferred();
    articles.forEach(function (article) {
      var shown = article.getAttribute('data-lang') === code;
      article.classList.toggle('shown', shown);
      if (shown) {
        document.title = article.getAttribute('data-title');
        document.documentElement.lang = article.lang;
      }
    });
    links.forEach(function (link) {
      link.setAttribute('aria-current', String(link.hash === '#' + code));
    });
    // A link to the other page keeps the language.
    Array.prototype.forEach.call(document.querySelectorAll('[data-keep-language]'), function (link) {
      link.hash = code;
    });
  }

  window.addEventListener('hashchange', function () {
    show();
    window.scrollTo(0, 0);
  });
  show();
})();
