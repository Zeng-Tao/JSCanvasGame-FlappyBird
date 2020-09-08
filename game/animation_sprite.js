class AnimationSprite {
    // constructor
    constructor(status, game) {
        this.game = game
        this.die = false
        this.id = null
        this.width = null
        this.height = null
        this.centerX = null
        this.centerY = null
        this.animations = {}
        this.currentAnimation = null
        this.currentTextureIndex = 0
        this.currentTexture = null
        this.init(status)
    }

    init(status) {
        this.x = status['x'] || 0
        this.y = status['y'] || 0
        this.name = status['name']
        this.hp = status['hp'] || 1
        this.currentAnimation = status['currentAnimation']
    }

    playAnimation(animation_name) {
        let animation = this.animations[animation_name]
        let texturesCount = animation.length
        let index = this.currentTextureIndex % texturesCount
        this.currentTexture = animation[index]
        this.game.context.drawImage(this.currentTexture, this.x, this.y)
        this.currentTextureIndex += 1
    }

    addAnimation(animationName, imagesNname) {
        this.animations[animationName] = []
        for (name of imagesNname) {
            let texture = this.game.getImage(name)
            log('add animation image, ', texture)
            this.animations[animationName].push(texture)
        }
    }

    changeAnimation(animationName) {
        this.currentAnimation = animationName
    }

    draw() {
        this.playAnimation(this.currentAnimation)
    }

    debug() {
        // 让继承者实现
    }

    update() {
        if (this.game.debugMode) {
            this.debug()
        }
    }
}
