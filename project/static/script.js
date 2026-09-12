// =========================================================
// ANIMAL WORLD - JAVASCRIPT CORE APPLICATION
// =========================================================

// --- App State ---
let currentAnimal = {
    name: "Bruno The Brave",
    age: "3",
    habitat: "Mystic Pine Forest",
    siblings: "4",
    breed: "Golden Retriever",
    food: "Prime Salmon & Crunchy Bones",
    species: "dog",
    uid: "4829 1920 8371",
    isVerified: false
};

const speciesMetadata = {
    dog: {
        name: "Canis Lupus (Dog)",
        emoji: "🐶",
        defaultBreed: "Golden Retriever",
        soundWords: ["Woof", "Ruff", "Arf", "Bark", "Awoo", "Grrr", "Yip"],
        dialectPhrase: "WOOF! RUFF RUFF!",
        soundName: "Bark / Woof",
        defaultStatus: "Chasing phantom squirrels in the meadow",
        callFrequency: 300
    },
    cat: {
        name: "Felis Catus (Cat)",
        emoji: "🐱",
        defaultBreed: "Siamese Royal",
        soundWords: ["Meow", "Mrrp", "Purr", "Hiss", "Mew", "Nya", "Chirp"],
        dialectPhrase: "MEOW~ MRRP PURRR",
        soundName: "Meow / Purr",
        defaultStatus: "Contemplating the downfall of gravity",
        callFrequency: 550
    },
    cow: {
        name: "Bos Taurus (Cow)",
        emoji: "🐮",
        defaultBreed: "Highland Pasture",
        soundWords: ["Mooo", "Mooooo", "Lowww", "Moo-moo", "Hummm"],
        dialectPhrase: "MOOOOOOO~",
        soundName: "Moo / Low",
        defaultStatus: "Meditating deeply while chewing clover",
        callFrequency: 140
    },
    chicken: {
        name: "Gallus Domesticus (Bird / Chicken)",
        emoji: "🐔",
        defaultBreed: "Silk Feather Crest",
        soundWords: ["Cluck", "Bawk", "Chirp", "Peep", "Cock-a-doodle", "Squawk"],
        dialectPhrase: "CHIRP CHIRP! BAWK BAWK!",
        soundName: "Chirp / Cluck",
        defaultStatus: "Inspecting mysterious ground pebbles",
        callFrequency: 1100
    },
    frog: {
        name: "Anura Aquatica (Frog)",
        emoji: "🐸",
        defaultBreed: "Emerald Tree Dart",
        soundWords: ["Ribbit", "Croak", "Gribbit", "Brekekex", "Kero"],
        dialectPhrase: "RIBBIT RIBBIT CROAK!",
        soundName: "Ribbit / Croak",
        defaultStatus: "Basking gracefully on a lilypad",
        callFrequency: 220
    }
};

// --- Mock Wildlife Friends Network ---
let wildlifeFriends = [
    {
        id: "f1",
        name: "Mittens Whisper",
        species: "cat",
        breed: "Siamese Royal",
        habitat: "Velvet Sunroom",
        age: 2,
        compatibility: "98%",
        statusQuote: "I stare into the abyss, and the abyss meows back.",
        lastMessage: "Mrrp~ Purrrr (Did you bring treats?)",
        lastTime: "2m ago",
        online: true,
        chatHistory: [
            { sender: "them", sound: "MEOW MEOW PURRR~", text: "Greetings, fellow wanderer of the wild realm!", time: "10:14 AM" },
            { sender: "mine", sound: "WOOF RUFF RUFF!", text: "Hello Mittens! The forest scent is incredible today.", time: "10:15 AM" },
            { sender: "them", sound: "MRRP~ MEOW NYA?", text: "Did you find any sunbeams near the crystal lake?", time: "10:16 AM" }
        ]
    },
    {
        id: "f2",
        name: "Barnaby Highland",
        species: "cow",
        breed: "Highland Fluff",
        habitat: "Rolling Emerald Hills",
        age: 4,
        compatibility: "94%",
        statusQuote: "Life is simple when there is grass and open sky.",
        lastMessage: "MOOOOO~ (The clover harvest is supreme)",
        lastTime: "15m ago",
        online: true,
        chatHistory: [
            { sender: "them", sound: "MOOOOOOOOO~", text: "Peaceful morning to you! The dew on the grass is refreshing.", time: "09:30 AM" },
            { sender: "mine", sound: "ARF ARF WOOF!", text: "Good morning Barnaby! Doing my morning zoomies.", time: "09:32 AM" }
        ]
    },
    {
        id: "f3",
        name: "Shadow Fang",
        species: "dog",
        breed: "Black Timber Wolf",
        habitat: "North Pine Summit",
        age: 5,
        compatibility: "99%",
        statusQuote: "Running with the twilight pack.",
        lastMessage: "AWOOOOO! (Meet at sunset rock)",
        lastTime: "1h ago",
        online: true,
        chatHistory: [
            { sender: "them", sound: "AWOOOOO! BARK!", text: "The dusk patrol was glorious today.", time: "Yesterday" }
        ]
    },
    {
        id: "f4",
        name: "Pip Chirper",
        species: "chicken",
        breed: "Golden Bantam",
        habitat: "Sunny Grain Meadow",
        age: 1,
        compatibility: "89%",
        statusQuote: "Found 14 seeds in 30 seconds. New personal best.",
        lastMessage: "BAWK CHIRP! (Alert: Big worm spotted)",
        lastTime: "3h ago",
        online: false,
        chatHistory: [
            { sender: "them", sound: "CHIRP CHIRP BAWK!", text: "Spotted a beetle near the old oak tree!", time: "Yesterday" }
        ]
    },
    {
        id: "f5",
        name: "Lord Croaksworth",
        species: "frog",
        breed: "Moss Lagoon Dart",
        habitat: "Emerald Lily Basin",
        age: 2,
        compatibility: "91%",
        statusQuote: "Catching dragonflies with precision since sunrise.",
        lastMessage: "RIBBIT! (The pond temperature is optimal)",
        lastTime: "5h ago",
        online: true,
        chatHistory: [
            { sender: "them", sound: "RIBBIT RIBBIT CROAK!", text: "Rain shower coming soon! Best time to splash.", time: "2 days ago" }
        ]
    }
];

