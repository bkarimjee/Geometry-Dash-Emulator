//Global variables
let scores = []; // Keeps track of scores each death
let inputText, firstLetter, word; // Variables used to make the name capitalized
let playerName; // the name of the player
let DisplayName; // text to display player's name
let aKey, mKey, oKey, nKey, gKey, g; // cheat codes that we added to have fun and help test the code without actually playing the game
let bgStart, bgStart2; // backgrounds for menus
let startMessage, start = true;// variables used to detect when the game starts
let player; // main player (the cube)
let spacmKey, enterkey; // keys for controls                              
let dead = false; // variable to check if the player is dead
let barrier, spikes, random1, resetting, ttime; // variables for game objects and timers  
let flip;
let flip1 = 0; // changes the players rotation to flip
let groundLevel = 600; // variable used to find the level of the ground
let score, scoreText, scTxt; // variables for player's score tracking
let live, livesText, liTxt; //persons life variables
let bgMusic, die, play = false; //sound variables
let tabKey;//this is the tab key to see the leaderboard
let menu, menuText, scoresSorted, menuText2, menuText3;//this is the variables of menu screen so that we can show the user their high scores when they hit a specific button

// Our functions go here
function random() // this function returns a random number between 1-5 whenever needed
{
  random1 = Math.round(Math.random() * 4);// generation of 1-5
  return random1;// returns the random number
}

function firstLetterCapitalized(name)// this function is used for the text input that shows up in the beginning when asking the user for there name.
{
  firstLetter = name.charAt(0);//This takes the first letter of the name that was inputted
  firstLetter = firstLetter.toUpperCase();//This makes the first letter uppercase so that it would turn from "burhan" to "Burhan"
  word = name.substring(1);//This takes the rest of the name and extracts it
  name = firstLetter + word;//This adds the first letter and the rest of the word and adds it to the variable of name
  return name;//this returns the final name of the name that was inputted with the first letter capitalized
}

//this bubble sort is used for the high score shown at the end of the game
function addScore(scr) //this function is used to add scores to the menu
{
  scores.push(scr);//this pushes the high scores to the score parameter 
  temp = 0;//this is a temporary holder so the score does not get lost when it transitions with other scores
  // bubble sorting
  for (let x = 0; x < scores.length; x++)//this for loop checks each score and if variable of x is less than score length than continue the loop
  {
    for (let l = 0; l < scores.length - 1; l++)//this for loop checks the second score length and inside this loop it goes through each element and checks the following
    {
      if (scores[l] < scores[l + 1])//if the first score is less than the second score              
      {
        temp = scores[l];//add this score to the temporary holder
        scores[l] = scores[l + 1];//make the variable of the first score equal to the second score 
        scores[l + 1] = temp;//add the second score to the temporary score
      }
    }
  }
  if (scores.length > 5)//this checks if the score length is greater than five
  {
    scores.pop();//this then removes the last element of an array and shows the first 5 scores. We do not want to exceed 5 scores so this will allow us to show only 5 scores
  }
  scoresSorted = scores.join(", ");//This joins all the scores into an array so that we can put commas to show the user each high score
}

