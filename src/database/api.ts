export interface UserApi {
    createUser(telegramId: string, credentials: any, lastUsedCredential: number): void,

    getUserByTelegramId(telegramId: string): any
}