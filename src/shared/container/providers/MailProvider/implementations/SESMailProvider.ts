import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import mailConfig from '@config/mail';
import aws from 'aws-sdk';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDto from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: 'us-east-1',
            }),
        });
    }

    public async sendMail({
        subject,
        to,
        from,
        templateData,
    }: ISendMailDto): Promise<void> {
        const { email, name } = mailConfig.defaults.from;

        const message = {
            from: {
                name: from?.name || name,
                address: from?.name || email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        };

        await this.client.sendMail(message);
    }
}

export default SESMailProvider;
