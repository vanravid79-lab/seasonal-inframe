window.onload = function() {
  var adContainer = document.getElementById('ad-container');
  var clickCta = document.getElementById('clickCta');

  clickCta.addEventListener('click', function() {
    // This is the standard way to implement the clickTag
    window.open("https://www.google.com/");
  });
};