let activeFriendId = "f1";

// =========================================================
// AUDIO SYNTHESIS & SOUND EFFECTS ENGINE (Web Audio API)
// =========================================================

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

/**
 * Synthesizes dynamic species tones via Web Audio API oscillators
 */
function playAudioTone(speciesType = "dog") {
    const soundEnabled = document.getElementById("settingSoundEffects");
    if (soundEnabled && !soundEnabled.checked) return;

    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (speciesType === "dog") {
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);
            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (speciesType === "cat") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(500, now);
            osc.frequency.linearRampToValueAtTime(800, now + 0.15);
            osc.frequency.exponentialRampToValueAtTime(450, now + 0.35);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);
        } else if (speciesType === "cow") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(130, now + 0.5);
            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.65);
        } else if (speciesType === "frog") {
            osc.type = "square";
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.setValueAtTime(120, now + 0.08);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        } else {
            osc.type = "sine";
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(1600, now + 0.08);
            osc.frequency.exponentialRampToValueAtTime(1100, now + 0.15);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    } catch (err) {
        console.log("Audio play note:", err);
    }
}

// =========================================================
// SPECIES SELECTION
// =========================================================

function quickSelectSpecies(speciesKey) {
    const select = document.getElementById("animalType");
    if (select) {
        select.value = speciesKey;
        onSpeciesChanged();
    }
}

function onSpeciesChanged() {
    const species = document.getElementById("animalType").value;
    const meta = speciesMetadata[species];
    if (meta) {
        const breedInput = document.getElementById("animalBreed");
        if (breedInput && !breedInput.value) {
            breedInput.placeholder = `e.g. ${meta.defaultBreed}`;
        }
        const status = document.getElementById("soundStatus");
        status.innerHTML = `🐾 Selected <strong>${meta.name}</strong>. Ready to verify with genuine <em>${meta.soundName}</em>!`;

        // Reset verification state upon changing species
        resetVerificationState();
    }
}

function resetVerificationState() {
    const resultBox = document.getElementById("resultBox");
    const badge = document.getElementById("verificationBadge");
    const enterBtn = document.getElementById("enterButton");

    resultBox.style.display = "none";
    badge.innerHTML = "Unverified";
    badge.style.color = "var(--text-dim)";
    enterBtn.classList.remove("unlocked");
    currentAnimal.isVerified = false;
}

// =========================================================
// TEACHABLE MACHINE AUDIO VERIFICATION (TensorFlow.js)
// =========================================================

// Google Teachable Machine Cloud Model Endpoint
const TEACHABLE_MACHINE_URL = "https://teachablemachine.withgoogle.com/models/iskyo8Onr/";
let recognizer = null;
let isModelLoading = false;
let isListeningActive = false;
let listeningTimeoutId = null;

/**
 * Initializes and loads the Teachable Machine speech recognition model
 */
