import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Put,
    Delete,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Public } from 'src/users/decorators/public.decorator';
  import { CategoriesService } from './categories.service';
  import { CreateCategoryDto } from './dto/category.dto';
  import { UpdateCategoryDto } from './dto/category.dto';

  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Post('files/upload')
    @Public()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      console.log(file);
      return {
        message: 'File uploaded successfully',
        fileName: file.originalname,
      };
    }
  
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
      return this.categoriesService.create(createCategoryDto);
    }
  
    @Get()
    findAll() {
      return this.categoriesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.categoriesService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
      return this.categoriesService.update(id, updateCategoryDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.categoriesService.remove(id);
    }
  }
  