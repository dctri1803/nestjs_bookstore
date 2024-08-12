import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('books-controller')
export class BooksControllerController {

    @Get('/books');
    getAllBooks(): string {
        return 'This will return a list of all books';
    };

    @Get('/books/:id');
    getBookById(@Param('id') id: string): string {
        return `This will return the details of the book with id: ${id}`;
    }
    @Post('/books')
    addBook(): string {
      return 'This will add a new book';
    }

    @Delete('/books/id')
    deleteBooks(@Param('id') id: string): string {
      return `This will add the book with id: ${id}`;
    }
}
