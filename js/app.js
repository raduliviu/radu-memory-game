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

//Function that shuffles the cards and inserts them into the HTML
function setBoard() {
    const cards = $('.card');

    const shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++) {
        $('.deck').append(shuffledCards[i]);
    }
}

setBoard();

//Empty array that will hold the cards that are clicked
let clickedCards = [];
//Counter to keep track of how many pairs have been matched
let matchedCards = 0;

//When clicking on a card...
$('.card').click(function() {
//I'm checking if a card is already open, if it's not, then I open it
    if (!$(this).hasClass('open show')) {       
        $(this).addClass('open show');
        clickedCards.push($(this));
        if (clickedCards.length === 2) {
            //Every time a pair of cards is clicked, I increment the move counter
            //Moves incrementer taken from https://stackoverflow.com/a/4701358
            $('.moves').html(function (i, val) { return val * 1 + 1 });
            //Star rating for the game, you get less stars based on how many moves you make
            if (Number($('.moves').text()) <= 8) {
                console.log('On your way to a 3-star game!');
            } else if (Number($('.moves').text()) > 8 && Number($('.moves').text()) < 16) {
                console.log('Entering two star territory!');
                $('.stars > li:first-child > i').removeClass('fa-star').addClass('fa-star-o');
            }  else {
                console.log('One star, but at least you are having fun!');
                $('.stars > li:nth-child(2) > i').removeClass('fa-star').addClass('fa-star-o');
            }
            //Mechanism for closing pairs of cards that do not match
            let firstCard = clickedCards[0].children().attr('class');
            let secondCard = clickedCards[1].children().attr('class');
            if (firstCard !== secondCard) {
                //Player can't click on a third card until the unmatching cards are flipped back
                $('.deck').addClass('noclick')
                //The non-matching cards are displayed together for a little while on the page, then they get flipped back
                setTimeout(function wait() {
                    clickedCards[0].removeClass('open show');
                    clickedCards[1].removeClass('open show');
                    clickedCards = [];
                    $('.deck').removeClass('noclick')
                }, 700);
            } else {                
                //If two cards match, I lock them into position on the page and I also let the game know that we have made progress towards the victory condition
                clickedCards[0].removeClass('open show').addClass('match');
                clickedCards[1].removeClass('open show').addClass('match');
                matchedCards++;
                clickedCards = [];
            }
        }
    }
    //When all the cards are matched, you get a victory pop-up
    if (matchedCards === 8) {
        Clock.pause();
        $('#congratsModal').modal('show');
        $('.moves').clone().appendTo('#finishedMoves');
        $('.timer').clone().appendTo('#finishedTime');
        $('.stars').clone().addClass('end-score').appendTo('#finishedRating');
    }
});

//Count-up timer got from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
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

//The first time you click on the deck of cards, you start a count-up timer
$('.deck').one("click", function () {
    Clock.start();
});

//Reset functionality to start a new game
function gameRestart() {
    clickedCards = [];
    matchedCards = 0;
    $('.card').removeClass('open show match');
    $('.stars > li:first-child > i').removeClass('fa-star-o').addClass('fa-star');
    $('.stars > li:nth-child(2) > i').removeClass('fa-star-o').addClass('fa-star');
    setBoard();
    Clock.reset();
    $('.moves').text('0');
    $('.deck').one("click", function () {
        Clock.start();
    });
    $('#finishedMoves').empty();
    $('#finishedTime').empty();
    $('#finishedRating').empty();
}

$('.restart').click(function () {
    gameRestart();
});