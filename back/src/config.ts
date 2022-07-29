interface IConfig {
    port: number;
    storageType: 'db' | 'localstorage'
}

export const config: IConfig = {
    port: 3000,
    storageType: 'db', // поменять на 'db', чтобы использовать базу данных
}