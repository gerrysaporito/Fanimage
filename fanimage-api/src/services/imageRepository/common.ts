import dotenv from 'dotenv';

dotenv.config();

export const S3_MODULE_BUCKET = 'fanimage-image-repository-modules';
export const S3_MODULE_FORDER_NAME =
  process.env.NODE_ENV === 'development'
    ? 'modules/development'
    : 'modules/production';
