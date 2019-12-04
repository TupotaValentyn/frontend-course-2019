
import '../styles/style.css';
import IsValid from './IsValid';

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    const { age } = formData;
    const validObj = {
        firstName: {},
        lastName: {},
        email: {},
        phone: {},
        age: {},
    };

    Object.keys(formData).forEach((key) => {
        validObj[key].error = !formData[key];
    });

    ['firstName', 'lastName'].forEach((item) => {
        validObj[item].error = !(IsValid
            .minLength(formData[item]) && IsValid
            .maxLength(formData[item]));
    });

    ['email', 'phone'].forEach((key) => {
        validObj[key].error = !IsValid[key](formData[key]);
    });

    validObj.age.error = !IsValid.numberRange(age);

    Object.keys(formData).forEach((field) => {
        const input = form.querySelector(`[name="${[field]}"`);
        if (validObj[field].error === true) {
            input.classList.add('error');
            return null;
        }
        input.classList.remove('error');
        return null;
    });

    const hint = document.querySelector('.form-message');

    if (Object.keys(validObj).map((key) => validObj[key].error).every((item) => item === false)) {
        hint.classList.remove('error-message');
        hint.textContent = 'Validation successful!';
        Object.keys(formData).forEach((fieldName) => {
            form.querySelector(`[name="${fieldName}"]`).value = '';
        });

        return null;
    }
    hint.textContent = 'Validation failed!';
    hint.classList.add('error-message');

    return false;
});
