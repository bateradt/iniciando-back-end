import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDto from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
    private messages: ISendMailDto[] = [];

    public async sendMail(message: ISendMailDto): Promise<void> {
        this.messages.push(message);
    }
}

export default FakeMailProvider;
