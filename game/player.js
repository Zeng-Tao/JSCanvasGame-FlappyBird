class Player extends AnimationSprite {
    // constructor
    constructor(status, game) {
        super(status, game)
        this.speedY = 3
        this.jupmY = 10
        this.gravity = 0.5
        this.cooldown = 5
        this.rotate = 25
        this.setup()
    }

    moveUp() {
        this.y -= this.jupmY
        if (this.y < 0) {
            this.y = 0
        }
        this.speedY = 0
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

    setUpInputs() {
        this.game.registerEvent('j', () => {
            this.moveUp()
        })
    }

    setup() {
        this.setUpInputs()
    }

    update() {
        super.update()
        this.dropDown()
        this.speedY += this.gravity
    }

}