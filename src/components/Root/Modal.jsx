import React, { useEffect, useState } from 'react';
import '../../styles/ModalStyle.css'

const Modal = (props) => {
  const { isOpen, onClose, disableCategory, heading, action, actionButton, selectedLink, updateSelectedLink } = props
  const [linkItem, setLinkItem] = useState(selectedLink);

  const handleOnChange = (e) => {
    let {name, value} = e.target;
    setLinkItem({...linkItem, [name]: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // update the selectedLink first 
    updateSelectedLink(linkItem);
    // Handle the submission logic here
    console.log({ selectedLink });
    onClose(); // Close the modal after submission
  };

  useEffect(() => {
    setLinkItem(selectedLink);
  
  }, [selectedLink])
  

  
  if (!isOpen) return null;

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <div className="modal-content">
        <h2>{heading}</h2>
        <div className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Title"
            name='title'
            value={linkItem.title}
            onChange={handleOnChange}
          />
          <input
            type="url"
            placeholder="URL"
            name='url'
            value={linkItem.url}
            onChange={handleOnChange}
          />
          <select value={linkItem.category} name='category' onChange={handleOnChange} disabled={disableCategory}>
            <option value="">Select Category</option>
            {/* Add options here */}
            <option value="mutual-fund">Mutual Fund</option>
            <option value="basic-forms">Basic Forms</option>
            <option value="most-common-links">Most Common Links</option>
          </select>
        </div>
        <div className="flex content-end my-3 gap-x-2">
        <button onClick={onClose} className='close'>Close</button>
        <button type='submit' className='add'>{actionButton}</button>

        </div>
      </div>
    </form>
  );
};

export default Modal;
