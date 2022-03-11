import { accessToken } from './credentials';

const oauthConfig = {
    callbackURL: 'https://localhost:3000/oauth2/callback',
    authURL: 'https://trakt.tv/oauth/authorize',
    accessTokenURL: 'https://trakt.tv/oauth/token'
};
