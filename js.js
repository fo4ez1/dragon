let canvas; // Для canvas
      let context; // Для контекста canvas
      let position_x = screen.width; // координата x для движущихся холмов, изначально они не видны
      let position_y = 0; // координата y для движущихся холмов
      let speed = 2; // скорость движения холмов(на сколько будет изменяться position_x)
      let timer; // Для setTimeout()
      let direction; // Направление движения, задается стрелками клавиатуры
      let up = 0; // насколько дракон переместился вверх
      let dragon_x = 100; // координата x дракона
      let offset = 205; // Рассрасстояние по y, на котором рисуем траву, холмы и размешаем дракона.

      // Направления движения, задаются стрелками клавиатуры
      let directions = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
      };

      let dragon_image = new Image();
      dragon_image.src = "images/dragon1.png";

      window.onload = function () {
        canvas = document.getElementById("dragon");
        canvas.width = screen.width;
        if (canvas && canvas.getContext) {
          start();
        }
      };

      function animateDragon(speed) {
        let context = canvas.getContext("2d");
        // Очистить холст
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawDragon(context, dragon_x, up + 160);
        // context.drawImage(fon, position_x - screen.width / 2 + 40, 0);
        // context.drawImage(fon, position_x, 0);

        drawGrass(context);

        drawHill(context, position_x + 100,25, 35);
        drawHill(context, position_x + 125, 25, 35);
        drawHill(context, position_x + 225, 25, 65);
        drawHill(context, position_x + 250, 25, 55);
        drawHill(context, position_x + 490, 25, 55);  
        drawHill(context, position_x + 515, 25, 25);
        drawHill(context, position_x + 650, 25, 55);
       

        if (position_x + 700 > 0) {
          position_x -= speed;
        } else {
          //stop();
          position_x = canvas.width;
        }
        console.log(position_x);
      }

      function drawDragon(context, x, y) {
        context.drawImage(dragon_image, x, y);
      }

      function drawGrass(context) {
        context.beginPath();
        context.strokeStyle = "#0f0";
        context.fill();
        context.lineWidth = 1;
        context.moveTo(0, 205);
        context.lineTo(canvas.width, 205);
        context.stroke();
      }

      function drawHill(context, x, w, h) {
        checkCollision(dragon_x, x, w);
        //let h = 35;
        context.beginPath();
        context.strokeStyle = "#00ff00";
        context.lineWidth = 1;
        context.moveTo(x, offset);
        context.lineTo(x + w / 2, offset - h);
        //context.lineTo(x + (w * 3) / 4, offset - h);
        context.lineTo(x + w, offset);
        //context.lineTo(x + (w * 3) / 8, offset - h);
        context.fillStyle = "#00ff00";
        context.fill();
        context.stroke();
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 3;
        context.moveTo(x, 205);
        context.lineTo(x + 25, 205);
        context.stroke();
      }

      function checkCollision(coord1, coord2, width) {
        if (coord1 > coord2 && coord1 < coord2 + width && up == 0) {
          alert("collision");
          stop();
          return;
        }
      }

      function stop() {
        clearInterval(timer);
      }

      function start() {
        stop();
        timer = setInterval(animateDragon, 10, speed);
      }

      // Задаем обработчик события keydown
      addEventListener("keydown", function (event) {
        direction = directions[event.keyCode];
        if (direction == "up") {
          up = -80;
          setTimeout(function () {
            up = 0;
          }, 600);
        }
      });