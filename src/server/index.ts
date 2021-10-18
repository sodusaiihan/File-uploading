import express, { Request, Response } from "express";
import mongoose from "mongoose";
import crypto from 'crypto'
import path from 'path';
import multer from "multer";
import { GridFsStorage } from 'multer-gridfs-storage';
import GridFS from 'gridfs-stream';
import cors from 'cors';

const app = express();
app.use(cors());
// Mongo URI
const mongoURI = 'mongodb://localhost:27017/ProjectA'

// Create mongo connection
const connection = mongoose.createConnection(mongoURI);

mongoose.connect(mongoURI)
  .then(() => console.log('Өгөгдлийн санд амжилттай холбогдлоо'))
  .catch((err) => console.error(err));

let gfs: GridFS.Grid;

connection.once('open', () => {
  // Init stream
  gfs = GridFS(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (_, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage
});

// @route GET /
// @desc Loads form
app.get('/images/:imageName', (req: Request, res) => {
  const connection = mongoose.createConnection(mongoURI);

  connection.once('open', () => {
    const gfs: GridFS.Grid = GridFS(connection.db, mongoose.mongo);
    gfs.collection('uploads');

    gfs.files.findOne({filename: req.params.imageName}, (err, file) => {
      if (!file || file.length === 0) {
        return res.sendStatus(404);
      }

      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        const stream = gfs.createReadStream({_id: file._id});
        stream.pipe(res);
      } else {
        res.sendStatus(400);
      }
    });
  });
});


// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  const filename = req.file?.filename;
  res.status(200).send({filename: filename});
});

app.post('/multiple-upload', upload.array('file', 10), (_, res)=> {
  res.status(200).json({
    success: true,
    message: `амжилттай байршуулж дууслаа`,
  })
})

// GET ALL FILES
app.get('/files', (_, res: Response) => {
  gfs.files.find({}).sort({uploadDate: -1}).toArray((err, files) => {
    res.status(200).send(files);
  });
});

// GET COUNT ALL FILES
app.get('/files/count', (_, res: Response) => {
  gfs.files.find({}).sort({uploadDate: -1}).sort({uploadDate: -1}).toArray((err, files) => {
    res.status(200).send({count: files.length});
  });
});

app.get('/files/count/all', (_, res: Response) => {
  gfs.files.find({}).sort({uploadDate: -1}).toArray((err, files) => {
    res.status(200).send(files).json({
      message: 'Ажилдаг ч болоосой доо'
    })
  })  
});

// GET ALL IMAGES
app.get('/all/images', async (_, res: Response) => {
  gfs.files.find({contentType: 'image/jpeg'}).sort({uploadDate: -1}).toArray((err, files) =>{
    res.status(200).send(files)
  })  
});

// GET COUNT ALL IMAGES
app.get('/all/images/count', async (_, res: Response) => {
  gfs.files.find({contentType: 'image/jpeg'}).toArray((err, files) =>{
    res.status(200).send({count: files.length})
  })  
});

// GET ALL VIDEOS
app.get('/all/videos', async (_, res: Response) => {
  gfs.files.find({contentType: 'video/mp4'}).sort({uploadDate: -1}).toArray((err, files) =>{
    console.log(files.length);
    res.status(200).send(files)
  })  
});

// GET COUNT ALL VIDEOS
app.get('/all/videos/count', async (_, res: Response) => {
  gfs.files.find({contentType: 'video/mp4'}).toArray((err, files) =>{
    console.log(files.length);
    res.status(200).send({count: files.length})
  })  
});

// GET ALL PDF
app.get('/all/pdf', async (_, res: Response) => {
  gfs.files.find({contentType: 'application/pdf'}).sort({uploadDate: -1}).toArray((err, files) =>{
    res.status(200).send(files)
  })  
});

// GET COUNT ALL PDF
app.get('/all/pdf/count', async (_, res: Response) => {
  gfs.files.find({contentType: 'application/pdf'}).toArray((err, files) =>{
    res.status(200).send({count: files.length})
  })  
});

// GET ALL MUSIC
app.get('/all/music', async (_, res: Response) => {
  gfs.files.find({contentType: 'audio/mpeg'}).sort({uploadDate: -1}).toArray((err, files) =>{
    res.status(200).send(files)
  })  
});

// GET COUNT ALL MUSIC
app.get('/all/music/count', async (_, res: Response) => {
  gfs.files.find({contentType: 'audio/mpeg'}).toArray((err, files)=> {
    res.status(200).send({count: files.length});
  })
});
 
// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (error: Error, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Файл байхгүй байна'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (error: Error, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Файл байхгүй байна'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Зураг олдсонгүй'
      });
    }
  });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/video/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (error: Error, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Файл байхгүй байна'
      });
    }

    // Check if video
    if (file.contentType === 'video/mp4' || file.contentType === 'video/mk4') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Бичлэг олдсонгүй'
      });
    }
  });
});

// @route GET FILES
app.get('/pdf/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (error: Error, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Файл байхгүй байна'
      });
    }

    // Check if video
    if (file.contentType === 'application/pdf') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'PDF олдсонгүй'
      });
    }
  });
});

// get music files
app.get('/music/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (error: Error, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Файл байхгүй байна'
      });
    }

    // Check if video
    if (file.contentType === 'audio/mpeg' ) {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Дуу олдсонгүй'
      });
    }
  });
});



// @route DELETE /files/:id
// @desc  Delete file
app.delete('/delete/:filename', (req, res) => {
  gfs.files.deleteOne({filename: req.params.filename}, (error: Error, file) => {
    if (error) {
      return res.status(404).json({ err: error });
    }
    // TODO check if file is actually deleted
    if(!file || file == null) {
      return res.status(404).json({
        res: 'Файл байхгүй байна'
      })
    } else {
      res.status(200).json({
        res: 'Файл амжилттай устлаа'
      });
    }
    
  });
});
;

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));