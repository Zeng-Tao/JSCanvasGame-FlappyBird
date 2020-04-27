class BackGround extends Sprite {
    // constructor
    constructor(status, game) {
        super(status, game)
        this.setup()
    }

    setup() {
        this.speed = 3
    }

    move() {
        this.x -= this.speed
        if (this.x <= -this.width) {
            this.x = this.width * 2
        }
    }

    debug() {
        super.debug()
        // this.speed = debug_config['background']['value']
    }

    update() {
        super.update()
        this.move()
    }
}