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

//2. As a player, if I click a card, I want it to be revealed so that I know what it represents
//3. As a player, if I click a second card, I want it to be revealed so that I can see if it is like the first card
//4. As a player, if I have two cards revealed that do not match, I want them to become closed again
//5. As a player, if I have two cards revealed that match, I want them to remain open and change their color to indicate they’re matched
//6. As a player, if I have matched all the cards on the board, I want to receive a congratulations message so that I feel good about finishing the game
//7. As a player, I want to have a restart button on the board so that I can start the game from the beginning if I want to
//8. As a player, I want to have a timer on the page that starts when I click the first card and ends when I finish the game, so that I know how long the game took me
//9. As a player, I want to have a move counter on the page that increments every time I click on a card, so that I know how many moves the game took me
//10. As a player, I want to have a star rating on the page that decreases based on the number of moves I made in the game¸
//