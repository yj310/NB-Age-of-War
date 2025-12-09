function preload() {
    homeMusic = loadSound('assets/background_music/home.ogg');
    gameMusic = loadSound('assets/background_music/game.ogg');
}

function setup() {
    initialData();
    userStartAudio(); // 오디오 컨텍스트 시작 시도
}

function draw() {
    update();
    render();
}
