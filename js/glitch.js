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

  // the following block writes the text and enables the cursor:
  {
    const typeWriter = function typeWriter (source) {
      // "typeWriter" by Jan-Stefan Janetzky aka GottZ - 2018
      // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
      // Contact: typeWriter@gottz.de
      // origin of this code: https://codepen.io/GottZ/pen/KGLPwy
      const nodes = [...source.childNodes];
      nodes.forEach(node => node.parentNode.removeChild(node));

      let current = null;
      let writer = false;
      let text;


      this.write = function write () {
        if (writer) {
          if (current.write()) {
            return true;
            current = null;
          }
          else {
            current = null;
            writer = false;
          }
        }

        if (current === null) {
          if (nodes.length == 0) return false;
          const node = nodes.shift();
          if (node.nodeType != node.TEXT_NODE) {
            current = new typeWriter(node);
            writer = true;
          }
          else {
            current = node;
            text = [...node.nodeValue];
            node.nodeValue = "";
          }
          source.appendChild(node);
          return this.write();
        }

        if (text.length == 0) {
          current = null;
          return this.write();
        }

        current.nodeValue += text.shift();
        if ("text" in source.dataset) source.dataset.text = source.textContent;
        return true;
      };
    };

    const source = document.querySelector("p");
    const target = document.createElement("span");
    [...source.childNodes].forEach(node => target.appendChild(node));
    source.appendChild(target);

    const writer = new typeWriter(target);
    const rand = seeder(81625);

    writer.write();
    rand();

    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    source.appendChild(cursor);

    (function runner () {
      if (rand() > 0.0 && !writer.write()) {
        cursor.classList.add("blink");
        return;
      };
      requestAnimationFrame(runner);
    })();
  }
})();
