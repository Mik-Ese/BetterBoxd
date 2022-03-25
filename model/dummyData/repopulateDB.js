const DBqueries = require('../DBqueries');
const User = require('../schemas/user.schema');
const JournalEntry = require('../schemas/journalEntry.schema');
const MovieList = require('../schemas/movieList.schema');

async function main() {
    var users = [
        {
            username: 'greatredswarm',
            email_address: 'greatredswarm@betterboxd.com',
            password: 'password'
        },
        {
            username: 'ame_yuki',
            email_address: 'ameyuki@betterboxd.com',
            password: 'password'
        },
        {
            username: 'mik',
            email_address: 'mik@betterboxd.com',
            password: 'password'
        },
        {
            username: 'moomoomilkholic',
            email_address: 'moomoomilkholic@betterboxd.com',
            password: 'password'
        },
        {
            username: 'spongebob',
            email_address: 'spongebob@betterboxd.com',
            password: 'password'
        },
        {
            username: 'maximus',
            email_address: 'maximus@betterboxd.com',
            password: 'password'
        },
        {
            username: 'MattressButter',
            email_address: 'mrmattress@betterboxd.com',
            password: 'password'
        }
    ];

    await User.deleteMany({});
    console.log('adding users...');
    for (user of users) {
        await DBqueries.postUser(user);
    }
    console.log('users added!');

    let journalEntries = [
        {
            user_id: '623d53a6af3cbb8ba46783c2',
            trakt_id: '224301',
            description: 'best animation of an anime movie'
        },
        {
            user_id: '623d53a6af3cbb8ba46783c2',
            trakt_id: '225063',
            description: 'saddest anime love story'
        }
    ];

    await JournalEntry.deleteMany({});
    console.log('adding journal entries...');
    await JournalEntry.insertMany(journalEntries);
    console.log('journal entries added!');

    process.exit(0);
}

if (require.main === module) {
    main();
}
