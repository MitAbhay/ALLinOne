import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, name, email, comment } = JSON.parse(req.body)
  // console.log(req.body)
  try {
    client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Message failed : Server Error' })
  }
  return res.status(200).json({ message: 'Message added successfully' })
}
