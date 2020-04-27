class Enemy extends Sprite {
    // constructor
    constructor(status, game) {
        super(status, game)
        this.speed = 5
        this.cooldown = randomIntBetween(80, 120)
        this.setup()
    }

    exploded() {
        // 生成爆炸粒子系统
        let ps = new ParticleSystem(this.x, this.y, this.game)
        this.die = true
    }

    fire() {
        // 生产子弹
        if (this.cooldown < 0) {
            let stauts = {
                y: (this.y + this.height - 20),
                name: 'enemy_bullet',
            }
            let b = new Bullet(stauts, this.game)
            this.bullets.push(b)
            let x = this.x + this.width / 2 - b.width / 2
            b.x = x
            this.game.addSprites(b)
            if (this.game.debugMode) {
                this.cooldown = debug_config['enemy_cooldown']['value']
            } else {
                this.cooldown = randomIntBetween(40, 60)
            }
        }
    }

    move() {
        this.y += this.speed
        if (this.y > this.game.height + 100) {
            this.die = true
        }
    }

    setup() {
        this.bullets = []
        this.x = randomIntBetween(1, this.game.width - this.width - 100)
        this.y = randomIntBetween(-10, -50)
        this.speed = randomIntBetween(1, 5)
        this.cooldown = randomIntBetween(3, 8)
    }

    updateBullets() {
        let bullets = this.bullets
        bullets.forEach((b, index)=> {
            if (b.die) {
                bullets.splice(index, 1)
            }
        })
        this.bullets = bullets
    }

    update() {
        super.update()
        this.updateBullets()
        this.move()
        this.fire()
        this.cooldown -= 1
    }

}