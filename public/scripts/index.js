(function () {
  if ("serviceWorker" in navigator) {
    window.onload = () => {
      navigator.serviceWorker.register("/service-worker.js");
    };
  }

  //selectors for performing calculations
  let nos = document.getElementsByClassName("number");
  let clr = document.getElementById("clear");
  let times = document.getElementById("multiply");
  let adds = document.getElementById("add");
  let del = document.getElementById("delete");
  let division = document.getElementById("divide");
  let minus = document.getElementById("subtract");

  //selectors for changing theme
  let themes = document.querySelectorAll("button");
  let pad = document.getElementById("pad");
  let page = document.querySelector("body");
  let swith = document.getElementById("select");
  let screen = document.getElementById("screen");
  let btn1 = document.getElementsByClassName("key1");
  let btn2 = document.getElementsByClassName("key2");
  let btn3 = document.getElementById("key3");
  let txt = document.getElementsByClassName("fontcolor");
  let sgn = document.getElementsByClassName("sign");

  //classes for changing theme
  let body = ["firstcolor", "firstcolor1", "firstcolor2"];
  let keypad = ["keypad", "keypad1", "keypad2"];
  let font = ["color", "color1", "color2"];
  let input = ["input", "input1", "input2"];
  let togglebox = ["togglebox", "togglebox1", "togglebox2"];
  let toggledot = ["toggle", "toggle1", "toggle2"];
  let button = ["themekey1", "themekey2", "themekey3"];
  let button1 = ["themekey1_1", "themekey2_1", "themekey3_1"];
  let button2 = ["themekey1_2", "themekey2_2", "themekey3_2"];

  //functions to move toggle button
  function remove(theme, dot) {
    for (let i = 0; i < theme.length; i++) {
      for (let j = 0; j < dot.length; j++) {
        theme[i].classList.remove(dot[j]);
      }
    }
  }
  function add(elemnt, cls) {
    elemnt.classList.add(cls);
  }

  //functions to add and remove class
  function removetheme(elemnt, a, b, c) {
    if (elemnt.classList.contains(a)) {
      elemnt.classList.remove(a);
    }
    if (elemnt.classList.contains(b)) {
      elemnt.classList.remove(b);
    }
    if (elemnt.classList.contains(c)) {
      elemnt.classList.remove(c);
    }
  }
  function addtheme(elemnt, no) {
    elemnt.classList.add(no);
  }
  function multipleadd(arr, no) {
    for (let k = 0; k < arr.length; k++) {
      arr[k].classList.add(no);
    }
  }

  //onclick event for each toggle button
  // themes.forEach((el) => {
  //     el.addEventListener('click', () => {
  //         //change toggle button color
  //         remove(...themes, "toggle");
  //         add(el, "toggle");

  //         //change page color
  //         removetheme(pad, ...keypad )

  //     })
  // })

  //onclick event for change of theme
  for (let i = 0; i < themes.length; i++) {
    themes[i].addEventListener("click", () => {
      //change toggle button color
      remove(themes, toggledot);
      add(themes[i], toggledot[i]);

      //change page color
      removetheme(page, ...body);
      addtheme(page, body[i]);

      //change pad color
      removetheme(pad, ...keypad);
      addtheme(pad, keypad[i]);

      //change toggle box
      removetheme(swith, ...togglebox);
      addtheme(swith, togglebox[i]);

      //change screen
      removetheme(screen, ...input);
      addtheme(screen, input[i]);

      //change button1
      remove(btn1, button);
      multipleadd(btn1, button[i]);

      //change button2
      remove(btn2, button1);
      multipleadd(btn2, button1[i]);

      //change button3
      removetheme(btn3, ...button2);
      addtheme(btn3, button2[i]);

      //change text
      remove(txt, font);
      multipleadd(txt, font[i]);
    });
  }

  //functions for buttons
  let ary = "";
  for (let m = 0; m < nos.length; m++) {
    nos[m].addEventListener("click", () => {
      screen.innerHTML += nos[m].innerHTML;
      ary += nos[m].innerHTML;
    });
  }
  //reset button
  clr.addEventListener("click", () => {
    screen.innerHTML = "";
    ary = "";
  });
  //multiply button
  times.addEventListener("click", () => {
    ary += "*";
    screen.innerHTML = "";
  });
  //add button
  adds.addEventListener("click", () => {
    ary += adds.innerHTML;
    screen.innerHTML = "";
  });
  //divide button
  division.addEventListener("click", () => {
    ary += division.innerHTML;
    screen.innerHTML = "";
  });
  //subtract button
  minus.addEventListener("click", () => {
    ary += minus.innerHTML;
    screen.innerHTML = "";
  });
  //delete button
  del.addEventListener("click", () => {
    ary = ary.slice(0, ary.length - 1);
    screen.innerHTML = ary;
  });
  //equals button
  btn3.addEventListener("click", () => {
    screen.innerHTML = "";
    let ans = Function("return " + ary)();
    screen.innerHTML = ans;
    ary = "";
  });
})();
