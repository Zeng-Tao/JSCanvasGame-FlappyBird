class PipePair {
    // constructor
    constructor(status, game) {
        this.game = game
        this.die = false
        this.id = game.newId()
        this.init(status)
    }

    init(status) {
        this.x = status['x'] || 0
        this.y = status['y'] || 0
        this.speed = 5
        this.hspace = 100
        this.dwon = new Pipe({name: 'pipe-down'}, this.game)
        this.up = new Pipe({name: 'pipe-up'}, this.game)
        this.setup()
    }

    setup() {
        log('setup down, ', this.dwon)
        log('setup up, ', this.up)
        this.dwon.x = this.x
        this.dwon.y = randomIntBetween(-150, 150)
        this.up.x = this.y
        this.up.y = this.dwon.y + this.hspace + this.dwon.height
    }

    move() {
        this.x -= this.speed
        if (this.x <= -100) {
            this.x = this.game.width + 200
            this.setup()
        }
        this.up.x = this.x
        this.dwon.x = this.x
    }

    draw() {
        this.up.draw()
        this.dwon.draw()
    }

    debug() {
        // super.debug()
        // this.speed = debug_config['background']['value']
    }

    update() {
        // super.update()
        this.move()
    }
}