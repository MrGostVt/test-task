import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsResolver } from './forms.resolver';
import { RamDbModule } from 'src/ram-db/ram-db.module';

@Module({
  providers: [FormsService, FormsResolver],
  imports: [RamDbModule]
})
export class FormsModule {}
