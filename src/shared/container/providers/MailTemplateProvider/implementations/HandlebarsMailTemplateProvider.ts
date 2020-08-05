import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDto from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDto): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = handlebars.compile(templateFileContent);
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
