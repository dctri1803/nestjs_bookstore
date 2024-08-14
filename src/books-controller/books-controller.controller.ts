import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { createBookDTO } from './dto/create-book.dto';

@Controller('books')
export class BooksControllerController {
  private books: createBookDTO[] = [
    {
      id: 1,
      title: 'Backend NESTJS',
      author: 'Thomy Shelby',
      publishedYear: 2020,
    },
    {
      id: 2,
      title: 'Backend Java',
      author: 'Thomy Xiaomi',
      publishedYear: 2021,
    },
  ];
  @Get('')
  getAllBooks(): createBookDTO[] {
    try {
      return this.books;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get books');
    }
  }

  @Get(':id')
  getBookById(@Param('id') id: number): createBookDTO {
    try {
      const resultedBook = this.books.find((book) => book.id === Number(id));
      if (!resultedBook) {
        throw new NotFoundException(`Can not find book with id: ${id}`);
      }
      return resultedBook;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to get books');
    }
  }

  @Post('')
  addBook(@Body() newBook: createBookDTO): createBookDTO {
    try {
      newBook.id = this.books.length
        ? this.books[this.books.length - 1].id + 1
        : 1;
      this.books.push(newBook);
      return newBook;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create new book');
    }
  }

  @Put(':id')
  updateBook(
    @Param('id') id: number,
    @Body() updateData: Partial<createBookDTO>,
  ): createBookDTO {
    try {
      const bookSelected = this.books.find((book) => book.id === Number(id));
      if (!bookSelected) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      const updatedBook = { ...this.books[Number(id) - 1], ...updateData };
      this.books[Number(id) - 1] = updatedBook;
      return updatedBook;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update book');
    }
  }

  @Patch(':id')
  partialUpdateBook(
    @Param('id') id: number,
    @Body() updateData: Partial<createBookDTO>,
  ): createBookDTO {
    try {
      const bookSelected = this.books.find((book) => book.id === Number(id));
      if (!bookSelected) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      const updatedBook = { ...this.books[Number(id) - 1], ...updateData };
      this.books[Number(id) - 1] = updatedBook;
      return updatedBook;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update book');
    }
  }

  @Delete(':id')
  deleteBooks(@Param('id') id: number): string {
    try {
      const bookSelected = this.books.find((book) => book.id === Number(id));
      if (!bookSelected) {
        throw new NotFoundException(`Can not find book with id: ${id}`);
      }
      this.books = this.books.filter((book) => book.id !== Number(id));
      console.log(this.books);
      return 'This book has been deleted';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete books');
    }
  }
}
