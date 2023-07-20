'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  id: string
  image: string
  title: string
  name: string
  avatarUrl: string
  userId: string
}

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
  const [randomLikes, setRandomLikes] = useState<number>(0)
  const [randomViews, setRandomViews] = useState<string>('')

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 1000))
    setRandomViews(
      String(Math.floor((Math.random() * 10000) / 1000).toFixed(1) + 'k')
    )
  }, [])

  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
      <Link
        href={`/project/${id}`}
        className='flexCenter group relative w-full h-full'
      >
        <Image
          src={image}
          width={414}
          height={314}
          alt={title}
          className='w-full h-full object-cover rounded-2xl'
        />
        <div className='hidden group-hover:flex profile_card-title'>
          <p className='w-full'>{title}</p>
        </div>
      </Link>

      <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
        {/* Avatar */}
        <Link href={`/profile/${userId}`}>
          <div className='flexCenter gap-2'>
            <Image
              src={avatarUrl}
              width={24}
              className='rounded-full'
              height={24}
              alt='User Avatar'
            />
            <p>{name}</p>
          </div>
        </Link>

        {/* Icon */}
        <div className='flexCenter gap-3'>
          <div className='flexCenter gap-2'>
            <Image src='/hearth.svg' width={13} height={12} alt='Like' />
            <p className='text-sm'>{randomLikes}</p>
          </div>
          <div className='flexCenter gap-2'>
            <Image src='/eye.svg' width={13} height={12} alt='See' />
            <p className='text-sm'>{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
