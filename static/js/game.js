// get the character from the html
var character = document.getElementById("character")
var game = document.getElementById("game")

var width = parseInt(window.getComputedStyle(document.getElementById("game")).getPropertyValue("width"))
var height = parseInt(window.getComputedStyle(document.getElementById("game")).getPropertyValue("height"))

var interval
var counter = 0
var score = 0
// to prevent two keys to be pressed at once
var both = 0;
var start_game = false;

var current_blocks = []

function moveLeft() {
    // get the left key pressed
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"))
    // increase the character object position in style
    if (left > 0) {
        character.style.left = left - 2 + "px";
    }
}

function moveRight() {
    // get the right key pressed
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"))
    // increase the character object position in style
    if (left < width - parseInt(window.getComputedStyle(character).getPropertyValue("width"))) {
        character.style.left = left + 2 + "px";
    }
}

// check for keydown eventListener
document.addEventListener("keydown", event => {
    if (both === 0) {
        both++;
        // check if the button is clicked
        if (event.key === "ArrowLeft") {
            // create variable that will run the correct function
            interval = setInterval(moveLeft, 1)
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1)
        }
        if (event.key === "Enter") {
            start_game = true;
        }
    }
})
// check for keyup eventListener
document.addEventListener("keyup", event => {
    // stop moving the character
    clearInterval(interval)
    both = 0
})

document.addEventListener("keyup", event => {
    // stop moving the character
    clearInterval(interval)
    both = 0
})
window.setInterval(
    function () {
        if (start_game) {
            score++
            document.getElementById("score").innerHTML = "Score: " + score;
        }
    }, 1000);

var blocks = setInterval(() => {
    var block_last = document.getElementById("block" + (counter-1))
    var hole_last = document.getElementById("hole" + (counter-1))
    var character_top = parseInt(window.getComputedStyle(character).getPropertyValue("top"))
    var character_left = parseInt(window.getComputedStyle(character).getPropertyValue("left"))
    var drop = 0;

    if (counter > 0) {
        // get the top of the last block
        var block_last_top = parseInt(window.getComputedStyle(block_last).getPropertyValue("top"))
        var hole_last_top = parseInt(window.getComputedStyle(hole_last).getPropertyValue("top"))        
    }

    // create block within the game block
    if (block_last_top < height-150 || counter == 0) {
        // create new element in html with javascrip
        var block = document.createElement("div")
        var hole = document.createElement("div")
        // give attributes to them
        block.setAttribute("class", "block")
        hole.setAttribute("class", "hole")
        block.setAttribute("id", "block"+counter)
        hole.setAttribute("id", "hole"+counter)
    
        // create block 100 px below the last
        block.style.top = block_last_top + 125 + "px"
        hole.style.top = hole_last_top + 125 + "px"
        
        var hole_width = hole.style.right
        // var random = Math.floor(Math.random() * width-30)
        var random = Math.random() * width - hole_width
        hole.style.left = random + "px"
        // add them to the game div
        game.appendChild(block)
        game.appendChild(hole)

        // add counter to the array of current_blocks
        current_blocks.push(counter)
        
        counter++
    }

    if (character_top <= 0 || character_top >= height) {
        alert("GAME OVER")
        clearInterval(blocks)
        location.reload()
        start_game = false
    }
    if (start_game) {
        
        // score++
        for (let i = 0; i < current_blocks.length; i++) {
            let current = current_blocks[i]
            let i_hole = document.getElementById("hole"+current)
            let i_block = document.getElementById("block"+current)
            var i_block_top = parseFloat(window.getComputedStyle(i_block).getPropertyValue("top"))
            var i_hole_left = parseFloat(window.getComputedStyle(i_hole).getPropertyValue("left"))
            i_block.style.top = i_block_top - 0.5 + "px"
            i_hole.style.top = i_block_top - 0.5 + "px"
            // remove the block from the array
            if (i_block_top < -15) {
                current_blocks.shift()
                i_block.remove();
                i_hole.remove();
            }
            if (i_block_top - 20 < character_top && i_block_top > character_top) {
                // increases drop when the character is on the block
                drop++
                // if (i_hole_left  <=  character_left && i_hole_left+150  >=  character_left) {
                if (i_hole_left  <=  character_left && i_hole_left+200  >=  character_left) {
                    drop = 0
                }
            }
        }
        if (drop == 0) {
            if (character_top < height) {
                character.style.top = character_top + 2 + "px"
            }
        }else{
            character.style.top = character_top - 0.5 + "px"
        }        
        // document.getElementById("score").textContent = "Score: " + score
    }
}, 1);



