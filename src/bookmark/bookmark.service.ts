import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dtos';
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

  public getBookmarkById(userId: number, bookmarkId: number) {
    return this.bookmarkRepository.findOne({
      where: {
        id: bookmarkId,
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

  public async editBookmarkById(
    userId: number,
    bookmarkId: number,
    updateBookmarkDto: UpdateBookmarkDto,
  ) {
    const bookmark = await this.bookmarkRepository.findOne({
      where: {
        id: bookmarkId,
      },
      relations: {
        user: true,
      },
    });
    if (!bookmark || bookmark.user.id !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    this.bookmarkRepository.update(
      {
        id: bookmarkId,
      },
      updateBookmarkDto,
    );
  }

  public async deleteBookmark(userId: number, bookmarkId: number) {
    const bookmark = await this.bookmarkRepository.findOne({
      where: {
        id: bookmarkId,
      },
      relations: {
        user: true,
      },
    });
    if (!bookmark || bookmark.user.id !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    await this.bookmarkRepository.delete({
      id: bookmarkId,
    });
  }
}
