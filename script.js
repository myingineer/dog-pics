const breedInputElement = document.getElementById('breed');
const subBreedInputElement = document.querySelector('.sub-breed');
const displayContainer = document.querySelector('.js-img');
const loadingSpinner = document.querySelector('.js-circle');
const submitButton = document.querySelector('.js-btn');
const errorDisplay = document.querySelector('.error-display');
const errorText = document.querySelector('.error-text');

const apiUrl1 = 'https://dog.ceo/api/breeds/image/random';
const apiUrl2 = 'https://dog.ceo/api/breed/germanshepherd/images/random'
const apiUrl3 = 'https://dog.ceo/api/breeds/list/all';

loadingSpinner.style.display = 'none';
errorText.style.display = 'none';

breedInputElement.addEventListener('input', () => {
    loadingSpinner.style.display = 'block';
    errorDisplay.style.display = 'none';
    errorText.style.display = 'none';
});

async function dogBreeds() {
    try {
        if (breedInputElement.value !== '' && subBreedInputElement.value !== '') {
            const request = await fetch(`https://dog.ceo/api/breed/${breedInputElement.value.toLowerCase()}/${subBreedInputElement.value.toLowerCase()}/images/random`);
            const response = await request.json();
            displayContainer.innerHTML = `<img src="${response.message}" alt="dog-img" class="image">`;
        } else if (breedInputElement.value !== '' && subBreedInputElement.value === '') {
            const request = await fetch(`https://dog.ceo/api/breed/${breedInputElement.value.toLowerCase()}/images/random`);
            const response = await request.json();
            displayContainer.innerHTML = `<img src="${response.message}" alt="dog-img" class="image">`;
        }
    } catch (error) {
        loadingSpinner.style.display = 'none';
        errorDisplay.style.display = 'block';
    }
}

submitButton.addEventListener('click', () => {
    loadingSpinner.style.display = 'block';
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 2000);
    setTimeout(() => {
        if (breedInputElement.value !== '' && subBreedInputElement.value !== '') {
            dogBreeds();
        } else if (breedInputElement.value !== '' && subBreedInputElement.value === '') {
            dogBreeds();
        } else {
            errorText.style.display = 'block';
            loadingSpinner.style.display = 'none';
            errorDisplay.style.display = 'block';
        }
    }, 3000);
});