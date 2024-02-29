function otherbluespaceship() {
  document.getElementById('myCanvas').style.display = 'block';
  document.getElementById('normal').style.display = 'none';
  document.getElementById('spiderman').style.display = 'none';
  document.getElementById('cops').style.display = 'none';
  document.getElementById('text').style.display = 'none';
  document.getElementById('homescreen').style.display = 'none';
  
  var gameOver = false;
  var counter = 0;
  var normal = true;
  var shootSound = document.getElementById("shootSound");
  var draw = true;
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.src = "/base game/otherbluespaceship.png";
  img.onload = function() {
    ctx.drawImage(img, 350, 750);
  };

  var counterDisplay = document.getElementById("counterDisplay");

  // Function to update the counter display
  function updateCounterDisplay() {
    counterDisplay.innerText = "Score: " + counter;
  }

  var alien1 = new Image();
  alien1.src = "/base game/1.png";

  var alien2 = new Image();
  alien2.src = "/base game/2.png";

  var alien3 = new Image();
  alien3.src = "/base game/3.png";

  var alien4 = new Image();
  alien4.src = "/base game/1.png";

  var alien5 = new Image();
  alien5.src = "/base game/2.png";

  var alien6 = new Image();
  alien6.src = "/base game/3.png";

  var alien7 = new Image();
  alien7.src = "/base game/1.png";

  var alien8 = new Image();
  alien8.src = "/base game/2.png";

  var alien9 = new Image();
  alien9.src = "/base game/3.png";

  var alien10 = new Image();
  alien10.src = "/base game/1.png";

  var alien11 = new Image();
  alien11.src = "/base game/2.png";

  var alien12 = new Image();
  alien12.src = "/base game/3.png";

  var alien13 = new Image();
  alien13.src = "/base game/1.png";

  var alien14 = new Image();
  alien14.src = "/base game/2.png";

  var alien15 = new Image();
  alien15.src = "/base game/3.png";

  var alien16 = new Image();
  alien16.src = "/base game/1.png";

  var alien17 = new Image();
  alien17.src = "/base game/2.png";

  var alien18 = new Image();
  alien18.src = "/base game/3.png";

  var alien19 = new Image();
  alien19.src = "/base game/1.png";

  var alien20 = new Image();
  alien20.src = "/base game/2.png";

  var alien21 = new Image();
  alien21.src = "/base game/3.png";

  var alien22 = new Image();
  alien22.src = "/base game/1.png";

  var alien23 = new Image();
  alien23.src = "/base game/2.png";

  var alien24 = new Image();
  alien24.src = "/base game/3.png";

  var bullet = new Image();
  bullet.src = "/base game/bullet.png";

  var projectile = new Image();
  projectile.src = "/other media/Acid rain.png";

  var enemyProj = [];

  var aliens = [
    { image: alien1, x: 0, y: 0 },
    { image: alien2, x: 70, y: 0 },
    { image: alien3, x: 140, y: 0 },
    { image: alien4, x: 210, y: 0 },
    { image: alien5, x: 280, y: 0 },
    { image: alien6, x: 350, y: 0 },
    { image: alien7, x: 0, y: 50 },
    { image: alien8, x: 70, y: 50 },
    { image: alien9, x: 140, y: 50 },
    { image: alien10, x: 210, y: 50 },
    { image: alien11, x: 280, y: 50 },
    { image: alien12, x: 350, y: 50 },
    { image: alien13, x: 0, y: 100 },
    { image: alien14, x: 70, y: 100 },
    { image: alien15, x: 140, y: 100 },
    { image: alien16, x: 210, y: 100 },
    { image: alien17, x: 280, y: 100 },
    { image: alien18, x: 350, y: 100 },
    { image: alien19, x: 0, y: 150 },
    { image: alien20, x: 70, y: 150 },
    { image: alien21, x: 140, y: 150 },
    { image: alien22, x: 210, y: 150 },
    { image: alien23, x: 280, y: 150 },
    { image: alien24, x: 350, y: 150 }
  ];

   var x = 350;
  var isBulletVisible = false;
  var bulletX = 0;
  var bulletY = 0;
  var bulletSpeed = 20;

  var alienX = 0;
  var alienSpeed = 2;


  var isMovingLeft = false;
  var isMovingRight = false;

  //keyboard controls
  document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
      isMovingLeft = true;
    } else if (event.keyCode == 39) {
      isMovingRight = true;
    } else if (event.keyCode == 32 && !isBulletVisible) {
      bulletX = x + img.width / 2 - bullet.width / 2; //shooting the bullet
      bulletY = 750;
      isBulletVisible = true;
      shootSound.play();
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.keyCode == 37) {
      isMovingLeft = false;
    } else if (event.keyCode == 39) {
      isMovingRight = false;
    }
  });

  function updatePlayerPosition() { //function to move the character left and right
    if (isMovingLeft && x > 0) {
      x -= 4;
    } else if (isMovingRight && x < canvas.width - img.width) {
      x += 4;
    }
  }

  //function that includes basically the whole game
  function moveAlien() {
    if (gameOver) {
      location.href = "Gameover.html"
      return; 
    }
    if (draw) { //draws aliens
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePlayerPosition();

      for (const alien of aliens) {
        ctx.drawImage(alien.image, alien.x + alienX, alien.y);
      }

      ctx.drawImage(img, x, 750);
    }

//creating acid rain that falls from the sky
    for (const project of enemyProj) {
      if (project.y >= 800) {
       
        enemyProj.shift();
      } else ctx.drawImage(projectile, project.x, project.y += 5);
    }
    checkCollisions();

    //gradually changing the speed of the aliens movement based on the points (counter)
    if (counter >= 5 && counter < 10) {
      alienSpeed = alienSpeed / Math.abs(alienSpeed) * 2.5
    }
    else if (counter >= 10 && counter < 15) {
      alienSpeed = alienSpeed / Math.abs(alienSpeed) * 3
    }
    else if (counter >= 15 && counter < 20) {
      alienSpeed = alienSpeed / Math.abs(alienSpeed) * 3.5
    }
    else if (counter >= 20 && counter < 24) {
      alienSpeed = alienSpeed / Math.abs(alienSpeed) * 4
    }
//code for the bullet
    if (isBulletVisible) {
      ctx.drawImage(bullet, bulletX, bulletY);
      bulletY -= bulletSpeed;

      if (bulletY < 0) {
        isBulletVisible = false;
      } else {
        var bulletBottom = bulletY + bullet.height;
        for (var i = 0; i < aliens.length; i++) {
          var alien = aliens[i];
          var alienLeft = alien.x + alienX;
          var alienRight = alienLeft + alien.image.width;
          var alienTop = alien.y;
          var alienBottom = alienTop + alien.image.height;
          //collision check for bullet
          if (
            ((bulletBottom >= alienTop &&
              bulletY <= alienBottom) || (bulletY > alienBottom && bulletBottom - bulletSpeed < alienBottom)) &&
            bulletX >= alienLeft &&
            bulletX <= alienRight

          ) {
            // Bullet hit the alien, then it removes it
            aliens.splice(i, 1);
            isBulletVisible = false;
            counter++
            updateCounterDisplay();
            break;
          }
        }
      }
    }

    alienX += alienSpeed;


    if (alienX > canvas.width - (70 * 5.5) || alienX < 0) {
      alienSpeed = -alienSpeed;
    }
    //establishes boundaries
   if (counter == 24) {
      location.href = "win.html"
      return; 
    }
    requestAnimationFrame(moveAlien);
  }
  function checkCollisions() { //checks for a collision between the acid rain and the player
    console.log(enemyProj);

    for (let i = 0; i < enemyProj.length; i++) {
      const project = enemyProj[i];
      if (
        project.x <= x + img.width &&
        project.x + projectile.width >= x &&
        project.y + projectile.height >= 750
      ) {
        // Collision occurred
        gameOver = true;
        enemyProj.splice(i, 1);
        break;
      }
    }


  }
  function spawnEnemyProj() { //function to draw the acid rain at random x locations
    if (draw && !gameOver) {
      const newAlien = JSON.parse(JSON.stringify(aliens[Math.floor(Math.random() * aliens.length)]));
      newAlien.x += alienX;
      enemyProj.push(newAlien);
    }
  }

  setInterval(spawnEnemyProj, 1000); // sets an interval, so the acid rain drops once every second


  alien1.onload = function() {
    moveAlien();
    updateCounterDisplay();
  };
}


