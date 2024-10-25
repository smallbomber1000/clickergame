// UI Elements
// DOM Elements
const creditCountElement = document.getElementById('credit-count');
const clickButtonElement = document.getElementById('click-button');

// Upgrade Buttons
const buyAutoMinerButton = document.getElementById('buy-auto-miner');
const buyDoubleClickButton = document.getElementById('buy-double-click');
const buyAutoMinerValueButton = document.getElementById('buy-auto-miner-value');
const buyAutoMinerTimeButton = document.getElementById('buy-auto-miner-time');

// Cost Display Elements
const autoMinerCostElement = document.getElementById('auto-miner-cost');
const doubleClickCostElement = document.getElementById('double-click-cost');
const autoMinerValueCostElement = document.getElementById('auto-miner-value-cost');
const autoMinerTimeCostElement = document.getElementById('auto-miner-time-cost');

// Upgrade Display Elements
const autoMinerUpgradeElement = document.getElementById('auto-miner-upgrade');
const cpsElement = document.getElementById('credits/s');

// Auto Miner Upgrades
const autoUpgrades = document.querySelectorAll('.locked');

// Level Elements
const doubleClickLevelElement = document.getElementById('double-click-level');
const doubleAutoValueElement = document.getElementById('auto-miner-value-level');
const halfAutoTimeElement = document.getElementById('auto-miner-time-level');

// Initial Game State
let credits = 0;
let click_level = 1; // Initial value per click
let auto_miner_value_level = 0; // Initial auto miner value level
let auto_miner_time_level = 1; // Initial auto miner time level
let cps = 0; // Start with 0 credits per second
let auto_miner_active = false;

// Upgrade Costs
let auto_miner_cost = 10;
let double_click_cost = 20;
let auto_miner_value_cost = 20; // Initial cost for auto-miner value upgrade
let auto_miner_time_cost = 40; // Initial cost for auto-miner time upgrade

// Set initial inner texts based on initial variable values
creditCountElement.innerText = credits;
autoMinerCostElement.innerText = auto_miner_cost;
doubleClickCostElement.innerText = double_click_cost;
autoMinerValueCostElement.innerText = auto_miner_value_cost;
autoMinerTimeCostElement.innerText = auto_miner_time_cost;
cpsElement.innerText = cps;
doubleClickLevelElement.innerText = click_level;
doubleAutoValueElement.innerText = auto_miner_value_level;
halfAutoTimeElement.innerText = auto_miner_time_level;

// Function to update credits display
function update_credits() {
    creditCountElement.innerText = credits;
    cps = auto_miner_value_level * auto_miner_time_level; // Calculate credits per second
    cpsElement.innerText = cps;
    update_upgrade_button_styles(); // Update button styles whenever credits change
}

// Function to update upgrade button styles based on credits
function update_upgrade_button_styles() {
    buyAutoMinerButton.classList.toggle('button-affordable', credits >= auto_miner_cost && !auto_miner_active);
    buyDoubleClickButton.classList.toggle('button-affordable', credits >= double_click_cost);
    buyAutoMinerValueButton.classList.toggle('button-affordable', credits >= auto_miner_value_cost);
    buyAutoMinerTimeButton.classList.toggle('button-affordable', credits >= auto_miner_time_cost);
}

// Click button event to mine asteroid and add credits
clickButtonElement.addEventListener('click', () => {
    credits += 2 ** (click_level - 1); // Add credits based on click value
    update_credits();
    trigger_mining_animation(); // Trigger the mining animation
});

// Function to trigger mining animation
function trigger_mining_animation() {
    clickButtonElement.classList.add('mining');
    setTimeout(() => {
        clickButtonElement.classList.remove('mining');
    }, 500); // Match the duration of the animation
}

// Buy Auto-Miner Upgrade
buyAutoMinerButton.addEventListener('click', () => {
    if (credits >= auto_miner_cost && !auto_miner_active) {
        credits -= auto_miner_cost; // Deduct the cost
        auto_miner_active = true; // Activate auto miner
        auto_miner_value_level = 1;
        doubleAutoValueElement.innerText = auto_miner_value_level;
        start_auto_miner(); // Start the auto miner

        // Unlock auto upgrades after buying auto-miner
        autoUpgrades.forEach(i => i.classList.remove('locked'));
        autoMinerUpgradeElement.remove(); // Disable purchase button after buying
        update_credits();
    }
});

// Auto-Miner function to generate credits over time
function start_auto_miner() {
    generate_credits(); // Start the first credit generation
}

// Function to generate credits using setTimeout
function generate_credits() {
    if (auto_miner_active) {
        credits += cps; // Generate credits based on cps
        update_credits();
        setTimeout(generate_credits, 1000); // Generate every second based on CPS
    }
}

// Buy Double Click Power Upgrade
buyDoubleClickButton.addEventListener('click', () => {
    if (credits >= double_click_cost) {
        credits -= double_click_cost; // Deduct the cost
        click_level += 1; // Increase click value
        double_click_cost *= 2; // Double the cost for the next upgrade
        doubleClickCostElement.innerText = double_click_cost; // Update displayed cost
        doubleClickLevelElement.innerText = click_level;
        update_credits();
    }
});

// Buy Auto-Miner Value Upgrade
buyAutoMinerValueButton.addEventListener('click', () => {
    if (credits >= auto_miner_value_cost) {
        credits -= auto_miner_value_cost; // Deduct the cost
        auto_miner_value_level += 1; // Increase value level
        auto_miner_value_cost *= 2; // Double the cost for the next upgrade
        autoMinerValueCostElement.innerText = auto_miner_value_cost; // Update displayed cost
        doubleAutoValueElement.innerText = auto_miner_value_level;
        update_credits();
    }
});

// Buy Auto-Miner Time Upgrade
buyAutoMinerTimeButton.addEventListener('click', () => {
    if (credits >= auto_miner_time_cost) {
        credits -= auto_miner_time_cost; // Deduct the cost
        auto_miner_time_level += 1; // Increase time level
        auto_miner_time_cost *= 4; // Update cost for the next purchase
        autoMinerTimeCostElement.innerText = auto_miner_time_cost; // Update displayed cost
        halfAutoTimeElement.innerText = auto_miner_time_level;
        update_credits();
    }
});