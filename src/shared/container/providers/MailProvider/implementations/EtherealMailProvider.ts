import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDto from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            this.client = transporter;
        });
    }

    public async sendMail({
        subject,
        to,
        from,
        templateData,
    }: ISendMailDto): Promise<void> {
        const message = {
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.name || 'equipe@gobarber.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        };
        console.log(`Send mail: ${message}`);
        const info = await this.client.sendMail(message);

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}

export default EtherealMailProvider;
