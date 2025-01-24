class GameTimer {
    constructor() {
        this.seconds = 0;
        this.minutes = 0;
        this.timerInterval = null;
        this.isRunning = false;
    }

    toJSON() {
        return {
            minutes: this.minutes,
            seconds: this.seconds,
            isRunning: this.isRunning
        };
    }

    static fromJSON(json) {
        if (!json) return new GameTimer();

        const timer = new GameTimer();
        timer.minutes = json.minutes ?? 0;
        timer.seconds = json.seconds ?? 0;

        if (timer.timerInterval) {
            clearInterval(timer.timerInterval);
        }

        if (json.isRunning) {
            timer.start();
        }
        return timer;
    }

    clone() {
        const clonedTimer = new GameTimer();
        clonedTimer.minutes = this.minutes;
        clonedTimer.seconds = this.seconds;
        clonedTimer.isRunning = false;
        return clonedTimer;
    }

    start() {
        if (!this.isRunning) {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }

            this.isRunning = true;
            this.timerInterval = setInterval(() => {
                this.seconds++;
                if (this.seconds === 60) {
                    this.minutes++;
                    this.seconds = 0;
                }
                this.updateDisplay();
            }, 1000);
        }
    }

    stop() {
        if (this.isRunning) {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
            this.isRunning = false;
        }
    }

    reset() {
        this.stop();
        this.seconds = 0;
        this.minutes = 0;
        this.updateDisplay();
    }

    getSeconds(){
        return ((this.minutes * 60) + this.seconds);
    }

    // call on the form timer1.compareTo(timer2), returns true if timer1 > timer2
    compareTo(timer) {
        return this.getSeconds() > timer.getSeconds();
    }

    getFormattedTime() {
        const paddedMinutes = String(this.minutes).padStart(2, '0');
        const paddedSeconds = String(this.seconds).padStart(2, '0');
        return `${paddedMinutes}:${paddedSeconds}`;
    }

    updateDisplay() {
        const timerDisplay = document.getElementById('timer');
        if (timerDisplay) {
            timerDisplay.textContent = this.getFormattedTime();
        }
    }
}

export { GameTimer };