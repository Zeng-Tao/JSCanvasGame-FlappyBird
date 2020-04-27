class Bullet extends Sprite {
    // constructor
    constructor(status, game) {
        super(status, game)
        this.setup()
    }

    setup() {
        if (this.name === 'player_bullet') {
            this.speed = 5
        } else if (this.name === 'enemy_bullet') {
            this.speed = -5
        }
    }

    move() {
        this.y -= this.speed
        if (this.name === 'player_bullet') {
            if (this.y < -100) {
                this.die = true
            }
        } else if (this.name === 'enemy_bullet') {
            if (this.y > this.game.height) {
                this.die = true
            }    
        }
    }

    debug() {
        if (this.game.debugMode) {
            if (this.name === 'player_bullet') {
                this.speed = debug_config['player_bullet_speed']['value']
            } else if (this.name === 'enemy_bullet') {
                this.speed = debug_config['enemy_bullet_speed']['value']
            }
        }
    }

    update() {
        super.update()
        this.debug()
        this.move()
    }

}