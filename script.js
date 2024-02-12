gsap.registerPlugin(ScrollTrigger);

$(document).ready(function() {
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "thumbs",
            "zoom",
            "fullScreen",
            "share",
            "close"
        ],
        loop: false,
        protect: true
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Special heart container animation for a dynamic entrance
    gsap.from(".heart-container", {
        duration: 2,
        scale: 0.5,
        autoAlpha: 0,
        ease: "elastic.out(1, 0.3)",
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1 // Adjust if needed to trigger the animation sooner or later
    });

    // Observe each section
    document.querySelectorAll('.story-section').forEach(section => {
        observer.observe(section);
    });

    // Observe each image within the gallery
    document.querySelectorAll('#imageGallery .card-image img').forEach(image => {
        observer.observe(image);
    });

});

function updateCounter() {
    const counterElement = document.querySelector('.counter');
    console.log(counterElement); // Verificar se o elemento .counter foi encontrado

    const now = new Date();
    const startDate = new Date(2023, 2, 5); // March 5, 2023
    const difference = now - startDate;

    let years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    let months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44)); // Média de dias por mês
    let days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    // Ajuste para os meses
    if (months >= 12) {
        years++;
        months -= 12;
    }

    // Ajuste para os dias
    if (days >= 24) {
        months++;
        days -= 24;
    }

    if (counterElement) {
        counterElement.innerHTML = years + " Anos " + months + " Meses " + days + " Dias ";
    } else {
        console.log("Elemento .counter não encontrado!"); // Adiciona mensagem de erro ao console
    }

    setTimeout(updateCounter, 1000); // Update counter every second
}

// Move a chamada da função updateCounter() para o final do arquivo

updateCounter(); // Chama a função updateCounter() para iniciar o contador

const songs = [
    { url: '/music/apocalypse.mp3', title: 'Apocalypse' },
    { url: '/music/lifetime.mp3', title: 'Lifetime' },
    { url: '/music/handsDown.mp3', title: 'Hands Down' },
    { url: '/music/takeMyName.mp3', title: 'Take My Name' },
    { url: '/music/souljaBoy.mp3', title: 'YOUUUUUUUU' }
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].url); // Start with the first song
const songTitleElement = document.getElementById('songTitle');

// Set the initial song title
songTitleElement.textContent = songs[currentSongIndex].title;

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        updatePlayPauseButton(true);
    } else {
        audio.pause();
        updatePlayPauseButton(false);
    }
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    changeSong();
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    changeSong();
}

function changeSong() {
    audio.src = songs[currentSongIndex].url;
    songTitleElement.textContent = songs[currentSongIndex].title;
    audio.play();
    updatePlayPauseButton(true);
}

function updatePlayPauseButton(isPlaying) {
    document.getElementById('playPause').textContent = isPlaying ? '⏸' : '▶️';
}

document.getElementById('playPause').addEventListener('click', togglePlayPause);
document.getElementById('nextSong').addEventListener('click', playNextSong);
document.getElementById('prevSong').addEventListener('click', playPrevSong);

document.getElementById('yesButton').addEventListener('click', function() {
    document.querySelector('#final-question h2').textContent = "YAYAYAYAYAY - My Forever Valentine 🫶";
    // Directly use confetti from the library
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

let noClickCount = 0; // To track the number of times the "No" button has been clicked

document.getElementById('noButton').addEventListener('click', function() {
    noClickCount++;
    if (noClickCount <= 10) {
        // Make the "No" button smaller
        this.style.transform = `scale(${1 - noClickCount * 0.1})`;

        // Make the "Yes" button larger
        document.getElementById('yesButton').style.transform = `scale(${1 + noClickCount * 0.05})`;

        // Change the text to something funny
        const funnyTexts = [
            "Sério? Tente novamente...",
            "Tem certeza?",
            "Você está brincando?",
            "Errado!",
            "Não, essa não é a resposta certa.",
            "Eu NÃO aceitarei um não como resposta!",
            "Isso está ficando um pouco ridículo...",
            "Dê mais uma chance!",
            "Sério?",
            "Última chance... Sim?"
        ];
        
        
        document.querySelector('#final-question h2').textContent = funnyTexts[noClickCount - 1] || "YAYAYAYAYAY - My Forever Valentine";
    } else {
        // If clicked more than 10 times, hide the "No" button
        this.style.display = 'none';
    }
});

// Update the countdown every second
setInterval(updateCounter, 1000);
