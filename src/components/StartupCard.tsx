import { formatDate } from '@/app/util'
import React from 'react'

export default function StartupCard({post}: {post: StartupCardType}) {
  return (
   <li className='startup-card group '>
    <div className='flex-between'>
        <p className='startup_card_date '>
            {formatDate(post._createAt)}
        </p>
    </div>

   </li>
  )
}
