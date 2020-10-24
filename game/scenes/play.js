class Play extends Scene {
    // constructor
    constructor(name, game) {
        super(name, game)
        this.score = 0
    }

    setup() {
        // setup 在 TaoGame 绑定 scene 时执行
        this.addBackGround()
        this.pairs = this.addPipePairs(3)
        this.addGround()
        this.player = this.addPlayer()
        // this.enemies = this.addEnemies()
        // 注册场景按键事件
        // this.registerEvents()
    }

    addScore() {
        this.score += 10
    }

    addGround() {
        // 三张滚动的地面
        for (let i = 0; i < 3; i++) {
            let status = {
                x: 336 * i,
                y: this.game.height - 112,
                name: 'land',
            }
            let land = new Land(status, this.game)
            this.game.addSprites(land)
        }
    }

    addBackGround() {
        // 三张滚动的背景
        for (let i = 0; i < 3; i++) {
            let status = {
                x: 357 * i,
                y: -200,
                name: 'background',
            }
            let background = new BackGround(status, this.game)
            this.game.addSprites(background)
        }
    }

    addPlayer() {
        let status = {
            name: 'player',
            currentAnimation: 'fly',
            x: 200,
            y: 50,
        }
        let player = new Player(status, this.game)
        // 添加动画
        player.addAnimation('fly', ['b3', 'b2', 'b1'])
        this.game.addSprites(player)
        return player
    }

    addPipePairs(count = 3) {
        let pairs = []
        for (let i = 0; i < count; i++) {
            let pair = new PipePair({ 'x': i * 300 + 400 }, this.game)
            this.game.addSprites(pair)
            pairs.push(pair)
        }
        return pairs
    }

    addClouds(count = 2) {
        let clouds = []
        let status = {
            name: 'cloud',
        }
        for (let i = 0; i < count; i++) {
            let cloud = new Cloud(status, this.game)
            this.game.addSprites(cloud)
            clouds.push(cloud)
        }
        return clouds
    }

    addEnemies(number = 5) {
        let enemies = this.enemies || []
        // log('enemies, ', enemies)
        number = number - enemies.length
        for (let i = 0; i < number; i++) {
            let no = randomIntBetween(0, 4)
            let status = {
                name: `enemy${no}`,
            }
            let e = new Enemy(status, this.game)
            this.game.addSprites(e)
            enemies.push(e)
        }
        return enemies
    }

    registerEvents() {
        this.game.registerEvent('Escape', () => {
            this.backToHome()
        })
    }

    draw() {
        super.draw()
        // draw score
        this.game.drawText(this.score, 10, this.game.height - 10, 24)
    }

    update() {
        super.update()
        // let enemies = this.enemies
        // enemies.forEach((e, index)=> {
        //     if (e.die) {
        //         enemies.splice(index, 1)
        //     }
        // })
        // this.enemies = enemies
        // this.addEnemies()
    }

    backToHome() {
        let s = new Home('home', this.game)
        this.game.isReload = false
        this.game.runWithScene(s)
    }

}