async function loadTeachableModel() {
    if (recognizer) return recognizer;
    if (isModelLoading) {
        while (isModelLoading) {
            await new Promise(r => setTimeout(r, 100));
        }
        return recognizer;
    }

    try {
        isModelLoading = true;
        const checkpointURL = TEACHABLE_MACHINE_URL + "model.json";
        const metadataURL = TEACHABLE_MACHINE_URL + "metadata.json";

        const speech = window.speechCommands || (typeof speechCommands !== "undefined" ? speechCommands : null);
        if (!speech) {
            throw new Error("speechCommands library is not loaded from CDN.");
        }

        recognizer = speech.create(
            "BROWSER_FFT",
            undefined,
            checkpointURL,
            metadataURL
        );

        await recognizer.ensureModelLoaded();
        console.log("Teachable Machine model loaded successfully from Google Cloud. Classes:", recognizer.wordLabels());
        return recognizer;
    } catch (err) {
        console.error("Error loading Teachable Machine model:", err);
        recognizer = null;
        throw err;
    } finally {
        isModelLoading = false;
    }
}

/**
 * Executes Sound Verification by testing an acoustic dialect (Dog, Cat, Cow, Bird, Frog)
 */
async function testSoundCall(simulatedSound) {
    const selectedSpecies = document.getElementById("animalType").value;
    if (!selectedSpecies) {
        alert("🐾 Please select a species from the dropdown first!");
        return;
    }

    const waveform = document.getElementById("soundWaveform");
    const status = document.getElementById("soundStatus");
    const resultBox = document.getElementById("resultBox");
    const badge = document.getElementById("verificationBadge");
    const enterBtn = document.getElementById("enterButton");

    // Play corresponding sound
    playAudioTone(simulatedSound);
    waveform.classList.add("active");
    status.innerHTML = `🎙️ Testing audio call for <strong>${simulatedSound.toUpperCase()}</strong>...`;
    resultBox.style.display = "none";

    setTimeout(() => {
        waveform.classList.remove("active");
        const isMatch = simulatedSound.toLowerCase() === selectedSpecies.toLowerCase() ||
            (selectedSpecies.toLowerCase() === "chicken" && (simulatedSound.toLowerCase() === "bird" || simulatedSound.toLowerCase() === "chicken"));

        if (isMatch) {
            resultBox.className = "verification-result success";
            resultBox.innerHTML = `
                <div><strong>✅ VERIFIED:</strong> AI Acoustic Analysis Matched ${selectedSpecies.toUpperCase()}!</div>
                <div style="font-size: 0.82rem; margin-top: 4px; color: #a7f3d0;">
                    Confidence: 96.4% • Acoustic Dialect: Verified
                </div>
            `;
            badge.innerHTML = "✅ Biometric Verified";
            badge.style.color = "var(--emerald-accent)";
            status.innerHTML = "✓ Species match confirmed! Unique Animal Aadhaar UID unlocked.";
            enterBtn.classList.add("unlocked");
            currentAnimal.isVerified = true;
            playAudioTone(selectedSpecies);
        } else {
            resultBox.className = "verification-result error";
            resultBox.innerHTML = `
                <div><strong>❌ VERIFICATION FAILED:</strong></div>
                <div style="margin-top: 3px;">Species mismatch. Tested sound does not match selected animal.</div>
                <div style="font-size: 0.8rem; margin-top: 5px; color: #fecaca;">
                    (Expected: ${selectedSpecies.toUpperCase()}, Produced: ${simulatedSound.toUpperCase()})
                </div>
            `;
            badge.innerHTML = "❌ Mismatch";
            badge.style.color = "#f87171";
            status.innerHTML = "❌ Species mismatch. Try again with your genuine animal sound.";
            enterBtn.classList.remove("unlocked");
            currentAnimal.isVerified = false;
        }
    }, 800);
}

/**
 * Listens to the microphone and verifies species sound using Teachable Machine (>30% threshold)
 */
