
import React from 'react'
import SearchForm from '@/components/SearchForm'
import StartupCard, { StartupCardType } from '@/components/StartupCard'
import { client } from '@/sanity/lib/client'
import { STARTUPS_QUERY } from '@/sanity/lib/queries'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { auth } from '@/auth'

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query
  const params = { search: query || null }
  const session = await auth();
  console.log(session?.id);
  
  // const posts = await client.fetch(STARTUPS_QUERY)
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY ,params})

  return (
    <>
      <section className='pink_container pattern'>
        <h1 className='heading'>Pitch Your Startup,<br />Connect With Entreprenurs</h1>
        <p className='sub-heading !max-w-3xl'>Submit Ideas,Vote on Pitches,and Get Noticed in Virtual Commpetions.</p>
        <SearchForm query={query} />
      </section>
      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>
        <ul className='mt-7 card_grid'>
          {
            posts?.length > 0 ? (
              posts.map((post: StartupCardType, index: number) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (
              <p className='no-results'>no startups found</p>
            )
          }
        </ul>
      </section>
      <SanityLive />
    </>
  )
}
