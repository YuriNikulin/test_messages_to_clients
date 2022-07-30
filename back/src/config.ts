interface IConfig {
    storageType: 'db' | 'localstorage';
    passwordSaltRounds: number;
}

export const config: IConfig = {
    storageType: 'db', // поменять на 'db', чтобы использовать базу данных,
    passwordSaltRounds: 4
}