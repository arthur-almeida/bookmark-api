import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dtos';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  public getBookmarks(userId: number) {
    return this.bookmarkRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  public createBookmark(user: User, createBookmarkDto: CreateBookmarkDto) {
    const bookmark = this.bookmarkRepository.create({
      ...createBookmarkDto,
      user,
    });
    return this.bookmarkRepository.save(bookmark);
  }
}
