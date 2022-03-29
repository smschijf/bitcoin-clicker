/* 
TODO:
    - save en load functie moet meerdere dagen werken
    - alle upgrades moeten werken
*/

// --- alle variabelen
let bitcoincount = 0;
let autoClick = 0;
let cpus = 0;
let multiplier = 1;
let resetButton = document.getElementById("reset-button");
if(resetButton) {
  resetButton.addEventListener("mouseover", changebg);
  resetButton.addEventListener("mouseout", changebgout);
}

// --- alle functies
function changebg() {
  resetButton.style.backgroundColor = "#F1C40E";
}

function changebgout() {
  resetButton.style.backgroundColor = "#E5E5E5";
}

function add() {
  bitcoincount += 1;
  update();
}

document.getElementById("bitcoin-img-container").addEventListener("wheel", add);
// je kan ook bitcoins verzamelen door je scroll wheel van je muis te gebruiken

document.addEventListener("keypress", add);
// je kan ook bitcoins verzamelen door een willekeurige toets te gebruiken op je toetsenbord

function save() {
  localStorage.setItem("bitcoincount", bitcoincount);
  localStorage.setItem("autoClick", autoClick);
  localStorage.setItem("cpus", cpus);
  //alle belangrijke waardes worden opgeslagen als cookie
}

function load() {
  bitcoincount = localStorage.getItem("bitcoincount");
  bitcoincount = parseInt(bitcoincount);
  autoClick = localStorage.getItem("autoClick");
  autoClick = parseInt(autoClick);
  cpus = localStorage.getItem("cpus");
  cpus = parseInt(cpus);
  update();
  // alle waardes worden opgehaald uit de cookies en omgezet in integers, zodat
  // ze kunnen worden gebruikt door javascript
}

function reset() {
  bitcoincount = 0;
  autoClick = 0;
  cpus = 0;
  multiplier = 0;
  update();
}

function update() {
  bitcoincount = roundUp(bitcoincount, 6);
  document.getElementById("text").value = bitcoincount;
  document.getElementById("upgradeCount").innerHTML = autoClick;
  document.getElementById("upgradeCost").innerHTML = (autoClick + 1) * 10;
  document.getElementById("perSecond").innerHTML = (((autoClick)+(cpus*2)) * multiplier);
  document.getElementById("cpuCount").innerHTML = cpus;
  document.getElementById("cpuCost").innerHTML = ((cpus + 1) * 25);
  // update alle waardes op de pagina zelf door innerHTML
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

function timer() {
  bitcoincount = bitcoincount + autoClick;
  bitcoincount = bitcoincount + cpus * 2;
  update();
}
setInterval(timer, 1000);

function buyOldCalculator() {
  if (bitcoincount >= (autoClick + 1) * 10) {
    bitcoincount = bitcoincount - (autoClick + 1) * 10;
    autoClick++;
    update();
    // je kan pas de calculator kopen als je bitcoincount gelijk of groter is dan
    // de waarde van de calculator
  }
}

function buyOldCpu() {
  if (bitcoincount >= (cpus + 1) * 25) {
    bitcoincount = bitcoincount - (cpus + 1) * 25;
    cpus++;
    update();
    // zelfde principe als de calculator
  }
}