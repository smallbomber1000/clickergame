// UI elements
const creditCountElement = document.getElementById('credit-count');
const clickButtonElement = document.getElementById('click-button');
const buyAutoMinerButton = document.getElementById('buy-auto-miner');
const buyDoubleClickButton = document.getElementById('buy-double-click');
const autoMinerCostElement = document.getElementById('auto-miner-cost');
const doubleClickCostElement = document.getElementById('double-click-cost');
const autoMinerUpgradeElement = document.getElementById('auto-miner-upgrade');
const buyAutoMinerValueButton = document.getElementById('buy-auto-miner-value');
const autoMinerValueCostElement = document.getElementById('auto-miner-value-cost');

// Initial game variables
let credits = 0;
let clickValue = 1;
let autoMinerCost = 10;
let autoMinerActive = false;
let doubleClickCost = 20;
let autoMinerIncome = 0;
let autoMinerValue = 1;
let autoMinerValueCost = 20;

// Function to update credits display
function updateCredits() {
    creditCountElement.innerText = credits;
    updateUpgradeButtonStyles(); // Update button styles whenever credits change
}

// Function to update upgrade button styles based on credits
function updateUpgradeButtonStyles() {
    // Check Auto-Miner button
    if (credits >= autoMinerCost && !autoMinerActive) {
        buyAutoMinerButton.classList.add('button-affordable'); // Enough credits
    } else {
        buyAutoMinerButton.classList.remove('button-affordable'); // Default color
    }

    // Check Double Click button
    if (credits >= doubleClickCost) {
        buyDoubleClickButton.classList.add('button-affordable'); // Enough credits
    } else {
        buyDoubleClickButton.classList.remove('button-affordable'); // Default color
    }

    // Check Auto-Miner Value button
    if (credits >= autoMinerValueCost) {
        buyAutoMinerValueButton.classList.add('button-affordable'); // Enough credits
    } else {
        buyAutoMinerValueButton.classList.remove('button-affordable'); // Default color
    }
}

// Click button event to mine asteroid and add credits
clickButtonElement.addEventListener('click', () => {
    credits += clickValue;
    updateCredits();
    triggerMiningAnimation(); // Trigger the mining animation
});

// Function to trigger mining animation
function triggerMiningAnimation() {
    clickButtonElement.classList.add('mining');

    // Remove the animation class after it finishes to allow re-triggering
    setTimeout(() => {
        clickButtonElement.classList.remove('mining');
    }, 500); // Match the duration of the animation
}

// Buy Auto-Miner Upgrade
buyAutoMinerButton.addEventListener('click', () => {
    if (credits >= autoMinerCost && !autoMinerActive) {
        credits -= autoMinerCost;
        autoMinerIncome = 1; // Generates 1 credit per second
        autoMinerActive = true;
        updateCredits();
        startAutoMiner();
        autoMinerUpgradeElement.remove(); // Disable purchase button after buying
    }
});

// Auto-Miner function to generate credits over time
function startAutoMiner() {
    setInterval(() => {
        credits += autoMinerIncome * autoMinerValue;
        updateCredits();
    }, 1000); // Generate credits every second
}

// Buy Double Click Power Upgrade
buyDoubleClickButton.addEventListener('click', () => {
    if (credits >= doubleClickCost) {
        credits -= doubleClickCost;
        clickValue = 2; // Double the click value
        updateCredits();
        doubleClickCostElement.innerText = doubleClickCost * 2;
    }
});

// Buy Auto-Miner Value Upgrade
buyAutoMinerValueButton.addEventListener('click', () => {
    if (credits >= autoMinerValueCost) {
        credits -= autoMinerValueCost;
        autoMinerValue *= 2;
        autoMinerValueCost *= 2;
        updateCredits();
        autoMinerValueCostElement.innerText = autoMinerValueCost;
    }
});