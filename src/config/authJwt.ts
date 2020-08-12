interface IAuth {
    jwt: {
        secret: string;
        expiresIn: string;
    };
}

export default {
    jwt: {
        secret:
            process.env.APP_SECRET_JWT || '5ad61e4c86848fdeb785785efc545b2edf',
        expiresIn: process.env.APP_EXPIRES_IN || '1d',
    },
} as IAuth;
