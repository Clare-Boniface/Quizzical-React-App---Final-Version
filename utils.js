// Shuffles an array randomly 

export default function shuffleArray(array) {
    const shuffledArray = [...array]; // Make a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive).
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j.
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray; // Return the shuffled copy
}

