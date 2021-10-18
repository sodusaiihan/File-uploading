// import mongoose from 'mongoose';
// import { MONGOURI } from './constants'
// import GridFS from 'gridfs-stream';

// const getFileByName = (req, res) => {
//   const connection = mongoose.createConnection(MONGOURI);
  
//   connection.once('open', () => {
//     const gfs: GridFS.Grid = GridFS(connection.db, mongoose.mongo);
//     gfs.collection('uploads');

//     gfs.files.find({}, (err, file) => {
//       console.log(file)
//       if (!file || file.length === 0) {
//         return res.sendStatus(404);
//       }

//       if (file.contentType === 'video/mp4' || file.contentType === 'video/mk4') {
//         const stream = gfs.createReadStream({_id: file._id});
//         stream.pipe(res);
//       } else {
//         res.sendStatus(400);
//       }
//     });
//   });
// }

// export default getFileByName