import React, { useCallback, useState } from 'react'
import sortImage from '../../image/No-Sort.png'
import './Sorting.css'

type SortingType={
  "title": string,
  "locale": string,
  "content_type": string,
  "public_stages": number,
  "modified_at": number | string,
  "version": number,
  "tags": string[],
  "action":string,
  "isCheck": boolean,
  'workflow_Stages'?:string,
  "name":string
}

interface SortingProps{
    entries: SortingType[];
    handleSorted: (sortedEntries: SortingType[]) => void;
}

const Sorting:React.FC<SortingProps> = React.memo(({entries,handleSorted}) => {
    
const [sortOrder,setSortOrder] = useState<string>('asc')

const handleSort = useCallback(() => {
    const sortedEntries = [...entries].sort((a, b) => {
      const compareValue = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    handleSorted(sortedEntries)
  }, [entries, handleSorted, sortOrder]);


  return (
    <div className='sortingContainer'>
        <img src={sortImage} alt='sort'  data-test-id='image' onClick={handleSort}/>
    </div>
  )
})

export default Sorting