import { Controller, Post, Query } from "@nestjs/common";
import { MailService } from "../service/mail.service";

@Controller('mail')
export class MailController {
    constructor(
        private readonly sendgridService: MailService
    ){}

    @Post('send')
    async sendEmail(@Query('email') email) {
        const mail = {
            to: email,
            subject: 'Hello World',
            from: 'jodelacruz0212@hotmail.com',
            text: 'Hello World',
            html: '<h1>Hello World</h1>'
        };

        return await this.sendgridService.send(mail);
    }
}
