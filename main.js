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


let initSource = function () {
    let images = {
        player: 'images/b1.png',
        b1: 'images/b1.png',
        b2: 'images/b2.png',
        b3: 'images/b3.png',

        background: 'images/bg.png',
        land: 'images/land.png',
        'pipe-up': 'images/pipe-up.png',
        'pipe-down': 'images/pipe-down.png',
    }

    let length = Object.keys(images).length
    let imgs = {}
    for (let name in images) {
        let img = new Image()
        img.src = images[name]
        img.onload = function() {
            imgs[name] = img
            if (length === Object.keys(imgs).length) {
                return initGame(imgs)
            }
        }
    }
}

let initGame = function (images) {
    game = new TaoGame(600, 400, images)
    game.debugMode = true
    s = new Play('play', game)
    // s = new Home('home', game)
    // s = new Edit('edit', game)
    game.runWithScene(s)
    return game
}


let __main = function () {
    // let game = initGame()
    initSource()
    setupDebugPanel()
}

__main()