//these are some of the websites thate helped us understand how to reset the player and where they will be placed after they die: https://stackoverflow.com/questions/64103981/how-to-restart-a-game-in-phaser-3
//another one is: https://phaser.io/docs/2.4.4/Phaser.Component.Reset.html
function reset() // this function resets the player after hitting a spike.
{
  play = true;//this is used to reset the sound track when the player dies
  resetting = true;//this tells the update function that the game is resetting 
  player.x = 200;// this resets the player's x value to the coordinate of 200
  player.y = 470;// this resets the player's y value to the coordinate of 470
  player.body.setGravityY(6000);//this resets the player's gravity back to its original state
  player.setVelocityY(0);// resets the player's y velocity
  barrier.clear(true);// clears the group for barriers
  spikes.clear(true);// clears the group for spikes 
  for (let x = -20; x < 2000; x++) //makes the loop run 2020 times to make the bottom barrier very long. In this loop is the x value which is the coordinates that starts at -20, if that is less than 2000 than continue placing barriers for the ground level.
  //We learned parts of our code and planning how to make tiles here:https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
  {
    //We learned how to implement objects onto our plaform for the user to dodge here: https://flaviocopes.com/phaserjs-platform-game-tutorial/
    barrier.create(x + x * 258, groundLevel + 113, "ground");//the barrier is created with x starting at -20 

    random1 = random();// makes the map random
    if (x == 4)// rare for platforms to spawn in
    {
      barrier.create(x + x * 258, groundLevel - 80, "platform");//this creates the barrier and spaces it apart. The x value is where obstacles start off with and the 258 resembles the y value and the 80 is resembles the distance between the obstacles which is why each obstacles is 40 pixels apart for symmetry. 
      barrier.create(x + x * 318, groundLevel - 120, "platform");//The comment above applies to this line of code as well 
      barrier.create(x + x * 378, groundLevel - 160, "platform");//The comment above applies to this line of code as well 
      barrier.create(x + x * 438, groundLevel - 200, "platform");//The comment above applies to this line of code as well 
      for (let j = 0; j < 15; j++) {
        //We learned parts of how to create jumping obstacle here: https://www.phaser.io/tutorials/coding-tips-003#:~:text=However%20if%20you%27re%20now%20using%20a%20version%20of,platform%20%3D%20this.platforms.create%28x%2C%20y%2C%20%27platform%27%29%3B%20platform.body.friction.x%20%3D%200%3B
        spikes.create(x * 38 + 1000 + (40 * j), groundLevel - 40, "spikes");// this creates a long line of spikes which is inside of a loop so it can stretch the amount of spikes that is placed on the x value coordinates
      }
      // Looks like this:
      //                   _
      //             _
      //       _
      //  _
      //^^^^^^^^^^^^^^^^^^^(<--the spikes)
    }
    //We learned how to create different obstacles in this website and used each part to our own advantage.(This website helped us a ton):https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
    //Down below was very difficult for us to make and understand the exact numbers that we needed in order for the user to have a perfect amount of time to jump. This took us majority of the time that we had to create this game and we have cited each source that we used in order for us to solve the problems that we had come across. Finally with a lot of trial an error we have found the coordinates that gives the user the right amount of time to avoid the spikes and barriers.
    //Here is another website that helped us design obstacles that we would use throughout this game: https://developer.amazon.com/blogs/appstore/post/Tx3AT4I2ENBOI6R/intro-to-phaser-part-3-obstacles-collision-score-sound-and-publishing
    else if (x > 13 && x % 15 == 0 && x != 30 && x != 45) { //adds random different obstacles 
      if (random1 == 1) {//adds random different obstacles 
        spikes.create(x * 38, groundLevel - 40, "spikes"); //used multiplication and subtraction to space out the tiles correctly the x value is multiplied by 38 to move it a certain amount of pixels on the platform which is called the grounlevel and the y value is subtracted by 40 each time because of the image size to space it out. essentially, x*38 is the x value and groundlevel-40 is the y value.
        spikes.create((x * 38) + 80, groundLevel - 40, "spikes");//this is the same idea as before except we add 80 so that the spikes overlap with eachother and it becomes more visually appealing to the user and resembles the real life geometry dash.  
        // Looks like:
        // ^^
      }
      else if (random1 == 2) {//adds random different obstacles 
        spikes.create(x * 38, groundLevel - 40, "spikes");//this is the first spike that will be placed on the platform
        spikes.create(30 + (x * 38), groundLevel - 40, "spikes");//this is the second spike that will be seperated by the first spike which is why we added 30 to the x value so it can be spaced out properly but still close enough for the user to jump over it.
        // Looks like:
        // ^  ^
      }
      else {//adds random different obstacles 
        spikes.create(x * 38, groundLevel - 40, "spikes");// makes one spike in the middle below the 2 barriers
        spikes.create((player.x * .005) + 68 + (x * 38), groundLevel - 40, "spikes");//makes one spike closest to the left below the 2 barriers
        spikes.create(108 + (x * 38), groundLevel - 40, "spikes");// adds the last spike on the right
        barrier.create(28 + x * 38, groundLevel - 80, "barrier");// adds one barrier on top of the spikes
        barrier.create(68 + x * 38, groundLevel - 80, "barrier");// adds the second barrier on top of the spikes
        /* Looks like:
          ___
          ^^^^
        */
      }
    }
  }
  dead = false;//This makes the variable (dead) set as alive
}

