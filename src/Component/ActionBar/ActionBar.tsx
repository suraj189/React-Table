import React, { Fragment } from 'react'
import DeleteIcon from '../../image/Trash.png'
import EditIcon from '../../image/edit.png'
import PublisIcon from '../../image/ThumbsUp.png'
import UnpulishIcon from '../../image/ThumbsDown.png'
import CloneIcon from '../../image/Copy.png'
import AddtoreleaseIcon from '../../image/Plug.png'
import './ActionBar.css'

const ActionBar: React.FC = () => {
    return (
        <Fragment>
            <div className='actiontype edit' role='button' data-test-id='edit'>
                <img src={EditIcon} alt='edit' aria-label='Edit' />
                <span>Edit</span>
            </div>
            <div className='actiontype delete' role='button' data-test-id='delete' >
                 <img src={DeleteIcon} alt='delete' aria-label='Delete' />
                 <span>Delete</span>
            </div>
            <div className='actiontype clone' role='button' data-test-id='clone'> 
                <img src={CloneIcon} alt='clone' aria-label='Clone' />
                <span>Clone</span>
            </div>
            <div className='actiontype publish' role='button' data-test-id='publish'> 
                <img src={PublisIcon} alt='publish' aria-label='Publish' />
                <span>Publish</span>
            </div>
            <div className='actiontype unpublish' role='button' data-test-id='unPulish'>
                 <img src={UnpulishIcon} alt='unpublish' aria-label='Un_Publish' />
                 <span>Unpublish</span>
            </div>
            <div className='actiontype addtoRelease' role='button' data-test-id='release'>
                 <img src={AddtoreleaseIcon} alt='addtorelease' aria-label='Relase' />
                 <span>Add to Release</span>
            </div>
        </Fragment>
    )
}

export default ActionBar