const logindb = require('./logindb');

test('checks the login of user \'MattressButter\' with password \'password\', expecting true', async() => {
    const data = await logindb.checkLogIn('MattressButter', 'password');
    expect(data).toBe(true);
});

test('checks the login of user \'MattressButter\' with password \'wrong\', expecting false', async() => {
    const data = await logindb.checkLogIn('MattressButter', 'wrong');
    expect(data).toBe(false);
});

/*
test('checks adding the user \'New User\', expecting success', async() => {

});
*/

/*
test('checks adding the user \'MattressButter\', expecting error', async() => {

    const data = await logindb.addUser('MattressButter', 'password', 'mattressbutter@betterboxd.com');
    expect(data).toBe(TypeError);
});
*/

/*
test('checks taking user info from user \'MattressButter\'', async() => {
    const data = await logindb.getUser('MattressButter');
    expect(data).toBe(
        [
            {
            _id: "622adc436687d02f74e1e7d4",
            username: 'MattressButter',
            email_address: 'mrmattress@betterboxd.com',
            password: 'password',
            lists: null
            }
        ]
    )
});
*/