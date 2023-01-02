import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from './entities/bookmark.entity';

@Module({
  controllers: [BookmarkController],
  imports: [TypeOrmModule.forFeature([Bookmark])],
  providers: [BookmarkService],
})
export class BookmarkModule {}
