import ISendMailDto from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

export default interface IMailProvider {
    sendMail(data: ISendMailDto): Promise<void>;
}
