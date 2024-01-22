const scatter = document.getElementById('scatter');

function generateScatterplot() {
    // HTML-Element für den Scatterplot erstellen
    const scatterplotContainer = document.createElement('div');
    scatterplotContainer.classList.add('scatterplot');
  
    // Zufällige Werte generieren und Kreise erstellen
    for (let i = 1; i <= 10; i++) {
      const x = 2;
      const y = Math.floor(Math.random() * 100) + 1;
  
      const circle = document.createElement('div');
      circle.classList.add('circle');
      circle.style.backgroundColor = 'black';
      circle.style.width = '20px';
      circle.style.height = '10px'; 
      circle.style.left = `${x}%`;
      circle.style.top = `${y}%`;
  
      scatterplotContainer.appendChild(circle);
    }
  
    return scatterplotContainer.outerHTML;
  }
  
  // Beispielaufruf der Funktion
  scatter.innerHTML = generateScatterplot();
  console.log(scatter);
  