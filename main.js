let debugInputTemplate = function (config) {
    const description = config['description']
    const id = config['id']
    const max = config['max']
    const min = config['min']
    const value = config['value']
    const changed = config['changed'] || false

    let t = `
    <div class="debug-input">
        <input type="range" value="${value}" id="${id}" max="${max}" min="${min}">
        ${description}:<span class=""></span>
    </div>
    `

    return t
}


let setupDebugInputUi = function () {
    let div = e('#div-debug-input')
    for (let key in debug_config) {
        let config = debug_config[key]
        let html_template = debugInputTemplate(config)
        div.insertAdjacentHTML('beforeEnd', html_template)
    }
}


let setupDebugPanel = function () {
    setupDebugInputUi()
    let divs = document.querySelectorAll('.debug-input')
    for (let div of divs) {
        let input = div.querySelector('input')
        let span = div.querySelector('span')
        let value = input.value
        span.innerText = value

        div.addEventListener('input', () => {
            let value = input.value
            span.innerText = value
            let id = input.id
            for (let key in debug_config) {
                let config = debug_config[key]
                if (id === config.id) {
                    config.value = parseInt(value)
                }
            }
        })
    }

    let b = e('#stop-or-not')
    if (window.pause) {
        b.innerText = '继续'
    } else {
        b.innerText = '暂停'
    }
    b.addEventListener('click', function () {
        window.pause = !window.pause
        if (window.pause) {
            b.innerText = '继续'
        } else {
            b.innerText = '暂停'
        }
    })
}


let loadimages = function () {
    let images = {
        cloud: 'images/cloud.png',
        sky: 'images/sky.png',
        player: 'images/player.png',
        enemy0: 'images/enemy0.png',
        enemy1: 'images/enemy1.png',
        enemy2: 'images/enemy2.png',
        enemy3: 'images/enemy3.png',
        enemy4: 'images/enemy4.png',
        player_bullet: 'images/player_bullet.png',
        enemy_bullet: 'images/enemy_bullet.png',
        particle0: 'images/particle0.png',
        particle2: 'images/particle2.png',
    }
    return images
}


let initGame = function () {
    let images = loadimages()
    game = new TaoGame(400, 500, images)
    // game.debugMode = true
    s = new Play('play', game)
    // s = new Home('home', game)
    // s = new Edit('edit', game)
    game.runWithScene(s)
    return game
}


let __main = function () {
    let game = initGame()
    setupDebugPanel()
}

__main()