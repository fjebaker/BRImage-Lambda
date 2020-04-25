'use strict';
const { uuid } = require('uuidv4');
const AWS = require('aws-sdk');
const creds = {
  accessKeyId: process.env.Key,
  secretAccessKey : process.env.Sec
};
AWS.config.update({ credentials: creds, region: 'eu-west-1' });
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports.uri = async event => {
  const params = {
    Bucket: process.env.Bucket,
    Key: `${process.env.Folder}/${uuid()}-${event['filename']}`, //unique filename
    Expires: Number(process.env.Expires), //seconds
    ContentType: event['content-type']
  };
  return {
    status: 200,
    filename: event['filename'],
    uri: s3.getSignedUrl('putObject', params)
  };
};
