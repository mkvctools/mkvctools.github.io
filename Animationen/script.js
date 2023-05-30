var path = anime.path('.quantum-2 .path-1');

anime({
    targets: '.quantum-2 .dot',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: 2000,
    loop: true,
  });