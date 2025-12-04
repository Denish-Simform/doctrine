import { DataSource, Repository } from 'typeorm';
import { UserImage } from './entities/userImages.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/BaseRepository';

@Injectable()
export class UserImageRepository extends BaseRepository {
  private userImageRepo: Repository<UserImage>;
  constructor(dataSource: DataSource) {
    super();
    this.userImageRepo = dataSource.getRepository(UserImage);
  }

  create(imageData: Partial<UserImage>): Promise<string | void> {
    const newImage = new UserImage();
    Object.assign(newImage, imageData);
    return this.userImageRepo.save(newImage).then((savedImage) => {
      return savedImage.image_url;
    });
  }
}
