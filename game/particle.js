class Particle extends Sprite {
    // constructor
    constructor(status, game) {
        super(status, game)
        this.gravity = 0.3
        this.setup()
    }

    setup() {
        this.speedX = randomIntBetween(0, 5) * randomNegativeOrPositive()
        this.speedY = randomIntBetween(0, 5) * randomNegativeOrPositive()
        this.hp = randomIntBetween(10, 15)
    }

    move() {
        // 重力加锁
        this.speedY += this.gravity
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > this.game.width + this.width) {
            this.die = true
        }
        if (this.y < 0 || this.y > this.game.height + this.height) {
            this.die = true
        }
    }

    debug() {
        if (this.game.debugMode) {
            // this.speed = debug_config['particle_speed']['value']
        }
    }

    update() {
        super.update()
        this.debug()
        this.move()
        this.hp -= 1
        if (this.hp < 0) {
            this.die = true
        }
    }

}