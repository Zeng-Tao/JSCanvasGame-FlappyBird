class ParticleSystem {
    // constructor
    constructor(x, y, game) {
        this.game = game
        this.x = x
        this.y = y
        this.setup()
    }

    setup() {
        this.number = randomIntBetween(10, 20)
        this.particles = this.addParticles()
    }

    addParticles() {
        let ps = []
        let status = {
            name: 'particle2',
            x: this.x,
            y: this.y,
        }
        for (let i = 0; i < this.number; i++) {
            let p = new Particle(status, this.game)
            this.game.addSprites(p)
            ps.push(p)
        }
        return ps
    }


    debug() {
        if (this.game.debugMode) {
            // this.speed = debug_config['particle_speed']['value']
        }
    }

    update() {
        this.debug()
    }
}
