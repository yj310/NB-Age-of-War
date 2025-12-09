function preload() {
    homeMusic = loadSound('assets/background_music/home.ogg');
    gameMusic = loadSound('assets/background_music/game.ogg');
}

function setup() {
    initialData();
}

function draw() {
    update();
    render();
}