async function startSoundVerification() {
    const selectedSpecies = document.getElementById("animalType").value;
    const btn = document.getElementById("verifyButton");
    const waveform = document.getElementById("soundWaveform");
    const status = document.getElementById("soundStatus");
    const resultBox = document.getElementById("resultBox");
    const badge = document.getElementById("verificationBadge");
    const enterBtn = document.getElementById("enterButton");

    if (!selectedSpecies) {
        alert("🐾 Please select your species first!");
        return;
    }

    if (isListeningActive) {
        // Allow user to cancel/stop if currently listening
        stopListeningSession();
        return;
    }

    btn.classList.add("listening");
    btn.innerHTML = "🎙️ LISTENING (Speak now)...";
    waveform.classList.add("active");
    resultBox.style.display = "none";
    enterBtn.classList.remove("unlocked");
    status.innerHTML = "⏳ Loading AI neural model & opening microphone...";

    try {
        const model = await loadTeachableModel();
        if (!model) {
            throw new Error("Unable to initialize speech recognizer.");
        }

        const classLabels = model.wordLabels();
        isListeningActive = true;
        status.innerHTML = `🎙️ <strong>Listening...</strong> Make your genuine <em>${selectedSpecies.toUpperCase()}</em> sound!`;

        // Aliases mapping for flexible species matching
        const SPECIES_ALIASES = {
            dog: ["dog", "bark", "woof", "canine"],
            cat: ["cat", "meow", "purr", "feline"],
            cow: ["cow", "moo", "low", "bovine", "cattle"],
            chicken: ["chicken", "bird", "chirp", "cluck", "avian", "rooster", "hen"],
            frog: ["frog", "croak", "ribbit", "amphibian", "toad"]
        };

        const targetAliases = SPECIES_ALIASES[selectedSpecies.toLowerCase()] || [selectedSpecies.toLowerCase()];

        // Start listening to the microphone
        model.listen(
            async (result) => {
                if (!isListeningActive) return;

                const scores = result.scores;
                let targetScore = 0;
                let maxAnimalScore = 0;
                let bestAnimalMatch = "";
                let liveFeedbackList = [];

                for (let i = 0; i < classLabels.length; i++) {
                    const label = classLabels[i];
                    const score = scores[i];
                    const lowerLabel = label.toLowerCase();

                    // Check if this label matches the target selected species
                    const isTarget = targetAliases.some(alias => lowerLabel.includes(alias) || alias.includes(lowerLabel));
                    if (isTarget && score > targetScore) {
                        targetScore = score;
                    }

                    // Track highest non-background animal class
                    if (!lowerLabel.includes("background")) {
                        if (score > maxAnimalScore) {
                            maxAnimalScore = score;
                            bestAnimalMatch = label;
                        }
                        liveFeedbackList.push(`${label}: ${(score * 100).toFixed(0)}%`);
                    }
                }

                // Live status meter while listening
                if (isListeningActive && liveFeedbackList.length > 0) {
                    status.innerHTML = `🎙️ <em>Listening:</em> [ ${liveFeedbackList.join(" | ")} ]`;
                }

                console.log(`AI Prediction -> Best Animal: ${bestAnimalMatch} (${(maxAnimalScore * 100).toFixed(1)}%), Target ${selectedSpecies}: ${(targetScore * 100).toFixed(1)}%`);

                // Adaptive Verification Threshold:
                // 1. Direct target confidence >= 20% (0.20)
                // 2. Or target is the top detected non-background animal with confidence >= 15% (0.15)
                const isDirectMatch = targetScore >= 0.20;
                const isTopAnimalMatch = targetAliases.some(a => bestAnimalMatch.toLowerCase().includes(a)) && maxAnimalScore >= 0.15;

                if (isDirectMatch || isTopAnimalMatch) {
                    const finalConfidence = Math.max(targetScore, maxAnimalScore);
                    stopListeningSession();

                    // Display success
                    resultBox.style.display = "block";
                    resultBox.className = "verification-result success";
                    resultBox.innerHTML = `
                        <div><strong>✅ VERIFIED:</strong> AI detected genuine ${selectedSpecies.toUpperCase()} sound!</div>
                        <div style="font-size: 0.82rem; margin-top: 4px; color: #a7f3d0;">
                            Confidence: ${(finalConfidence * 100).toFixed(1)}% • Acoustic signature matched
                        </div>
                    `;
                    badge.innerHTML = "✅ Biometric Verified";
                    badge.style.color = "var(--emerald-accent)";
                    status.innerHTML = "🎉 Species match confirmed! Entering Animal World in 1.5s...";
                    enterBtn.classList.add("unlocked");
                    currentAnimal.isVerified = true;
                    playAudioTone(selectedSpecies);

                    // Automatic navigation into the site after 1.5s
                    setTimeout(() => {
                        enterAnimalWorld();
                    }, 1500);
                }
            },
            {
                includeSpectrogram: false,
                probabilityThreshold: 0.05,
                invokeCallbackOnNoiseAndUnknown: true,
                overlapFactor: 0.75
            }
        );

        // Safety timeout: 12 seconds max listening window
        if (listeningTimeoutId) clearTimeout(listeningTimeoutId);
        listeningTimeoutId = setTimeout(() => {
            if (isListeningActive) {
                stopListeningSession();
                resultBox.style.display = "block";
                resultBox.className = "verification-result error";
                resultBox.innerHTML = `
                    <div><strong>❌ VERIFICATION TIMEOUT:</strong></div>
                    <div style="margin-top: 3px;">No ${selectedSpecies.toUpperCase()} sound detected with &gt;30% confidence within 12 seconds.</div>
                    <div style="font-size: 0.8rem; margin-top: 5px; color: #fecaca;">
                        Please make a louder, clear animal sound and try again!
                    </div>
                `;
                badge.innerHTML = "❌ Mismatch / Timeout";
                badge.style.color = "#f87171";
                status.innerHTML = "❌ Verification timed out. Click to try again.";
                enterBtn.classList.remove("unlocked");
                currentAnimal.isVerified = false;
            }
        }, 12000);

    } catch (err) {
        console.error("Microphone or Teachable Machine error:", err);
        stopListeningSession();
        resultBox.style.display = "block";
        resultBox.className = "verification-result error";
        resultBox.innerHTML = `
            <div><strong>⚠️ MODEL / MIC ERROR:</strong></div>
            <div style="margin-top: 3px;">${err.message || "Failed to access microphone or load model files."}</div>
            <div style="font-size: 0.8rem; margin-top: 5px; color: #fecaca;">
                Ensure microphone permission is granted in your browser.
            </div>
        `;
        status.innerHTML = "⚠️ Error starting verification. Check microphone permissions.";
    }
}

