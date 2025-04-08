import {
     Controller, 
     Post, 
     UploadedFile,
     UseInterceptors,
    } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import { Public } from 'src/users/decorators/public.decorator';
@Controller('categories')
export class CategoriesController {
    @Post('files/upload')
    @Public()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        console.log(file);
        return {
            message: 'File uploaded successfully',
        };
    }
}