//the following is the main game screen where all the action occurs
class mainScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }
  //preload is used to load all game resources into memory
  //preload is called once at the start of a scene
  preload() {
    // Loads images
    this.load.image("gameStarting", "assets/IMAGES/gameStarting.png");//this loads the image called gamestarting on the screen 
    this.load.image('background', 'assets/IMAGES/deez.jpg');
    this.load.image("startButton", "assets/IMAGES/startButton.png");//this loads the image called startbutton on the screen which allows the user to enter the next screen
    this.load.image("barrier", "assets/IMAGES/barrieer.png");//this loads the image called barrier on the screen which allows the user to enter the next screen
    this.load.image("spikes", "assets/IMAGES/spike.png");
    this.load.image("ground", "assets/IMAGES/platform.png");
    this.load.image("platform", "assets/IMAGES/jumpbricks.png")
    //Sets characters
    this.load.image("char1", "assets/IMAGES/char1.png");
    //load the sound resources into memory
    this.load.audio("bgmusic", "assets/sounds/stereoMadness.mp3");
    this.load.audio("die", "assets/sounds/die.mp3");
  }
  //create gets called after preload and its where you create all your game sprites, sounds and other game objects and initialize all game variables
  create() {
    // the following keys are used to cheat for debugging
    aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);// used for debug
    mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);// used for debug
    oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);// used for debug
    nKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);// used for debug
    gKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);// used for debug
    tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);//this implements the tab key which is gonna be used to access the pause menu
    game = this.physics.add.image(1800 / 2, 800 / 2, "gameStarting");//This adds the image of game starting and centers it to the screen size
    player = this.physics.add.sprite(2000000, 470000, "char1")// adds the player sprite to the game
      .setScale(.16);// makes it small enough to fit perfectly
    //We learned how to implement a staticGroup and how its used here: http://phaser.io/tutorials/making-your-first-phaser-3-game/part4
    barrier = this.physics.add.staticGroup();//this creates the barrier group, static which means the group cant move and is in one place
    spikes = this.physics.add.staticGroup();//this causes the spikes to stay in one play and not move, also groups make it really easy to add objects to them
    spikes.create(38, groundLevel - 40, "spikes");//this allows where the spikes will be placed on the platform(groundlevel). This was difficult to make because of the coordinates but after trial and error we got it :)
    barrier.create(38, groundLevel - 80, "barrier");//this also allows us to place the barrier on top of the spikes
    //We learned how to create a menu here:https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Rectangle.html#:~:text=Phaser.GameObjects.%20Rectangle%20The%20Rectangle%20Shape%20is%20a%20Game,it%2C%20or%20enabling%20it%20for%20input%20or%20physics.
    liTxt = "Lives: " + live;// This shows the amount of attemepts the user has taken on this level.
    livesText = this.add.text(0, 1700, liTxt, { fontFamily: "CustomFont", fontSize: 82, color: "#FFFFFF" });
    scTxt = "Score: " + score;//this gives the variable of scTxt the score count that will soon be displayed on the screen
    scoreText = this.add.text(20, 1000, scTxt, { fontFamily: "CustomFont", fontSize: 22, color: "#FFFFFF" });//this shows the text on the corner of the screen with specified font that relates to the actual geometry dash  
    menu = this.add.sprite(1800, 1200, "background", 0x9966ff);//this generates the rectangle for the pause menu  
    menu.setScale(1.2);//this sets a scale for the menu
    menuText3 = this.add.text(menu.x, menu.y, "PAUSED", { fontFamily: "CustomFont", fontSize: 62, color: "#FFFFFF" });//this adds the text to the menu screen that follows the player because in the code below we state that menu.x is equal to player.x, this is where the paused text shows on the screen when you press the tab key
    menuText2 = this.add.text(menu.x, menu.y, "High Scores:", { fontFamily: "CustomFont", fontSize: 42, color: "#FFFFFF" });//this has the same logic as the comment above
    menuText = this.add.text(menu.x, menu.y, scoresSorted, { fontFamily: "CustomFont", fontSize: 42, color: "#FFFFFF" })//this adds the score text gained from the bubblesorting function into the menu
    reset();// generates the map and makes sure all variables are set correctly
    live = 0;//this initializes the life which starts at 0
    //initialize the movement keys which is space in order to jump 
    spacmKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);//This allows the user to use the space bar in our game
    // We learned how to implement gravity here: https://phasergames.com/using-gravity-in-phaser-3/
    player.body.setGravityY(6000);// This sets the gravity of the player
    this.cameras.main.startFollow(player, true, 1, .34);//this follows the player making the game smooth with no glitches. The 0.34 makes it not instantly follow the camera instead it has a small delay.
    this.cameras.main.setFollowOffset(-150, 150);//makes the player see more top right instead of middle.
    this.physics.add.collider(player, barrier);// if the user collides with a block or spike it will die.
    //create the sound effect objects
    bgMusic = this.sound.add("bgmusic");//this adds the sound track of the music audio
    die = this.sound.add("die");//this adds the sound when we die
    bgMusic.play();//play the sound at the start of this scene
  }
  update(time) {
    //update is the game loop 
    //all game logic goes here

    //We learned how to pause and unpause a game here: https://phaser.discourse.group/t/pausing-and-unpausing-physics-in-phaser-3/4679
    //pausing and resuming physics when tab is held down
    if (tabKey.isDown == true)//if the user is holding down the tab key
    {
      this.physics.pause();//this will pause the physics of the game 
      menu.setVisible(true);//this sets the visibility of the menu screen when the tab key is held down. Most of these are boolean statements that we learned through various websites.
      menuText.setVisible(true); //the following text applies here
      bgMusic.pause();//this pauses the music when the tab key is held down
      menuText2.setVisible(true);//the following text applies here
      menuText3.setVisible(true);//the following text applies here
      menuText2.text = "High Scores:";//this shows the text called high score on the menu screen  
      menuText3.text = "PAUSED";//this also shows the text called paused on the menu screen
    }
    else //this else statement makes it so that that paused screen does not show when you are playing the game. If we were to remove this else statement the paused screen would show up while playing the game and cause the physics of the game to freeze.
    {
      this.physics.resume();//this resumes the physics of the game if the tab key is not held down
      menu.setVisible(false);//his sets the visibility of the menu screen of false which means it will not show when the tab key is held down. Most of these are boolean statements that we learned through various websites.
      menuText.setVisible(false);//the following text applies here
      bgMusic.resume();//this resumes the game when the user is not holding down the tab key
      menuText2.setVisible(false);//the following text applies here
      menuText3.setVisible(false);//the following text applies here
      menuText2.text = "High Scores2:";// this makes sure the high scores text is updated
      menuText3.text = "PAUSED2";// this makes sure the paused text is updated
    }
    menu.x = player.x + 150//this allows the menu to follow the player and the 150 is to center the x coordinates because if you were to remove it the menu would be off centered
    menu.y = player.y - 120//this allows the menu to follow the player and the -120 is to center the y coordinates because if you were to remove it the menu would be off centered as well. this is to allow the user to see the menu clearly
    menuText.x = player.x - 300;//Sets the text for the pause screen on the x cordinate
    menuText.y = player.y - 300;//Sets the text for the pause screen on the y cordinate
    menuText.text = scoresSorted;//Puts the sorted scores in the pause menu

    menuText2.x = player.x - 300;//Sets the text for the pause screen on the x cordinate
    menuText2.y = player.y - 400;//Sets the text for the pause screen on the y cordinate
    menuText2.text = "High Scores:";//Puts "High Score" in the pause menu

    menuText3.x = player.x;//Sets the text for the pause screen on the x cordinate
    menuText3.y = player.y - 500;//Sets the text for the pause screen on the y cordinate
    menuText3.fontFamily = "PAUSED";//Puts "PAUSE" in the pause menu


    score = player.x - 200;// The score displayed on the screen follows the player to the left
    score = Math.round(score);//rounds the score
    liTxt = "Attempt " + live; //updates the text for attempts
    livesText.text = liTxt;// updates the attempts text each frame
    scTxt = "Score: " + score;// updates for the score
    scoreText.text = scTxt; // updates the score text each frame
    if (resetting == true) {//tells the game it's about to resets. if resetting is true than continue the next steps
      bgMusic.stop();//stops music
      ttime = time;//stops time
      resetting = false// makes sure this if statement is only run once
    }
    if (time - ttime > 1000) {//adds a delay at the start of the game for the user to get ready before they play the game. This is around 1-1.5 seconds
      livesText.y = 170; //makes text visible
      scoreText.y = player.y - 500; // aligns the y of scoretext to y of player
      scoreText.x = player.x - 700;//aligns the x of scoretext to x of player
      if (start == true) {// updates the variables at the start
        live++;//this increases the life up by one
        score++;//this increases the score by one
        start = false;// makes sure this if statement is only run once
      }
      if (play == true) {//resets sound track
        bgMusic.play();//this plays the music when the player resets
        play = false;// makes sure it only runs once per death
      }
      //this keeps the background behind the player so the player doesnt go further than the background
      if (dead == false)//checks if the player is dead 
      {
        player.setVelocityX(600);//makes the player move at a constant velocity
      }
      else {
        player.setVelocityX(0);//if its dead the player stops moving
      }
      //allows the player to move
      if (spacmKey.isDown && player.body.touching.down && dead == false)//makes sure the player is touching the ground and the space key is being pressed in order for the object to jump.
      {
        player.setVelocityY(-1300);//makes the object jump 
        flip = true;//makes the object flip if the player is holding spacebar
      }
      if (flip == true)//if the player hits spacebar
      {
        //increase the object rotation by 0.1
        flip1++;
        if (flip1 == 63)//only allows the player to be flipped again if it has been fully flipped
        {
          player.rotation = 0; // the flipping didn't work so we took it out
          flip = false;// we kept this variable to add a timer between the death and reset
          flip1 = 0;// we kept this variable to add a timer between the death and reset
          if (dead == true) {// if the user hits a spike or a block
            this.cameras.main.shake(200);//the camera will shake after being hit by a spike
            die.play(); // plays death sound of player
            addScore(score);//this usses the function add score each time the player dies. 
            reset();//this rests the player back to its original state so that the player can play again
            player.body.setGravityY(6000);//this sets the gravity back to normal after the game has reset
          }
        }
      }
      if (oKey.isDown && mKey.isDown && aKey.isDown && nKey.isDown && gKey.isDown) g = 1; else g = 0;
      if (player.y > 600 && dead == false) {// this states that if the players y coordinate is greater than 600 and if the variable of dead is equal to false  if they fall out the map they die.
        die.play();// this plays the dead music when the user dies
        dead = true;// makes sure the game knows the player died
        live++; // increases the attempt number
        reset();// this calls the reset function that we defined above.
      }
      if (this.physics.world.overlap(player, spikes) && dead == false && g != 1) {// if the player hits a spike the game will restart.
        dead = true;// makes sure the game knows the player died 
        live++;// increases the attempt number
        player.body.setGravityY(-6000);// makes the player go really high
        player.setVelocityY(-1300);//makes the object jump 
        flip = true;//makes the object flip if the player is holding spacebar
      }
    }
    game.x = player.x;//makes background follow player
  }//end of update
}//end of mainScene

