class IsValid {
    constructor() {
        this.telephonePattern = /^\+{1}\d{1,2}\({1}\d{3}\){1}\d{3}([-]{1}\d{2}){2}/;
        this.emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

        if (!IsValid.instance) {
            IsValid.instance = this;
        }

        return IsValid.instance;
    }

    // eslint-disable-next-line
    minLength(text, length = 2) {
        return text.length > length;
    }

    // eslint-disable-next-line
    maxLength(text, length = 20) {
        return text.length < length;
    }

    // eslint-disable-next-line
    pattern(text, regEx) {
        return regEx.test(text);
    }

    email(email) {
        return this.pattern(email, this.emailPattern);
    }

    phone(telephone) {
        return this.pattern(telephone, this.telephonePattern);
    }

    // eslint-disable-next-line
    numberRange(text, min = 18, max = 120) {
        return text > min && text < max;
    }
}


const instance = new IsValid();
Object.freeze(instance);

export default instance;
