
import React from 'react'
import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/StartupCard'
// interface StartupCardType {
//   _createAt: string;
//   views: number;    
//   author: {
//     _id: number;
//   }
//   _id: number;
//   description: string;
//   image: string;
//   category: string;
//   title: string;
// }
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query

  const posts = [{
    _createAt: new Date(),
    views: 55,
    author: { _id: 1 },
    _id: 1,
    description: "this is a description",
    image:"",
    category:"Robots",
    title:"we robots"
  }]
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
              posts.map((post:StartupCardType,index:number)=>(
                <StartupCard key={post?._id} post={post}/>
              ))
            ):(
              <p className='no-results'>no startups found</p>
            )
          }
        </ul>
      </section>

    </>
  )
}
