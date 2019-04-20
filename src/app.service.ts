import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public getAppInfo(): string {
        return `
            <h1>Welcome to Parse-the-Parcel</h1>
            <p>${process.env.npm_package_description}</p>
            <p>Check out the <a href="/docs">docs</a> for more information.</p><br/>
            <p>Version ${process.env.npm_package_version}, powered by <a href="https://nestjs.com/">NestJS</a></p>
        `;
    }
}
