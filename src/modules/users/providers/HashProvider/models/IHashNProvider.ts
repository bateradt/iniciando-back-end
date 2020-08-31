// lkjahsdflkjhasd
// lkjahsdflkjhasd
// lkjahsdflkjhasd
// lkjahsdflkjhasd
// lkjahsdflkjhasd
// lkjahsdflkjhasd
interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}

export default IHashProvider;
