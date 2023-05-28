/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/PrismaService'

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookCreateInput) {
    const bookExists = await this.prisma.book.findFirst({
      where: { bar_code: data.bar_code },
    })

    if (bookExists) throw new Error('Book already exists')

    return await this.prisma.book.create({ data })
  }

  async findAll() {
    return this.prisma.book.findMany()
  }

  async update(id: string, data: Prisma.BookUpdateInput) {
    const bookExists = await this.prisma.book.findUnique({
      where: { id },
    })

    if (!bookExists) throw new Error('Book not found')

    return await this.prisma.book.update({
      data,
      where: { id },
    })
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: { id },
    })

    if (!bookExists) throw new Error('Book not found')

    return await this.prisma.book.delete({ where: { id } })
  }
}
