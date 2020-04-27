class Cloud extends Sprite {
    // constructor
    constructor(status, game) {
        super(status, game)
        this.setup()
    }

    setup() {
        this.speed = randomIntBetween(3, 8)
        this.x = randomIntBetween(-20, this.game.width - 10)
        this.y = -50
    }

    move() {
        this.y += this.speed
        if (this.y > this.game.height + 100) {
            this.setup()
        }
    }

    debug() {
        if (this.game.debugMode) {
            this.speed = debug_config['cloud_speed']['value']
        }
    }

    update() {
        super.update()
        this.debug()
        this.move()
    }
}