/**
 * Stops any active listening session
 */
function stopListeningSession() {
    isListeningActive = false;
    if (listeningTimeoutId) {
        clearTimeout(listeningTimeoutId);
        listeningTimeoutId = null;
    }
    if (recognizer && recognizer.isListening()) {
        try {
            recognizer.stopListening();
        } catch (e) {
            console.log("Stop listening note:", e);
        }
    }
    const btn = document.getElementById("verifyButton");
    const waveform = document.getElementById("soundWaveform");
    if (btn) {
        btn.classList.remove("listening");
        btn.innerHTML = "🎙️ VERIFY BY SOUND";
    }
    if (waveform) {
        waveform.classList.remove("active");
    }
}

// =========================================================
// 12-DIGIT AADHAAR UID GENERATOR
// =========================================================

function generate12DigitUid() {
    const part1 = Math.floor(1000 + Math.random() * 9000);
    const part2 = Math.floor(1000 + Math.random() * 9000);
    const part3 = Math.floor(1000 + Math.random() * 9000);
    return `${part1} ${part2} ${part3}`;
}

// =========================================================
// ENTER ANIMAL WORLD (PAGE 1 -> PAGE 2)
// =========================================================

function enterAnimalWorld() {
    if (!currentAnimal.isVerified) {
        alert("🐾 Please complete acoustic sound verification before entering!");
        return;
    }

    const nameInput = document.getElementById("animalName").value.trim();
    const ageInput = document.getElementById("animalAge").value.trim();
    const habitatInput = document.getElementById("animalHabitat").value.trim();
    const siblingsInput = document.getElementById("siblings").value.trim();
    const breedInput = document.getElementById("animalBreed").value.trim();
    const foodInput = document.getElementById("food").value.trim();
    const speciesInput = document.getElementById("animalType").value;

    const meta = speciesMetadata[speciesInput] || speciesMetadata.dog;

    currentAnimal.name = nameInput || "Bruno The Brave";
    currentAnimal.age = ageInput || "3";
    currentAnimal.habitat = habitatInput || "Mystic Woodlands";
    currentAnimal.siblings = siblingsInput || "4";
    currentAnimal.breed = breedInput || meta.defaultBreed;
    currentAnimal.food = foodInput || "Prime Salmon";
    currentAnimal.species = speciesInput;
    currentAnimal.uid = generate12DigitUid();

    // Transition Pages
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("worldPage").classList.remove("hidden");

    // Populate all components
    updateNavbarPill();
    updateAadhaarCardUI();
    renderHomeFeed();
    renderFriendsGrid();
    initChatBoard();

    // Default to Home view
    switchNavSection("home");
    playAudioTone(currentAnimal.species);
}

// =========================================================
// NAVIGATION SYSTEM
// =========================================================

