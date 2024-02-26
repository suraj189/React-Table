import React, { useCallback, useRef, useState ,useEffect } from 'react';
import Entries from '../entries.json';
import Pagination from '../Component/Pagination/Pagination';
import Sorting from '../Component/Sorting/Sorting'
import Filter from '../Component/Filter/Filter'
import ActionBar from '../Component/ActionBar/ActionBar'
import ActionIcon from '../image/action.png'
import InfoIcon from '../image/informationCircle.png'
import './Table.css';

type entriesData = {
  "title": string,
  "locale": string,
  "content_type": string,
  "public_stages": number,
  "modified_at": number | string,
  "version": number,
  "tags": string[],
  "action": string,
  "isCheck": boolean,
  "workflow_Stages"?: string,
  "name": string
}

const Table: React.FC = () => {
  const [columnHeadings,] = useState<string[]>([
    "title",
    "locale",
    "content_type",
    "version",
    "public_stages",
    "workflow_Stages",
    "modified_at",
    "tags",
    "action",
  ]);
  const [entries, setEntries] = useState<entriesData[]>(Entries);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const [isActionOpen, setisActionOpen] = useState<boolean | number>(false);
  const [currentEntries, setcurrentEntries] = useState<entriesData[]>([])
  const [heading,setHeading] =useState<string>('')
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        handleOutsideClick();
      }
    };

    const handleOutsideClick = () => {
      if(!isActionOpen){
        setisActionOpen(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleMouseDown = useCallback((e: any, heading: string) => {//logic for resizinig the row
    const colHeading = e.target.parentNode;
    const startX = e.pageX;
    const startWidth = colHeading.offsetWidth;
    const tableWidth = colHeading.closest('table')?.offsetWidth || window.innerWidth;
    const minWidth = 200;
    const maxWidthPercentage = 0.8;
    const maxWidth = Math.floor(tableWidth * maxWidthPercentage);

    const mouseMoveHandler = (e: any) => {
      let width = startWidth + e.pageX - startX;

      // Enforce minimum and maximum width limits
      width = Math.max(minWidth, Math.min(maxWidth, width));

      colHeading.style.minWidth = `${width}px`;
       
      let rows = document.getElementsByClassName(heading) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < rows.length; i++) {
        rows[i].style.minWidth = `${width}px`;
      }
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }, []);


  const handleCheck = useCallback(() => {
    const updatedData = entries.map(item => ({
      ...item,
      isCheck: !item.isCheck,
    }));
    setEntries(updatedData);
    setCheckedState(!checkedState);
  }, [entries, checkedState, setEntries, setCheckedState]);


  const handleEntriesPerPageChange = useCallback((entriesPerPage: number) => {//for changing the entries
    const entrieCell=document.getElementsByClassName('entriesCell') as HTMLCollectionOf<HTMLElement>
    const colHeading = document.getElementsByClassName('colHeading') as HTMLCollectionOf<HTMLElement>
    for (let i = 0; i < colHeading.length; i++) {
      colHeading[i].style.minWidth = `${200}px`;
    }
    for (let i = 0; i < entrieCell.length; i++) {
      entrieCell[i].style.minWidth = `${200}px`;
    }
    // entrieCell[0].style.minWidth=`200px`
    setEntriesPerPage(entriesPerPage);
    setCurrentPage(1);
    const indexOfLastEntry = 1 * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
    setcurrentEntries(currentEntries)
  }, [entries]);

  const handleSorted = useCallback((sortedEntries: entriesData[]) => {
    setEntries(sortedEntries)
  }, [])

  const handleOpen = useCallback((index: number) => {
    if (index === isActionOpen) {
      setisActionOpen(false)
    } else {
      setisActionOpen(index)
    }
  },[isActionOpen])

  const handlePagechange = useCallback((currentPage: number, entriesPerPage: number) => {
    setCurrentPage(currentPage)
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
    setcurrentEntries(currentEntries)
  },[entries])

  return (
    <main className='entriesTable'>
      <div className='tablePanel' />
      <div className='tableContainer' data-testid='table' role='table'>
        <div className='tableHeadContainer'>
          <div className='tableHead'>
            <div className='row'>
              {columnHeadings?.length > 0 && columnHeadings?.map((heading, index) => (
                heading === 'isCheck' ? <></> :
                  <div className={heading === 'action' ? ` actionColumn colHeading ${heading}` : ` ${heading} colHeading`} key={heading} data-testid={heading}>
                    <div className="resizer" onMouseDown={(e) => handleMouseDown(e, heading)} />
                    {heading === 'title' && <div className="checkbox-container">
                      <input type="checkbox" data-testid='checkbox' className="checkbox-input" checked={checkedState} onChange={handleCheck} />
                      <div className="checkbox-custom"></div>
                    </div>}
                    {heading !== 'isCheck' && heading.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    {heading === 'title' && <Sorting entries={entries} handleSorted={handleSorted}  data-testid="sorting-component"/>}
                    <Filter data-testid="filter-component" />
                  </div>
              ))}
            </div>
          </div>
        </div>
        <div className='tableBodyContainer'>
          <div className='tableBody'>
            {currentEntries&&currentEntries?.length>0?
            currentEntries && currentEntries?.map((item, index) => (
              <div  key={index} className='row'>
                <div className={`entriesCell  title`}>
                  <p className='value'>
                    <div className="checkbox-container">
                      <input type="checkbox" className="checkbox-input" checked={item.isCheck} />
                      <div className="checkbox-custom"></div>
                    </div>
                    <span>{item.title}</span></p></div>
                <div className={`entriesCell  locale`}><p className='value'>{item?.locale}</p></div>
                <div className={`entriesCell  content_type`}><p className='value'>{item?.content_type}</p></div>
                <div className={`entriesCell  version`}><p className='value'>{item?.version}</p></div>
                <div className={`entriesCell  public_stages`}><p className='value'>{item?.public_stages} Environments <img className='info' src={InfoIcon} alt='info' /></p></div>
                <div className={`entriesCell  workflow_Stages`}><p className='value'> <div className='circleicon' /> {item?.workflow_Stages}</p></div>
                <div className={`entriesCell  modified_at`}><p className='value'>{item?.modified_at} <br /> <span className='name'>{item?.name}</span> </p></div>
                <div className={`entriesCell  tag`}><p className='value'>{item.tags?.length} Tags <img className='info' src={InfoIcon} alt='info' /></p></div>
                <div className={`entriesCell  actionColumn  action`}>
                  <div className='actionCell'>
                    <img src={ActionIcon} alt='Action' className='actionIcon' onClick={() => handleOpen(index)} />
                    {isActionOpen === index && <div className='actionMenu' ref={divRef}>
                      <ActionBar  />
                    </div>}
                  </div>
                </div>
              </div>
            )):<div className='noEntries'>No Entries Found</div>}
          </div>
        </div>
      </div>

      <Pagination
        length={entries?.length}
        currentPage={currentPage}
        totalPages={Math.ceil(entries?.length / entriesPerPage)}
        onEntriesPerPageChange={handleEntriesPerPageChange}
        handlePagechange={handlePagechange}
      />
    </main >
  );
};

export default Table;
