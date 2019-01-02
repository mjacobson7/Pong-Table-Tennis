let canvas;
let canvasContext;
canvas = document.getElementById('gameCanvas');
c = canvas.getContext('2d');

if (window.innerWidth < canvas.width || window.innerHeight < canvas.height) {
    alert('This game requires the screen to be 800px by 600px.  Please adjust your browser window to fit these dimensions and refresh the page. If you\'re on mobile, please try again using a desktop computer.');
}
    const ball = new Ball(50, 50, 7, 4, 10, '#FFF');
    let player1Paddle = new Paddle(0, 250, 10, 100, '#FFF');
    let player2Paddle = new Paddle(canvas.width - 10, 250, 10, 100, '#FFF');

    let player1Score = 0;
    let player2Score = 0;
    const winningScore = 3;

    let showingWinScreen = false;

    let playSoundXTimes = 1;
    let showStartScreen = true;

    handleMouseClick = (event) => {
        if (showingWinScreen) {
            player1Score = 0;
            player2Score = 0;
            showingWinScreen = false;
            playSoundXTimes = 1;
        } else if (showStartScreen) {
            showStartScreen = false;

        }
    }

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', (event) => {
        let mousePos = calculateMousePos(event);
        player1Paddle.y = mousePos.y - (player1Paddle.h / 2);
    })












    ballReset = () => {
        if (player1Score >= winningScore || player2Score >= winningScore) {
            showingWinScreen = true;
        }
        ball.dx = -ball.dx;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    computerMovement = () => {
        let paddle2YCenter = player2Paddle.y + (player2Paddle.h / 2);
        if (paddle2YCenter < ball.y - 35) {
            player2Paddle.y += 6;
        } else if (paddle2YCenter > ball.y + 35) {
            player2Paddle.y -= 6;
        }
    }

    drawNet = () => {
        for (let i = 0; i < canvas.height; i += 40) {
            colorRect(canvas.width / 2 - 1, i, 2, 20, '#FFF');
        }
    }

    winScreen = () => {
        c.fillStyle = '#FFF';
        c.font = '20px arcadeFont';

        if (player1Score >= winningScore) {
            let winTxt = 'You Won!';
            playSoundXTimes == 1 ? getSound('WIN') : null;
            playSoundXTimes++;
            c.fillText(winTxt, canvas.width / 2 - c.measureText(winTxt).width / 2, 200);
        } else if (player2Score >= winningScore) {
            let loseTxt = 'You Lost!';
            playSoundXTimes == 1 ? getSound('LOSE') : null;
            playSoundXTimes++;
            c.fillText(loseTxt, canvas.width / 2 - c.measureText(loseTxt).width / 2, 200);
        }

        c.font = '12px arcadeFont';
        let continueTxt = 'Click anywhere to play again';
        c.fillText(continueTxt, canvas.width / 2 - c.measureText(continueTxt).width / 2, 500);
    }

    startScreen = () => {

        c.fillStyle = '#FFF';
        c.font = '60px arcadeFont';
        let gameTitle = 'Pong Table Tennis';
        c.fillText(gameTitle, canvas.width / 2 - c.measureText(gameTitle).width / 2,
            canvas.height / 2);


        c.font = '12px arcadeFont';

        let author = 'Created by Max Jacobson';
        c.fillText(author, canvas.width / 2 - c.measureText(author).width / 2, canvas.height / 2 + 50);

        c.font = '20px arcadeFont';
        let startGame = 'Click anywhere to start';
        c.fillText(startGame, canvas.width / 2 - c.measureText(startGame).width / 2, 500);

    }

    displayScore = () => {
        c.font = '20px arcadeFont';
        c.fillText('Player Score: ' + player1Score, 10, 20);
        c.fillText('Computer Score: ' + player2Score, canvas.width - 230, 20);
    }



    animate = () => {
        requestAnimationFrame(animate);

        //black canvas screen
        colorRect(0, 0, canvas.width, canvas.height, '#000');

        if (showStartScreen) {
            return startScreen();
        }

        if (showingWinScreen) {
            return winScreen();
        }

        drawNet();
        player1Paddle.draw();
        player2Paddle.draw();
        ball.draw();
        displayScore();
        computerMovement();

    }

    animate();

