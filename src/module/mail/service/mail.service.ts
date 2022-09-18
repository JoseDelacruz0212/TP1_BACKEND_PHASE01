import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {
    constructor(private readonly configService: ConfigService) {
        SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
    }

    async send(mail: SendGrid.MailDataRequired) {
        
/*         var mail:SendGrid.MailDataRequired;

        mail = {
            to: ['lhm2001@hotmail.com'],
            subject: 'Hello World',
            from: 'u20181g907@upc.edu.pe',
            text: 'Hello World',
            html: '<h1>Hello World</h1>'
        }; */

        console.log("mailservice");
        console.log(this.configService.get<string>('SEND_GRID_KEY'));
        const transport = await SendGrid.send(mail);

    
        console.log(`Email successfully dispatched to ${mail.to}`)
        return transport;
    }
}
