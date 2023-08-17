import emailRegex from "email-regex"
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,16}$/
const ONEMAIUSC = /(?=.*[A-Z])/
const ONELOWER = /(?=.*?[a-z])/
const ONEDIGIT = /(?=.*?[0-9])/
const ONESYMBOL = /(?=.*[#?!@$%^&*-])/

export const usernameValidation = username => {
    if(username.length < 3) return { msg: "Username must be longer than 3 characters"}
    if(username.length > 16) return { msg: "Username must be shorter than 16 characters"}
    if(!username.match(USERNAME_REGEX)) return { msg: "Username can only contain alphanumeric symbols and '.' or '-'"}
    return {msg:false}
}

export const passwordValidation = password => {
    if(password.length < 8) return { msg: "Password must be longer than 8 characters" }
    if(password.length > 32) return { msg: "Password must be shorter than 32 characters" }
    if(!ONEMAIUSC.test(password)) return { msg: "Password must at least contain one uppercase letter" }
    if(!ONELOWER.test(password)) return { msg: "Password must at least contain one lowercase letter" }
    if(!ONEDIGIT.test(password)) return { msg: "Password must at least contain one digit" }
    if(!ONESYMBOL.test(password)) return { msg: "Password must at least containe one of these symbols : # ? ! @ $ % ^ & * - " }
    return {msg:false}
}   

export const emailValidation = email => {
    if(!emailRegex({ exact:true }).test(email)) return { msg: `Email ${email} is not valid`}
    return {msg:false}
}