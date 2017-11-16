//1. As a player, I want the board to be randomized every time I load the game so that I have a different playing experience every time
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//I'm creating a function that shuffles the cards and inserts them into the HTML
function setBoard() {
    const cards = $('.card');

    const shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++) {
        $('.deck').append(shuffledCards[i]);
    }
}

setBoard();

//2. As a player, if I click a card, I want it to be revealed so that I know what it represents
//3. As a player, if I click a second card, I want it to be revealed so that I can see if it is like the first card
let clickedCards = [];
let matchedCards = 0;

$('.card').click(function() {
    if (!$(this).hasClass('open show')) {       //I'm checking if a card is already open, if it's not, then I open it
        $(this).addClass('open show');
        clickedCards.push($(this));
        if (clickedCards.length === 2) {             
            //4. As a player, if I have two cards revealed that do not match, I want them to become closed again
            let firstCard = clickedCards[0].children().attr('class');
            let secondCard = clickedCards[1].children().attr('class');
            if (firstCard !== secondCard) {
                setTimeout(function wait() {        //The non-matching cards are displayed together for 350ms on the page, then they get flipped back
                    clickedCards[0].removeClass('open show');
                    clickedCards[1].removeClass('open show');
                    clickedCards = [];
                }, 350);
            } else {                
                //5. As a player, if I have two cards revealed that match, I want them to remain open and change their color to indicate they’re matched
                clickedCards[0].removeClass('open show').addClass('match');
                clickedCards[1].removeClass('open show').addClass('match');
                matchedCards++;
                clickedCards = [];
            }
        }
    }
    //6. As a player, if I have matched all the cards on the board, I want to receive a congratulations message so that I feel good about finishing the game
    if (matchedCards === 8) {       //Placeholder, just wanted to see the mechanism works
        $('h1').css('color', 'red');
        Clock.pause();
    }
});

//7. As a player, I want to have a restart button on the board so that I can start the game from the beginning if I want to
//8. As a player, I want to have a timer on the page that starts when I click the first card and ends when I finish the game, so that I know how long the game took me
//https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var Clock = {
    totalSeconds: 0,

    start: function () {
        var self = this;
        function pad(val) { return val > 9 ? val : "0" + val; }
        this.interval = setInterval(function () {
            self.totalSeconds += 1;


            $(".min").text(pad(Math.floor(self.totalSeconds / 60 % 60)));
            $(".sec").text(pad(parseInt(self.totalSeconds % 60)));
        }, 1000);
    },

    reset: function () {
        Clock.totalSeconds = null;
        clearInterval(this.interval);
        $(".min").text("00");
        $(".sec").text("00");
    },

    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
    },

    resume: function () {
        if (!this.interval) this.start();
    },

    restart: function () {
        this.reset();
        Clock.start();
    }
};

$('.deck').one("click", function () {
    Clock.start();
});

//9. As a player, I want to have a move counter on the page that increments every time I click on a card, so that I know how many moves the game took me
//https://stackoverflow.com/questions/4701349/jquery-increase-the-value-of-a-counter-when-a-button-is-clicked
//10. As a player, I want to have a star rating on the page that decreases based on the number of moves I made in the game¸
