const widgetContainer = document.getElementById("widget-container");

var x = 0
function buy(store) {
    let score = document.getElementById('score')
    let bank = parseInt(score.innerHTML);
    let cost = store.getAttribute("cost");

    console.log(`bank:[${bank}] cost: [${cost}]`);

    // Exit early if store is too expensive
    if(bank < cost) return;

    changeScore(-1 * cost);
    x += 10;
    
    var widget = document.createElement("div");
    widget.classList.add("widget");
    fillWidget(store, widget);
    
    widget.onclick = () => {
        harvest(widget);
        let chips = document.getElementById("chips");
        
    }

    widgetContainer.appendChild(widget);
    if (widget.getAttribute("auto") == 'true') harvest(widget);
}
let bank
function harvest(widget) {
    
    chips.play();
    
    widget.getAttribute('name')
    if (widget.getAttribute('name') == 'Potato Chips')
    {
        let potatoMP3 = document.getElementById("potatochipMP3")
        potatoMP3.play()
    }
    
    // Only run if currently not harvesting
    if (widget.hasAttribute("harvesting")) return;
    
    // Set harvesting flag
    widget.setAttribute("harvesting", "");
    
    // If manual, collect points now
    if (widget.getAttribute("auto") != 'true') {
        changeScore(widget.getAttribute("reap"))
        showPoint(widget)
    }

    setTimeout(() => {
        // Remove the harvesting flag
        widget.removeAttribute("harvesting")
        // If automatic, collect points
        if (widget.getAttribute("auto") == 'true') {
            changeScore(widget.getAttribute("reap"))
            showPoint(widget)
            harvest(widget)
        }
    }, parseFloat(widget.getAttribute("cooldown")) * 1000);
}

function changeScore(amount) {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(amount);

    bank = parseInt(score.innerHTML);
    // Update the stores to block buying expensive boxes
    for (let store of stores) {
        console.log(store);
        let cost = parseInt(store.getAttribute("cost"));
        if (bank < cost) {
            store.setAttribute("broke", "");
        } else {
            store.removeAttribute("broke");
        }
    }
    goal()
}

function showPoint(widget) {
    let number = document.createElement("span");
    number.className = "point";
    number.innerHTML = "+" + widget.getAttribute("reap");
    number.style.left = "50%";
    number.style.top = "50%";
    number.onanimationend = () => {
        widget.removeChild(number);
    }
    widget.appendChild(number);
}

function goal() {
    var goal = document.getElementById("Goal")
    const goalButton = document.getElementById("goal-button")
    if (parseInt(bank) >= 1500)
    {
        goal.innerHTML = "Goal Reached"
        goalButton.style.display = 'block'
    }
    else if (parseInt(bank) < 1500) goal.innerHTML = ""
}