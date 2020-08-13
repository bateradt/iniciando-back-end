import ISendMailDto from '../dtos/ISendMailDTO';

interface IMailProvider {
    sendMail(data: ISendMailDto): Promise<void>;
}

export default IMailProvider;
