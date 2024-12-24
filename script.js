document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.title');
    const subTitle = document.querySelector('.sub-title');
    const main = document.querySelector('.main');
    const words = ["Hi, It's Lurantys.", "Hi, It's Rum.", "Hi, It's Qince.", "Hi, It's Aymen."];

    function typeEffect(element, text, speed) {
        return new Promise((resolve) => {
            element.textContent = '';
            element.style.opacity = 1;
            element.classList.add('typing-cursor'); // Add cursor effect
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    element.classList.remove('typing-cursor'); // Remove cursor effect after typing
                    resolve();
                }
            }, speed);
        });
    }

    function deleteEffect(element, speed) {
        return new Promise((resolve) => {
            const text = element.textContent;
            let i = text.length;
            const timer = setInterval(() => {
                if (i > 0) {
                    element.textContent = text.substring(0, i - 1);
                    i--;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }

    async function animate() {
        for (let i = 0; i < words.length; i++) {
            await typeEffect(title, words[i], 80);
            if (i < words.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Delay before deleting
                await deleteEffect(title, 50);
            }
        }
        // Start other animations after the last word is typed
        await typeEffect(subTitle, "I use computers, as guinea pigs.", 80);
        main.style.animation = 'dropFade 1s forwards 1s';
    }

    animate();
});