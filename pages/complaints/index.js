import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/reset.css';

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements, 
  RefinementList,
  Configure,
  Menu,
  MenuSelect
} from 'react-instantsearch-dom'

const searchClient = algoliasearch(
  'MUM7JXG8NH',
  '368b81ac1505a0bf2f461971d6f208ba',
)

const Index = () => {
  // document.querySelector(".ais-SearchBox-input").placeholder = "Seach for a complaint...";
  function Hit(props) {
    console.log(props)
    const { complaint_title, complaint_desc } = props.hit
    return (
      <div>
        <h1 className="text-3xl">{complaint_title}</h1>
        <p>{complaint_desc}</p>
      </div>
    )
  }

  return (
    <div className='md:ml-60 p-4'>
      <InstantSearch indexName="dev_CARTOONS" searchClient={searchClient}>
          <SearchBox defaultRefinement="" />
            <div className="flex gap-4">
              <div className='flex-1' >
                <Hits hitComponent={Hit} />
                <Configure hitsPerPage={4} />
              </div>
                <div className='flex-1'>
                  <MenuSelect attribute="complaint_type_name" />
                  
                </div>
            </div>

            
      </InstantSearch>
    </div>
  )
}

export default Index
