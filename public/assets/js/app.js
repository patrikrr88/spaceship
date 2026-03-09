const space = document.getElementById("space");
const logContainer = document.getElementById("logContainer");
const cmdInput = document.getElementById("cmdInput");

function log(msg) {
    const div = document.createElement("div");
    div.className = "log-line";
    div.textContent = ">> " + msg;
    logContainer.appendChild(div);
    
    logContainer.scrollTop = logContainer.scrollHeight;
}

function addObject(src, x, y, size = 100) {
    const img = document.createElement("img");
    img.src = "./assets/img/" + src;
    img.className = "space-object";
    img.style.left = x + "px";
    img.style.top = y + "px";
    img.style.width = size + "px";
    img.style.transition = "left 0.5s ease-in-out, top 0.5s ease-in-out";
    space.appendChild(img);
    return img;
}

/* Demo scéna */
const width = window.innerWidth;
const height = window.innerHeight;

for (let i = 0; i < 50; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let size = 10 + Math.random() * 10; // malé hvězdy: 10–20 px

    addObject("star.svg", x, y, size);
}

let stationState = {
    x: 200,
    y: 150,
    shields: "off",
    power: 100,
    element: null
};

stationState.element = addObject("space-station.svg", stationState.x, stationState.y, 300);

addObject("planet.svg", 700, 200, 180);
addObject("radio-waves-planet.svg", width - 400, height - 200, 150);
addObject("pulsar.svg", 1100, 300, 200);
addObject("pulsing-star.svg", 500, 300, 120);
// addObject("nebula.svg", 400, 400, 350);

log("Objects loaded");

cmdInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const val = this.value.trim();
        if (val) {
            log(val);
            processCommand(val);
        }
        this.value = "";
    }
});

function processCommand(cmdStr) {
    const parts = cmdStr.split(" ").filter(Boolean);
    const cmd = parts[0].toLowerCase();
    
    switch(cmd) {
        case "help":
            log("Příkazy: help, status, shields [on/off], move [x] [y]");
            break;
        case "status":
            log(`Stanice: Štíty ${stationState.shields}, Energie ${stationState.power}%, Poz. [${stationState.x}, ${stationState.y}]`);
            break;
        case "shields":
            if (parts[1] === "on") {
                stationState.shields = "on";
                stationState.element.style.filter = "drop-shadow(0 0 20px #0ff)";
                log("Štíty aktivovány.");
            } else if (parts[1] === "off") {
                stationState.shields = "off";
                stationState.element.style.filter = "none";
                log("Štíty deaktivovány.");
            } else {
                log("Použití: shields on | shields off");
            }
            break;
        case "move":
            const newX = parseInt(parts[1]);
            const newY = parseInt(parts[2]);
            if (!isNaN(newX) && !isNaN(newY)) {
                stationState.x = newX;
                stationState.y = newY;
                stationState.element.style.left = newX + "px";
                stationState.element.style.top = newY + "px";
                log(`Stanice přesunuta na [${newX}, ${newY}].`);
            } else {
                log("Použití: move [x] [y]");
            }
            break;
        default:
            log(`Neznámý příkaz. Napište 'help'.`);
    }
}
