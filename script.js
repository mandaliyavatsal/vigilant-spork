document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('numerology-form');
    const lifePathNumberElement = document.getElementById('life-path-number');
    const expressionNumberElement = document.getElementById('expression-number');
    const soulUrgeNumberElement = document.getElementById('soul-urge-number');
    const personalityNumberElement = document.getElementById('personality-number');

    let meanings = {};

    fetch('meanings.json')
        .then(response => response.json())
        .then(data => {
            meanings = data;
        })
        .catch(error => console.error('Error loading meanings:', error));

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const birthdate = document.getElementById('birthdate').value;

        if (!name || !birthdate) {
            alert('Please enter both your name and birthdate.');
            return;
        }

        const lifePathNumber = calculateLifePathNumber(birthdate);
        const expressionNumber = calculateExpressionNumber(name);
        const soulUrgeNumber = calculateSoulUrgeNumber(name);
        const personalityNumber = calculatePersonalityNumber(name);

        lifePathNumberElement.textContent = `Life Path Number: ${lifePathNumber} - ${meanings[lifePathNumber] || 'Meaning not found'}`;
        expressionNumberElement.textContent = `Expression Number: ${expressionNumber} - ${meanings[expressionNumber] || 'Meaning not found'}`;
        soulUrgeNumberElement.textContent = `Soul Urge Number: ${soulUrgeNumber} - ${meanings[soulUrgeNumber] || 'Meaning not found'}`;
        personalityNumberElement.textContent = `Personality Number: ${personalityNumber} - ${meanings[personalityNumber] || 'Meaning not found'}`;
    });

    function calculateLifePathNumber(birthdate) {
        const digits = birthdate.replace(/-/g, '').split('').map(Number);
        return reduceToSingleDigit(digits.reduce((sum, digit) => sum + digit, 0));
    }

    function calculateExpressionNumber(name) {
        const letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
        const values = letters.map(letter => letter.charCodeAt(0) - 64);
        return reduceToSingleDigit(values.reduce((sum, value) => sum + value, 0));
    }

    function calculateSoulUrgeNumber(name) {
        const vowels = name.toUpperCase().replace(/[^AEIOU]/g, '').split('');
        const values = vowels.map(vowel => vowel.charCodeAt(0) - 64);
        return reduceToSingleDigit(values.reduce((sum, value) => sum + value, 0));
    }

    function calculatePersonalityNumber(name) {
        const consonants = name.toUpperCase().replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, '').split('');
        const values = consonants.map(consonant => consonant.charCodeAt(0) - 64);
        return reduceToSingleDigit(values.reduce((sum, value) => sum + value, 0));
    }

    function reduceToSingleDigit(number) {
        while (number > 9) {
            number = number.toString().split('').map(Number).reduce((sum, digit) => sum + digit, 0);
        }
        return number;
    }
});
