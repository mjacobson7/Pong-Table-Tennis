class Ball {
    constructor(x, y, dx, dy, r, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.color = color;
    }

    draw() {
        colorCircle(this.x, this.y, this.r, this.color);
        this.update();
    }

    update(tes) {
        this.x += this.dx;
        this.y += this.dy;


        if (this.x - this.r < player1Paddle.w) {
            if (this.y + this.r > player1Paddle.y && this.y - this.r < player1Paddle.y + player1Paddle.h) {
                getSound('HIT');
                this.dx = -this.dx;
                let deltaY = this.y - (player1Paddle.y + player1Paddle.h / 2);
                this.dy = deltaY * 0.15;

            }
            else if (this.x + this.r < 0) {
                getSound('POINT');
                player2Score++;
                colorRect(0, 0, canvas.width / 2, canvas.height, 'red');
                ballReset();
            }
        }




        if (this.x > canvas.width - player2Paddle.w) {
            if (this.y + this.r > player2Paddle.y && this.y - this.r < player2Paddle.y + player2Paddle.h) {
                getSound('HIT');
                this.dx = -this.dx;
                let deltaY = this.y - (player2Paddle.y + player2Paddle.h / 2);
                this.dy = deltaY * 0.15;
            }
            else if (this.x - this.r > canvas.width) {
                getSound('POINT');
                player1Score++;
                colorRect(canvas.width / 2, 0, canvas.width / 2, canvas.height, 'red');
                ballReset();
            }
        }

        if (this.y + this.r >= canvas.height) {
            getSound('WALL');
            this.dy = -this.dy;
        }
        if (this.y - this.r <= 0) {
            getSound('WALL');
            this.dy = -this.dy;
        }



    }
}