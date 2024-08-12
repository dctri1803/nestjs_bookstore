import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('books')
export class BooksControllerController {
  @Get('')
  getAllBooks(): string {
    return 'This will return a list of all books';
  }

  @Get(':id')
  getBookById(@Param('id') id: string): string {
    return `This will return the details of the book with id: ${id}`;
  }

  @Post('')
  addBook(): string {
    return 'This will add a new book';
  }

  @Delete(':id')
  deleteBooks(@Param('id') id: string): string {
    return `This will add the book with id: ${id}`;
  }
}
