class Scene {
    // constructor
    constructor(name, game) {
        this.name = name
        this.game = game
        this.actions = {}
        this.keys = {}
        this.sprites = []
        this.collidPairs = []
    }

    drawSprites() {
        for (let s of this.sprites) {
            s.draw()
        }
    }


    draw() {
        this.drawSprites()
    }

    update() {
        // 暂停, 在场景中暂停而不是在 game 中, 这样 game 中的事件还可以继续响应
        if (window.pause) {
            return
        }
        // 监测碰撞事件
        let collidPairs = this.collidPairs
        collidPairs.forEach((pair, index) => {
            let a = pair[0]
            let b = pair[1]
            let callback = pair[2]
            if (a.die || b.die) {
                collidPairs.splice(index, 1)
            } else if (this.game.isCollided(a, b)) {
                callback()
            }
        })
        this.collidPairs = collidPairs
        // 响应按键事件
        for (let k in this.keys) {
            if (this.keys[k] === true) {
                this.actions[k]()
            }
        }
        // 更新状态
        var sprites = this.sprites
        for (let s of sprites) {
            if (s.die) {
                let index = sprites.indexOf(s)
                sprites.splice(index, 1)
                continue
            }
            s.update && s.update()
        }
        this.sprites = sprites
    }
}