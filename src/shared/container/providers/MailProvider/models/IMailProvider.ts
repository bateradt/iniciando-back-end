// import ISendMailDto from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
// import ISendMailDto from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import ISendMailDto from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

interface IMailProvider {
    sendMail(data: ISendMailDto): Promise<void>;
}

export default IMailProvider;
