import { getFirstName, isValidPassword } from '../src/utils/user.js'

test('Should return first name when given full name', () => {
    const firstName = getFirstName('Andrew Mead')

    expect(firstName).toBe('Andrew')
})

test('Should return first name when given first name', () => {
    const firstName = getFirstName('Jen')

    expect(firstName).toBe('Jen')
})

test('Should reject password shorter than 8 characters', () => {
    const isValid = isValidPassword('Short')

    expect(isValid).toBe(false)
})

test('Should reject password that contains the word password', () => {
    const isValid = isValidPassword('Password')

    expect(isValid).toBe(false)
})

test('Should correctly validate a valid password', () => {
    const password = 'ThisWillWork'
    const isValid = isValidPassword(password)

    expect(isValid).toBe(true)
})