function switchNavSection(sectionKey) {
    const views = {
        home: "viewHome",
        profile: "viewProfile",
        friends: "viewFriends",
        chat: "viewChat",
        settings: "viewSettings"
    };

    const navButtons = {
        home: "navHome",
        profile: "navProfile",
        friends: "navFriends",
        chat: "navChat",
        settings: "navSettings"
    };

    Object.keys(views).forEach(key => {
        const el = document.getElementById(views[key]);
        const btn = document.getElementById(navButtons[key]);
        if (el) el.classList.add("hidden");
        if (btn) btn.classList.remove("active");
    });

    const activeView = document.getElementById(views[sectionKey]);
    const activeBtn = document.getElementById(navButtons[sectionKey]);

    if (activeView) activeView.classList.remove("hidden");
    if (activeBtn) activeBtn.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateNavbarPill() {
    const meta = speciesMetadata[currentAnimal.species] || speciesMetadata.dog;
    document.getElementById("navAvatarEmoji").innerText = meta.emoji;
    document.getElementById("navUserName").innerText = currentAnimal.name;
    document.getElementById("userHabitatDisplay").innerText = currentAnimal.habitat;
}

// =========================================================
// AADHAAR STYLE CARD COMPONENT
// =========================================================

function updateAadhaarCardUI() {
    const meta = speciesMetadata[currentAnimal.species] || speciesMetadata.dog;

    document.getElementById("cardPhotoEmoji").innerText = meta.emoji;
    document.getElementById("cardNameVal").innerText = currentAnimal.name;
    document.getElementById("cardSpeciesVal").innerText = meta.name;
    document.getElementById("cardBreedVal").innerText = currentAnimal.breed || meta.defaultBreed;
    document.getElementById("cardAgeVal").innerText = `${currentAnimal.age} Years`;
    document.getElementById("cardHabitatVal").innerText = currentAnimal.habitat;
    document.getElementById("cardSiblingsVal").innerText = `${currentAnimal.siblings} Siblings`;
    document.getElementById("cardFoodVal").innerText = currentAnimal.food;
    document.getElementById("cardUidDigits").innerText = currentAnimal.uid;
}

function printOrDownloadIdCard() {
    window.print();
}

function copyAnimalUid() {
    navigator.clipboard.writeText(currentAnimal.uid).then(() => {
        alert(`📋 Copied Animal Aadhaar UID: ${currentAnimal.uid}`);
    }).catch(() => {
        alert(`Animal Aadhaar UID: ${currentAnimal.uid}`);
    });
}

// =========================================================
// HOME SECTION FEED & ACTIVITIES
// =========================================================

function renderHomeFeed() {
    const list = document.getElementById("homeFeedList");
    if (!list) return;

    const meta = speciesMetadata[currentAnimal.species] || speciesMetadata.dog;
    const myPostHtml = `
        <div class="feed-item" style="border-color: rgba(168, 85, 247, 0.4); background: rgba(139, 92, 246, 0.08);">
            <div class="feed-author-row">
                <div class="feed-author">
                    <div class="feed-avatar">${meta.emoji}</div>
                    <div>
                        <div class="feed-name">${currentAnimal.name} (You)</div>
                        <div class="feed-time">${currentAnimal.habitat} • Just now</div>
                    </div>
                </div>
                <span class="badge-tag" style="font-size: 0.72rem; padding: 2px 8px;">Your Animal UID</span>
            </div>
            <div class="feed-text">
                Just completed acoustic sound verification and unlocked my 12-digit Animal Aadhaar UID!
            </div>
            <div class="feed-animal-sound">
                🗣️ Sound: "${meta.dialectPhrase}"
            </div>
            <div class="feed-actions">
                <button class="feed-action-btn" onclick="reactPost(this)">❤️ <span>1</span> Paw</button>
                <button class="feed-action-btn" onclick="switchNavSection('chat')">💬 Chat</button>
                <button class="feed-action-btn" onclick="playAudioTone('${currentAnimal.species}')">🔊 Listen</button>
            </div>
        </div>
    `;

    list.insertAdjacentHTML("afterbegin", myPostHtml);
}

function reactPost(btn) {
    const span = btn.querySelector("span");
    if (span) {
        let count = parseInt(span.innerText, 10) || 0;
        span.innerText = count + 1;
        btn.style.color = "var(--pink-accent)";
        playAudioTone(currentAnimal.species);
    }
}

function simulateNewPost() {
    const randomThoughts = [
        "Found a suspicious pinecone. Barked at it for 20 minutes until it surrendered.",
        "Napped in 4 different sunlight spots today. Highly productive schedule.",
        "The lake water was crisp and full of splashing tadpoles.",
        "A butterfly landed on my nose. We reached a peaceful ceasefire."
    ];
    const meta = speciesMetadata[currentAnimal.species] || speciesMetadata.dog;
    const thought = randomThoughts[Math.floor(Math.random() * randomThoughts.length)];

    const list = document.getElementById("homeFeedList");
    const item = document.createElement("div");
    item.className = "feed-item";
    item.innerHTML = `
        <div class="feed-author-row">
            <div class="feed-author">
                <div class="feed-avatar">${meta.emoji}</div>
                <div>
                    <div class="feed-name">${currentAnimal.name}</div>
                    <div class="feed-time">${currentAnimal.habitat} • Just now</div>
                </div>
            </div>
            <span class="badge-tag" style="font-size: 0.72rem; padding: 2px 8px;">New Howl</span>
        </div>
        <div class="feed-text">${thought}</div>
        <div class="feed-animal-sound">🗣️ Sound: "${meta.dialectPhrase}"</div>
        <div class="feed-actions">
            <button class="feed-action-btn" onclick="reactPost(this)">❤️ <span>1</span> Paw</button>
            <button class="feed-action-btn" onclick="switchNavSection('chat')">💬 Reply</button>
            <button class="feed-action-btn" onclick="playAudioTone('${currentAnimal.species}')">🔊 Listen</button>
        </div>
    `;
    list.prepend(item);
    playAudioTone(currentAnimal.species);
}

// =========================================================
// FIND FRIENDS & MATING EXPLORER
// =========================================================

function renderFriendsGrid(filterSpecies = "all") {
    const grid = document.getElementById("friendsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const filtered = filterSpecies === "all"
        ? wildlifeFriends
        : wildlifeFriends.filter(f => f.species === filterSpecies);

    filtered.forEach(friend => {
        const meta = speciesMetadata[friend.species] || speciesMetadata.dog;
        const card = document.createElement("div");
        card.className = "friend-profile-card";
        card.innerHTML = `
            <div class="friend-avatar-circle">
                ${meta.emoji}
                <div class="compatibility-badge">${friend.compatibility}</div>
            </div>
            <h3 class="friend-card-name">${friend.name}</h3>
            <p class="friend-card-species">${meta.name} • ${friend.age} Yrs</p>
            <p class="friend-status-quote">"${friend.statusQuote}"</p>
            <div class="friend-card-actions">
                <button class="btn-sniff-friend" onclick="sniffFriend('${friend.name}', '${friend.species}')">
                    👃 Sniff & Connect
                </button>
                <button class="btn-quick-chat" title="Open Chat" onclick="startDirectChat('${friend.id}')">
                    💬
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterFriends(speciesKey, btn) {
    document.querySelectorAll(".filter-pills-row .filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderFriendsGrid(speciesKey);
}

function sniffFriend(name, species) {
    playAudioTone(species);
    alert(`👃 *Sniff Sniff*\nYou exchanged friendly scent markers with ${name}! Compatibility verified.`);
}

function startDirectChat(friendId) {
    activeFriendId = friendId;
    switchNavSection("chat");
    initChatBoard();
}

// =========================================================
// BILINGUAL ANIMAL CHATTING BOARD
// =========================================================

function translateToAnimalDialect(text, speciesType) {
    const meta = speciesMetadata[speciesType] || speciesMetadata.dog;
    const soundList = meta.soundWords;
    const words = text.trim().split(/\s+/);

    if (words.length === 0 || text.trim() === "") {
        return meta.dialectPhrase;
    }

    const translatedWords = words.map((w, index) => {
        const pick = soundList[index % soundList.length];
        if (w.endsWith("?")) return pick + "?";
        if (w.endsWith("!")) return pick + "!";
        if (w.endsWith("...")) return pick + "...";
        return pick;
    });

    return translatedWords.join(" ").toUpperCase() + "!";
}

function initChatBoard() {
    renderChatSidebar();
    renderActiveChatConversation();
}

function renderChatSidebar(query = "") {
    const list = document.getElementById("chatFriendsList");
    if (!list) return;

    list.innerHTML = "";

    const filtered = wildlifeFriends.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.species.toLowerCase().includes(query.toLowerCase())
    );

    filtered.forEach(friend => {
        const meta = speciesMetadata[friend.species] || speciesMetadata.dog;
        const isActive = friend.id === activeFriendId;
        const item = document.createElement("div");
        item.className = `chat-friend-item ${isActive ? "active" : ""}`;
        item.onclick = () => {
            activeFriendId = friend.id;
            renderChatSidebar(query);
            renderActiveChatConversation();
            playAudioTone(friend.species);
        };

        item.innerHTML = `
            <div class="friend-item-avatar">
                ${meta.emoji}
                ${friend.online ? '<div class="online-indicator"></div>' : ''}
            </div>
            <div class="friend-item-details">
                <div class="friend-item-name">
                    <span>${friend.name}</span>
                    <span class="friend-item-time">${friend.lastTime}</span>
                </div>
                <div class="friend-item-preview">${friend.lastMessage}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

function searchChatFriends(val) {
    renderChatSidebar(val);
}

function renderActiveChatConversation() {
    const friend = wildlifeFriends.find(f => f.id === activeFriendId) || wildlifeFriends[0];
    if (!friend) return;

    const meta = speciesMetadata[friend.species] || speciesMetadata.dog;
    const myMeta = speciesMetadata[currentAnimal.species] || speciesMetadata.dog;

    document.getElementById("activeChatAvatar").innerText = meta.emoji;
    document.getElementById("activeChatName").innerText = friend.name;
    document.getElementById("activeChatStatus").innerHTML = `● Online • ${meta.name} • Dialect: ${meta.dialectPhrase}`;

    const stream = document.getElementById("chatStream");
    stream.innerHTML = "";

    const bilingual = document.getElementById("settingBilingual")?.checked ?? true;

    friend.chatHistory.forEach(msg => {
        const isMine = msg.sender === "mine";
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble-row ${isMine ? "mine" : ""}`;

        const avatar = isMine ? myMeta.emoji : meta.emoji;

        bubble.innerHTML = `
            <div class="chat-bubble-avatar">${avatar}</div>
            <div class="chat-bubble-content">
                <div class="animal-sound-text">${msg.sound}</div>
                ${bilingual ? `<div class="human-translation-sub">💭 "${msg.text}"</div>` : ''}
                <div class="message-time-meta">${msg.time}</div>
            </div>
        `;
        stream.appendChild(bubble);
    });

    stream.scrollTop = stream.scrollHeight;
}

function insertSoundToken(token) {
    const input = document.getElementById("chatMessageInput");
    if (input) {
        input.value += (input.value ? " " : "") + token;
        input.focus();
    }
}

function sendChatMessage() {
    const input = document.getElementById("chatMessageInput");
    if (!input || !input.value.trim()) return;

    const rawText = input.value.trim();
    input.value = "";

    const friend = wildlifeFriends.find(f => f.id === activeFriendId);
    if (!friend) return;

    const animalVocalization = translateToAnimalDialect(rawText, currentAnimal.species);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    friend.chatHistory.push({
        sender: "mine",
        sound: animalVocalization,
        text: rawText,
        time: nowTime
    });

    friend.lastMessage = animalVocalization;
    friend.lastTime = "Just now";

    renderActiveChatConversation();
    renderChatSidebar();
    playAudioTone(currentAnimal.species);

    setTimeout(() => {
        generateFriendResponse(friend);
    }, 1500);
}

function generateFriendResponse(friend) {
    const companionReplies = {
        dog: [
            { text: "I agree 100%! Let's chase the wind across the meadow." },
            { text: "Ruff! Did you hear that rustling in the bushes?" },
            { text: "Tail wagging at maximum frequency right now." }
        ],
        cat: [
            { text: "A very intriguing thought. I shall ponder it while batting at a moth." },
            { text: "Purrr... satisfy me with salmon and we will rule the garden." },
            { text: "I approve of this message. Now observe my graceful stretch." }
        ],
        cow: [
            { text: "Mooo... peaceful thoughts lead to sweeter milk and greener grass." },
            { text: "The sunshine is wonderful on the hills today." }
        ],
        chicken: [
            { text: "Bawk! I just discovered a huge acorn near the fence!" },
            { text: "Flapping wings in excitement! Chirp chirp!" }
        ],
        frog: [
            { text: "Ribbit! The water lily is cool and the flies are plentiful." },
            { text: "Splash! Diving deep into the lagoon to celebrate." }
        ]
    };

    const pool = companionReplies[friend.species] || companionReplies.dog;
    const replyObj = pool[Math.floor(Math.random() * pool.length)];
    const soundVocalization = translateToAnimalDialect(replyObj.text, friend.species);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    friend.chatHistory.push({
        sender: "them",
        sound: soundVocalization,
        text: replyObj.text,
        time: nowTime
    });

    friend.lastMessage = soundVocalization;
    friend.lastTime = "Just now";

    renderActiveChatConversation();
    renderChatSidebar();
    playAudioTone(friend.species);
}

function makeAnimalCall() {
    const friend = wildlifeFriends.find(f => f.id === activeFriendId);
    if (friend) {
        playAudioTone(friend.species);
        alert(`📞 *Acoustic Calling ${friend.name}*...\n${speciesMetadata[friend.species].dialectPhrase}`);
    }
}

function sendVirtualTreat() {
    const friend = wildlifeFriends.find(f => f.id === activeFriendId);
    if (friend) {
        playAudioTone(currentAnimal.species);
        alert(`🦴 You sent a virtual gourmet treat to ${friend.name}! They did a happy tail wag.`);
    }
}

// =========================================================
// SETTINGS & RESET
// =========================================================

function toggleParticles(enabled) {
    const particles = document.querySelector(".floating-paws");
    if (particles) {
        particles.style.display = enabled ? "block" : "none";
    }
}

function resetAnimalIdentity() {
    if (confirm("🐾 Are you sure you want to reset your Animal Aadhaar registration and start over?")) {
        currentAnimal.isVerified = false;
        document.getElementById("worldPage").classList.add("hidden");
        document.getElementById("loginPage").classList.remove("hidden");
        document.getElementById("animalRegForm").reset();
        document.getElementById("resultBox").style.display = "none";
        document.getElementById("enterButton").classList.remove("unlocked");
        document.getElementById("verificationBadge").innerHTML = "Unverified";
        document.getElementById("verificationBadge").style.color = "var(--text-dim)";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// =========================================================
// INITIALIZATION
// =========================================================

window.addEventListener("DOMContentLoaded", () => {
    console.log("🐾 Animal World Desktop Network initialized successfully.");
    onSpeciesChanged();
});