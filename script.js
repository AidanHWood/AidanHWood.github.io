const terminal = document.getElementById('terminal');

const part1 = "(root㉿MSI)-[/home/aidan/portfolio]"
const part2 = " cd /Portfolio";
let i = 0;
let j = 0;

function typePart1() {
    if (i < part1.length) {
        terminal.textContent += part1.charAt(i);
        i++;
        setTimeout(typePart1, 50);
    } else {
        flashHash();
    }
}

function flashHash(times = 10000000) {
    let visible = true;
    let count = 0;

    const interval = setInterval(() => {
        terminal.textContent = terminal.textContent.slice(0, part1.length) + (visible ? '#' : ' ');
        visible = !visible;
        count++;
        if (count >= times) {
            clearInterval(interval);
            terminal.textContent = part1 + ""
            typePart2();
        }
    }, 300);
}

// Start typing
typePart1();
