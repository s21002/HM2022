const { S3, GetObjectCommand } = require('@aws-sdk/client-s3')

module.exports = function download(req, res) {
  const client = new S3()

  client.send(new GetObjectCommand({ Bucket: 'images-s21002', Key: req.query.name }))
    .then(data => {
      res.attachment(req.query.name)
      data.Body.pipe(res)
    })
}