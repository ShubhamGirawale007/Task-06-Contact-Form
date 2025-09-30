document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.querySelector('.success-message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    };

    const clearError = (input) => {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
    };

    const validateFullName = () => {
        if (fullNameInput.value.trim() === '') {
            showError(fullNameInput, 'Full name is required.');
            return false;
        }
        clearError(fullNameInput);
        return true;
    };

    const validateEmail = () => {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, 'Email is required.');
            return false;
        }
        if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'Please enter a valid email address.');
            return false;
        }
        clearError(emailInput);
        return true;
    };

    const validateMessage = () => {
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            showError(messageInput, 'Message cannot be empty.');
            return false;
        }

        const wordCount = messageValue.split(/\s+/).length;
        if (wordCount > 1) {
            showError(messageInput, 'Message must be only 1 word.');
            return false;
        }

        clearError(messageInput);
        return true;
    };

    fullNameInput.addEventListener('input', validateFullName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', () => {
        const words = messageInput.value.trim().split(/\s+/);
        if (words.length > 1) messageInput.value = words[0];
        validateMessage();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            successMessage.textContent = 'Message sent successfully!';
            form.reset();
            clearError(fullNameInput);
            clearError(emailInput);
            clearError(messageInput);
        } else {
            successMessage.textContent = '';
        }
    });
});
