const { S3Control } = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const accessKeyId = process.env.CLAVE
const secretAccessKey = process.env.SECRETCLAVE
const region = process.env.REGION
const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

const getbuckets = () => {
    return storage.listBuckets().promise()
}
const uploadToS3 = async (base64String, fileName, bucketName) => {

fs.writeFile('image.jpg', base64String, {encoding: 'base64'}, function(err) {
   if (err) {
       console.error(err);
   } else {
       console.log('Imagen creada');
   }
});

    const imageBuffer = Buffer.from(base64String, 'base64');

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: imageBuffer,
        ContentType: 'image/jpg', // o el tipo de contenido correspondiente a tu imagen
    };
    try {
        const data = await storage.upload(params).promise();
        console.log('Imagen subida con éxito a S3:', data.Location);
        return data.Location;
    } catch (error) {
        console.error('Error al subir la imagen a S3:', error);
        throw error;
    }
};


module.exports = { uploadToS3, getbuckets }