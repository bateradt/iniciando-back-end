import IParseMailTemplateDto from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDto): Promise<string>;
}
