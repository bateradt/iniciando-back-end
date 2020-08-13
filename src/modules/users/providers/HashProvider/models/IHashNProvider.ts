interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}

export default IHashProvider;

//
// 6s4df5a4d5f4as6d54
