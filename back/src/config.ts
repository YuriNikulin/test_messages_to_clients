interface IConfig {
    port: number;
    storageType: 'db' | 'localstorage';
    passwordSaltRounds: number;
}

export const config: IConfig = {
    port: 3000,
    storageType: 'db', // поменять на 'db', чтобы использовать базу данных,
    passwordSaltRounds: 4
}