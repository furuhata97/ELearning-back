import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  // O diskStorage representa o armazenamento local no disco
  storage: multer.diskStorage({
    // O destination é o local onde as imagens serão salvas
    destination: tmpFolder,
    // o filename é o nome que os arquivos serão salvos. Aqui é gerado um
    // hash seguido pelo nome original do arquivo
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
