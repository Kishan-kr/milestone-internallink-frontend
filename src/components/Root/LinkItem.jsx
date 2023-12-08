import React from 'react'
import { Link } from 'react-router-dom';
import { FaEllipsisVertical } from "react-icons/fa6";
import Dropdown from './Dropdown';

function LinkItem({data, updateSelectedLink, setModalConfig, isAdmin}) {
  const handleUpdate = () => {
    updateSelectedLink(data);
    setModalConfig({
      open: true,
      heading: 'Update link',
      actionButton: 'Update',
      disableCategory: true
    })
  }

  const handleDelete = () => {
    const confirmDeletion = window.confirm('Are you sure?');
    // make delete request 
    console.log('confirm to delete: ', confirmDeletion);
  }

  return (
    <li className="link-item">
      <div className="flex">

        <Link className="link "
          to={data.url} target='_blank'>
          {data.title}
        </Link>

        {isAdmin && <Dropdown toggleButton={<span><FaEllipsisVertical /></span>}>
          <div className='w-max'>
            <ul className="py-2 text-start" role="none">
              <li><button className='update' role="menuitem" tabIndex="-1" onClick={handleUpdate}>Update</button></li>
              <li><button className='delete' role="menuitem" tabIndex="-1" onClick={handleDelete}>Delete</button></li>
            </ul>
          </div>
        </Dropdown>}

      </div>
    </li>
  )
}

export default LinkItem