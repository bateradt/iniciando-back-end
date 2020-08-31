// alsjhflkjahdklfjasdkl
// alsjhflkjahdklfjasdkl
// alsjhflkjahdklfjasdkl
// alsjhflkjahdklfjasdkl
// alsjhflkjahdklfjasdkl
// alsjhflkjahdklfjasdkl
interface IStorageProvider {
    saveFile(file: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}

export default IStorageProvider;
