#!/usr/bin/env bash

# Script to deploy branch to production
BUCKET=lightrainair.co.za
SOURCE_DIR=public/


# echo "Building production"
# if npm run build ; then
#    echo "Build Successful"
# else
#   echo "exiting.."
#   exit 1
# fi


echo "Removing all files on bucket"
aws s3 rm s3://${BUCKET} --region af-south-1  --profile amplifygatsby --recursive


echo "Attempting to upload site .."
echo "Command:  aws s3  sync $SOURCE_DIR s3://$BUCKET/"
aws s3 sync ${SOURCE_DIR} s3://${BUCKET}/ --region af-south-1  --profile amplifygatsby
echo "S3 Upload complete"

echo "Invalidating cloudfrond distribution to get fresh cache"

aws cloudfront create-invalidation --distribution-id=E33VBQVCMX412G --paths "/*" --profile amplifygatsby

echo "Deployment complete"
