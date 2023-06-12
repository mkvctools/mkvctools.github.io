let countryPath = document.getElementsByClassName('country-path');
let blinkInterval = 7000; // Zeitintervall für die Blinkgeschwindigkeit (hier 7 Sekunden)
let blinkColor = '#EA5600'; // Farbe für das Blinken

let resetBackground = function() {
  for (let i = 0; i < countryPath.length; i++) {
    let element = countryPath[i];
    element.style.setProperty('fill', '#FFF', 'important'); 
  }
};

let countryBlink = function(index) {
  if (index >= countryPath.length) {
    resetBackground();
    index = 0;
  }

  let element = countryPath[index];
  element.style.setProperty('fill', blinkColor, 'important');

  setTimeout(function() {
    element.style.setProperty('fill', '#EA5600', 'important');
    countryBlink(index + 1);
  }, 200);
};

let startBlinking = function() {
  countryBlink(0);
};

startBlinking();
for (let i = 0; i < countryPath.length; i++) {
  let element = countryPath[i];
  element.addEventListener('mouseenter', function() {
    element.style.setProperty('fill', '#ff7d32', 'important');
  });

  element.addEventListener('mouseleave', function() {
    element.style.setProperty('fill','#ea5600','important');
  });
}
