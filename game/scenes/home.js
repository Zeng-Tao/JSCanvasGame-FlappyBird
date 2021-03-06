class Home extends Scene {
    // constructor
    constructor(name, game) {
        super(name, game)
        // location.reload()
    }

    setup() {
        // setup 在 TaoGame 绑定 scene 时执行

        // 重新加载页面, 否则随着不断的重新开始游戏, fps 会越来越快
        // 不明白为什么, 所以在进入 home 页时, 手动重新加载页面
        // if (!this.game.isReload) {
        //     location.reload()
        //     this.game.isReload = true
        // }

        this.addBackGround()
        this.addGround()
        this.player = this.addPlayer()

        // 注册场景按键事件
        this.registerEvents()
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
            x: 250,
            y: 80,
        }
        let player = new Player(status, this.game)
        // 添加动画
        player.addAnimation('fly', ['b3', 'b2', 'b1'])
        this.game.addSprites(player)
        return player
    }

    newGame() {
        let s = new Play('play', this.game)
        this.game.runWithScene(s)
    }

    registerEvents() {
        this.game.registerEvent('k', () => {
            this.newGame()
        })
    }

    showInfo() {
        let g = this.game
        let text = "按 K 开始游戏!"
        g.drawText(text, 150, 150, 36)
    }

    draw() {
        super.draw()
        this.showInfo()
    }

    update() {
        super.update()
        if (this.player.y > 80) {
            this.player.moveUp()
        }
    }
}