class AnimationSprite {
    // constructor
    constructor(status, game) {
        this.game = game
        this.die = false
        this.id = game.newId()
        this.width = null
        this.height = null
        this.centerX = null
        this.centerY = null
        this.animations = {}
        this.currentAnimation = null
        this.currentTextureIndex = 0
        this.currentTexture = null
        this.flipX = false
        this.flipY = false
        this.rotation = 0

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
        // this.game.context.drawImage(this.currentTexture, this.x, this.y)
        this.currentTextureIndex += 1

        this.width = this.currentTexture.width
        this.height = this.currentTexture.height
        this.centerX = this.currentTexture.width / 2 + this.x
        this.centerY = this.currentTexture.height / 2 + this.y

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

    stopMove() {
        this.speed = 0
    }

    draw() {
        this.playAnimation(this.currentAnimation)

        let context = this.game.context

        context.save()

        context.translate(this.centerX, this.centerY)

        if (this.flipX) {
            context.scale(-1, 1)
        }

        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-this.width / 2, -this.height / 2)
        context.drawImage(this.currentTexture, 0, 0)
        
        context.restore()
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
