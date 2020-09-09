class Player extends AnimationSprite {
    // constructor
    constructor(status, game) {
        super(status, game)
        this.speedY = 3
        this.speedX = 3
        this.jupmY = 10
        this.gravity = 0.5
        this.cooldown = 5
        this.setup()
    }

    moveUp() {
        this.y -= this.jupmY
        if (this.y < 0) {
            this.y = 0
        }
        this.speedY = 0
        this.rotation = -45
    }

    dropDown() {
        if (this.y > 265) {
            return
        }
        this.y += this.speedY
        if (this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height
        }
    }

    moveLeft() {
        this.flipX = true
        this.x -= this.speedX
    }

    moveRight() {
        this.flipX = false
        this.x += this.speedX
    }

    setUpInputs() {
        this.game.registerEvent('j', () => {
            this.moveUp()
        })
        this.game.registerEvent('a', () => {
            this.moveLeft()
        })
        this.game.registerEvent('d', () => {
            this.moveRight()
        })
    }

    setup() {
        this.setUpInputs()
    }

    update() {
        super.update()
        this.dropDown()
        this.speedY += this.gravity
        // 更新 rotation
        if (this.rotation < 45) {
            this.rotation += 10
        }
    }

}