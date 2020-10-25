class End extends Scene {
    // constructor
    constructor(name, game, args) {
        super(name, game, args)
        // location.reload()
    }

    setup() {
        this.addBackGround()
        this.addGround()

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

    newGame() {
        let s = new Play('play', this.game)
        this.game.runWithScene(s)
    }

    registerEvents() {
        this.game.registerEvent('r', () => {
            this.newGame()
        })
    }

    showInfo() {
        let g = this.game
        let text = "按 R 重新开始游戏!"
        g.drawText(text, 150, 150, 36)
        
        let score = this.args['score']
        score = `得分 ${score}`
        g.drawText(score, 200, 190, 28)
    }

    draw() {
        super.draw()
        this.showInfo()
    }

    update() {
        super.update()
    }
}