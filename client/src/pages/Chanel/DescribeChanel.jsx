import React from 'react'
import { FaEdit, FaUpload } from 'react-icons/fa'
import './DescribeChanel.css'
import { useSelector } from 'react-redux'

const DescribeChanel = ({setEditCreateChannel, Cid, setVideoUploadPage}) => {

  const chanels = useSelector(state => state?.chanelReducers)
  const currentChanel = chanels.filter(c=> c._id === Cid)[0];

  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  return (
    <div className='container3_chanel' >
      <div className="chanel_logo_chanel">
        <b>
            {currentChanel?.name.charAt(0).toUpperCase()}
        </b>
      </div>
      <div className="description_chanel">
        <b>{currentChanel?.name}</b>
        <p>{currentChanel?.desc}</p>
      </div>
      {
        CurrentUser?.result._id === currentChanel?._id && (
          <>

      <p className="editbtn_chanel" onClick={() => setEditCreateChannel(true)} >
        <FaEdit />
        <b>Edit channel</b>
      </p>
      <p className="uploadbtn_chanel" onClick={()=>setVideoUploadPage(true)}>
        <FaUpload />
        <b>Upload Video</b>
      </p>
          </>
        )
      }
    </div>
  )
}

export default DescribeChanel
