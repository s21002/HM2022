const { S3, ListObjectsCommand } = require('@aws-sdk/client-s3')
const size = require('../model/file')

module.exports = function loadfile(req, res, next) {
  const client = new S3()
  const files = []
  client.send(new ListObjectsCommand({ Bucket: 'images-s21002' }))
  .then(data =>
    data.Contents.forEach(o => {
      files.push({Key:o.Key,Size:size(o.Size)})
    })
  )
  .then(function (result){
    res.locals.file = files
    next()
  })
}
