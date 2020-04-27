class Sprite {
    // constructor
    constructor(status, game) {
        this.game = game
        this.die = false
        this.id = null
        this.image = null
        this.width = null
        this.height = null
        this.centerX = null
        this.centerY = null
        this.init(status)
    }

    init(status) {
        this.x = status['x'] || 0
        this.y = status['y'] || 0
        this.name = status['name']
        this.hp = status['hp'] || 1
        this.image = this.game.getImage(this.name)

        var self = this
        this.image.onload = function () {
            self.width = self.image.width
            self.height = self.image.height

            self.centerX = self.x + self.width / 2
            self.centerY = self.y + self.height / 2
        }
    }

    draw() {
        if (this.die) {
            return
        }
        this.game.drawSprite(this)
    }

    debug() {
        // 让继承者实现
    }

    update() {
        // 中心坐标算的不对, 可能是更新的太慢了
        // this.centerX = this.x + this.width / 2
        // this.centerY = this.y + this.height / 2
        if (this.game.debugMode) {
            this.debug()
        }
    }
}