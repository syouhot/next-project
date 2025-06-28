import React from 'react'
import Form  from 'next/form';
import SearchFormReset from '@/components/SearchFormReset';
import { Search } from 'lucide-react';

export default function SearchForm({query}: {query?: string}) {

  return (
    <Form action="/" scroll={false} className='search-form'>
        <input type="text" name="query" defaultValue={query} className='search-input' placeholder='search start' />
        <div className='flex gap-2'>
            {
                query && (
                   <SearchFormReset/> 
                )
            }
            <button type='submit' className='search-btn'>
                <Search className='size-5'/>
            </button>
        </div>
    </Form>
  )
}
