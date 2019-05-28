;(function () {
  "use strict";
  // random generator
  const seeder = function seeder (seed) {
    return function rand () {
      seed *= 1103512545 + 12345;
      seed--;
      return (seed %= Number.MAX_SAFE_INTEGER) / Number.MAX_SAFE_INTEGER;
    }
  };

  // the following block creates the glitch effect and turns it into css:
  {
    const rand = seeder(1337);
    const style = document.createElement("style");
    const steps = 300;
    let text = "";
    ["glitch-before", "glitch-after"].map(anim => {
      text += `@keyframes ${anim}{`;
        for (let i = 0; i < steps; i++) {
          text += `${i*1/steps*300}%{`;
          const top = rand()**2 * 100 | 0;
          const height = rand()**2 * 100 | 0;
          const shift = (rand()**2 * 200 - 100) | 0;

          const skew = rand()**2 * 10 - 5;
          const offsetX = (rand()**2 * 10 - 5) * 0.01;
          const offsetY = (rand()**2 * 6 - 3) * 0.01;
          text += `transform:skew(${skew}deg) translateX(${offsetX}em) translateY(${offsetY}em);`;

          const color = `hsl(0,0%,${100-rand()**4*25}%)`;
          text += `color:${color};`;

          text += `text-shadow: 0 0 0.03em ${color}, ${-offsetX}em 0 ${offsetX<0?"blue":"red"};`;

          const poly = `polygon(0% ${top - shift}%, 100% ${top}%, 100% ${height + shift}%, 0% ${height}%)`;
          ["-webkit-clip-path", "clip-path"].map(key => {
            text += `${key}:${poly};`;
          });

          text += "}";
        }
      text += "}";
    });

    style.textContent = text;
    document.head.appendChild(style);
  }


})();


/*var captionLength = 0;
var caption = 'IA ET ART';
var caption1 = 'IA AND ART'


$(document).ready(function() {
    setInterval ('cursorAnimation()', 600);
    captionEl = $('#caption');

    wowtropcool();
    setTimeout('english()',3000);
});

function english(){
  caption = caption1;
  type()
}
function wowtropcool(){
    type();
    setTimeout('ErasingEffect()',3000);
}

function testTypingEffect() {
    caption = $('input#user-caption').val();
    type();
}

function type() {
    captionEl.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout('type()', 100);
    } else {
        captionLength = 0;
        caption = '';
    }
}

function ErasingEffect() {
    caption = captionEl.html();
    captionLength = caption.length;
    if (captionLength>0) {
        erase();
    } else {
        $('#caption').html("You didn't write anything to erase, but that's ok!");
        setTimeout('testErasingEffect()', 1000);
    }
}

function erase() {
    captionEl.html(caption.substr(0, captionLength--));
    if(captionLength >= 0) {
        setTimeout('erase()', 100);
    }
}

function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}*/





var index = 0;
var captionLength = 0;
var captionOptions = ["IA ET ART", "AI AND ART", "IA Y ARTE","IA E ARTE","KI UND KUST","IA ET ART", "AI AND ART", "IA Y ARTE","IA E ARTE","KI UND KUST","IA ET ART", "AI AND ART", "IA Y ARTE","IA E ARTE","KI UND KUST","IA ET ART", "AI AND ART", "IA Y ARTE","IA E ARTE","KI UND KUST","IA ET ART", "AI AND ART", "IA Y ARTE","IA E ARTE","KI UND KUST",]

// this will make the cursor blink at 400ms per cycle
function cursorAnimation() {
  $('#cursor').animate({
      opacity: 0
  }, 400).animate({
      opacity: 1
  }, 400);
}

// this types the caption
function type() {
    $caption.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout('type()', 100);
    }
}

// this erases the caption
function erase() {
    $caption.html(caption.substr(0, captionLength--));
    if(captionLength >= 0) {
        setTimeout('erase()', 100);
    }
}

// this instigates the cycle of typing the captions
function showCaptions() {
  caption = captionOptions[index];
  type();
  if (index < (captionOptions.length - 1)) {
    index++
    setTimeout('erase()', 3000);
    setTimeout('showCaptions()', 5000)
  } else {
    setTimeout(function(){
      $('#cursor').remove()
    }, 1500)
  }
}


$(document).ready(function(){
  // use setInterval so that it will repeat itself
  setInterval('cursorAnimation()', 600);
  $caption = $('#caption');
  // use setTimeout so that it only gets called once
  setTimeout('showCaptions()', 1000);

  $('h2').hover(
    function(){$(this).toggleClass('.glitch');}
  );


})
