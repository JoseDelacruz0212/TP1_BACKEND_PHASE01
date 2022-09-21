import { Controller, Post, Query } from "@nestjs/common";
import { MailService } from "../service/mail.service";

@Controller('mail')
export class MailController {
    constructor(
        private readonly sendgridService: MailService
    ){}

    @Post('send')
    async sendEmail() {

        const mail = {
            to: ['ldlmhm@gmail.com'],
            from: 'lhm2001@hotmail.com',
            templateId:'d-07316ea28bc04f8ca9e8c1ff747b7cff',
            dynamicTemplateData:{
              subject:'Test',
              user:"user"
            }
        };

       return await this.sendgridService.send(mail);
    }
}