class startScene extends Phaser.Scene {// this scene is the first scene the player will see
  constructor(config) {
    super(config);
  }
  preload() {
    this.load.image("startMessage", "assets/IMAGES/startButton.png"); //preloads the start button image
    this.load.image("backgroundStart", "assets/IMAGES/bgStart.png"); // preloads the background image 
    this.load.html('nameform', '/nameform.html');// this preloads the font that we font that we found from to use custom font in our game we used https://www.webtips.dev/webtips/phaser/custom-fonts-in-phaser3
    this.load.image('background', 'assets/IMAGES/deez.jpg');// preloads background image for text input
  } //end of preload
  //This specific peice of code was found from:https://labs.phaser.io/edit.html?src=src\game%20objects\dom%20element\input%20test.js
  create() {
    enterkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);//this implements the enter key into the system
    let element = this.add.dom(40000, 0).createFromCache('nameform');// loads the html for name input
    bgStart = this.physics.add.image(900, 300, "backgroundStart")// loads the background 1
    bgStart2 = this.add.image(900, 30000, "background");// loads the 2nd background
    bgStart.setScale(1.5);// this sets the portion size of the background
    bgStart2.setScale(1.5); // makes the image bigger to fit properly
    startMessage = this.physics.add.image(900, 670, "startMessage").setInteractive();// this makes the text input interactive allowing the user to press on it with there mouth
    startMessage.setScale(0.5); // makes the image half size to fit properly
    startMessage.on("pointerdown", function(pointer) {
      this.setTint(0xff0000); // makes the button red
    }); //end of pointerdown event
    startMessage.on("pointerup", function(pointer) {
      bgStart2.y = 300;// makes the background visible
      this.setVisible(false);// removes it from the screen
      //This specific peice of code was found from:https://labs.phaser.io/edit.html?src=src\game%20objects\dom%20element\input%20test.js
      element.x = 800;// makes the text input visible
      element.y = 400;// makes the text input visible
      element.addListener('keyup');//allows the user to press enter to continue
      element.addListener('click');//allows the user to click to continue
      element.on('keyup', function(e) {// checks if the player presses a key
        if (e.keyCode == 13) {// checks if the key is enter
          inputText = this.getChildByName('nameField');// makes sure only the input field is checked
          //  Have they entered anything?
          if (inputText.value != '') {
            //  Turn off the click events
            this.removeListener('click');
            //  Hide the login element
            this.setVisible(false);// removes from the screen the field
            playerName = inputText.value;// sets the player's name to whatever the user typed
            playerName = firstLetterCapitalized(playerName); // makes the player's name capitalized
            game.scene.remove("startMessageScreen");// removes the main menu scene
            game.scene.start("game");// starts the main game scene
          }
        }
      });
      element.on('click', function(event) {// checks if the player clicks
        if (event.target.name == 'playButton') {// checks if they click the start button
          inputText = this.getChildByName('nameField');// makes sure only the input field is checked
          //  Have they entered anything?
          if (inputText.value != '') {
            //  Turn off the click events
            this.removeListener('click');
            //  Hide the login element
            this.setVisible(false);// removes from the screen the field
            playerName = inputText.value;// sets the player's name to whatever the user typed
            playerName = firstLetterCapitalized(playerName);// makes the player's name capitalized
            game.scene.remove("startMessageScreen");// removes the main menu scene
            game.scene.start("game");// starts the main game scene
          }
        }
      });

    });

  }
} //end of startScene
// The configuration for the whole game
let config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1800,//game world width
  height: 800,//game world height
  dom: {
    createContainer: true// this is used for the html part with the text input so it shows correctly
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};
var game = new Phaser.Game(config);
game.scene.add("game", mainScene); // adds the main game scene
game.scene.add("startMessageScreen", startScene); // adds the beginning screen
game.scene.start("startMessageScreen"); // the scene or screen to startgame.scene.start("game");
//the sceen or screen to start
