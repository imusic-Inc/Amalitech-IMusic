import generateRandomString from "../../api/keygen";

it('Test the key generation function for 5 characters', () => {
    expect(generateRandomString(5)).not.toBe(generateRandomString(5));
});

it('Test the key generation function for 10 characters', () => {
    expect(generateRandomString(10)).not.toBe(generateRandomString(10));
});


it('Test the key generation function for 15 characters', () => {
    expect(generateRandomString(15)).not.toBe(generateRandomString(15));
});


it('Test the key generation function for 20 characters', () => {
    expect(generateRandomString(20)).not.toBe(generateRandomString(20));
});


it('Test the key generation function for 25 characters', () => {
    expect(generateRandomString(25)).not.toBe(generateRandomString(25));
});


it('Test the key generation function for 30 characters', () => {
    expect(generateRandomString(30)).not.toBe(generateRandomString(30));
});