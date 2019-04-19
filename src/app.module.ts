import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackagingSolutionModule } from './packaging-solution/packaging-solution.module';

@Module({
    imports: [PackagingSolutionModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
