import { formatDate } from '@/app/util'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function StartupCard({ post }: { post: StartupCardType }) {
  const { _createAt, views, author: { _id: authorId, name }, _id, description, image, category, title } = post
  return (
    <li className='startup-card group '>
      <div className='flex-between'>
        <p className='startup_card_date '>
          {formatDate(_createAt)}
        </p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${authorId}`} >
            <p className='text-16-medium link-clamp-1'>{name}</p>
          </Link>
          <Link href={`/startup/${_id}`} >
            <h3 className='text-26-semibold link-clamp-1'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`} >
          <Image src="https://placehold.co/48x48" width={48} height={48} className='rounded-full' alt='placeholder' />
        </Link>
      </div>
      <Link href={`/startup/${_id}`} >
        <p className='startup-card_desc'>{description}</p>
        <img src={image} alt="placeholder" className='startup-card_img' />
      </Link>
      <div className='flex-between mt-5 gap-3'>
        <Link href={`/?query/${category.toLowerCase()}`} >
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}
