import Amplify from 'aws-amplify'
import Storage from './storage'

Amplify.configure({
  Auth: {
    identityPoolId: process.env.AWS_POOL_ID,
    region: process.env.AWS_POOL_REGION
  },
  Storage: {
    bucket: process.env.AWS_STORAGE_BUCKET,
    region: process.env.AWS_STORAGE_REGION
  }
})

const customPrefix = {
  public: ''
}

const getFileExtension = (name: string) => name.split('.').reverse()[0]

export const uploadImageToS3 = (file: File, name?: string) =>
  Storage.put(name ? `${name}.${getFileExtension(file.name)}` : file.name, file, {
    contentType: file.type,
    customPrefix,
    acl: 'public-read'
  })
    .then(res => `${process.env.AWS_STORAGE_URL}/${res.key}`)
    .catch(err => {
      console.log(err)
      return false
    })

export const uploadImagesToS3 = (files: File[], name: string) =>
  Promise.all(files.map((file, index: number) => uploadImageToS3(file, `${name}-${index}`))).then(
    results => {
      if (results.includes(false)) {
        // Add toast notification
        return false
      }
      return results as string[]
    }
  )
