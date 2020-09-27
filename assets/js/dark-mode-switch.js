const darkSwitch = document.getElementById("darkSwitch");

function initTheme() {
  const e = null !== localStorage.getItem("darkSwitch") && "dark" === localStorage.getItem("darkSwitch");
  darkSwitch.checked = e, e ? document.body.setAttribute("data-theme", "dark") : document.body.removeAttribute("data-theme");

  changeIconDarkMode(darkSwitch);
}

function resetTheme() {
  darkSwitch.checked ? (document.body.setAttribute("data-theme", "dark"), localStorage.setItem("darkSwitch", "dark")) : (document.body.removeAttribute("data-theme"), localStorage.removeItem("darkSwitch"));

  changeIconDarkMode(darkSwitch);
}

window.addEventListener("load", function() {
  darkSwitch && (initTheme(), darkSwitch.addEventListener("change", function() {
    resetTheme();

  }))

  $date = new Date();
  $hour = $date.getHours();
  /* switch in dark mode if it is night  (20h00 à 6h59)*/
  darkSwitch.checked = $hour <= 6 || $hour >= 20;
  resetTheme();
});

function changeIconDarkMode(elem) {
  var $this = $(elem),
    isChecked = $this.is(':checked');
  $this.next().find('i')
    .toggleClass('fa-sun text-warning', isChecked)
    .toggleClass('fa-moon', !isChecked);

}