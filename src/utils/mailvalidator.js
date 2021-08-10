const EMPTY_EMAIL = 'empty_email';
const EMPTY_NAME = 'empty_name';
const INVALID_EMAIL = 'invalid_email';
const EMPTY_SUBJECT = 'empty_subject';
const EMPTY_CONTENT = 'empty_content';
const FULL_NH = 'full_nh';

export const ERROR_MESSAGES = [
    EMPTY_NAME, EMPTY_CONTENT, EMPTY_EMAIL, EMPTY_SUBJECT, INVALID_EMAIL, FULL_NH
]

export class UserEmail {
    constructor(name = "", email="", subject = "", content = "", nh = "") {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.content = content;
        this.nh = nh
    }

    as_empty_value() {
        return !Object.keys(this).reduce((prev, key) => {
            if (key === 'nh') return prev && !this[key];
            return prev && this[key]
        }, true);
    }
    retrieve_error_message() {
        const error_message = [];
        if (!this.as_empty_value()) return error_message;
        Object.keys(this).forEach(key => {
            const error_key = `EMPTY_${key.toLocaleUpperCase()}`;
            if (key === 'nh' && this[key]) error_message.push(FULL_NH);
            if (!this[key] && key !== 'nh') error_message.push(error_key);
        }) 
        return error_message;
    }
    check_email_error() {
        const error_message = [];
        if (!this.email) {
            error_message.push(EMPTY_EMAIL);
            return error_message;
        }
        const reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!reg.test(this.email)) error_message.push(INVALID_EMAIL);
        return error_message;
    }
    check_honeypot() {
        return Boolean(this.nh);
    }

    get_user_json_stringify(lang = 'en') {
        return JSON.stringify({
            name: this.name,
            email: this.email,
            subject: this.subject,
            content: this.content,
            nh: this.nh,
            lang: lang
        })
    }
}