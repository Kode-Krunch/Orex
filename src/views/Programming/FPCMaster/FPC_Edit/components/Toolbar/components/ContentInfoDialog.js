import { Avatar, Dialog } from 'components/ui';
import React, { useState } from 'react';
import VideoPlayer from 'views/Programming/ContentMaster/VideoPlayer';

function ContentInfoDialog({ isDialogOpen, setIsDialogOpen, contentInfo }) {
  const [videoShow, setvideoShow] = useState();
  return (
    <Dialog
      isOpen={isDialogOpen}
      width={1000}
      onClose={() => setIsDialogOpen(false)}
      onRequestClose={() => setIsDialogOpen(false)}
    >
      <div className="w-full h-full grid grid-cols-2 gap-1">
        <div>
          <div className="flex items-center mt-5">
            <Avatar size="sm" src="FAV.png" />
            <h6
              className="ml-2 "
              style={{ letterSpacing: 6, color: 'rgb(127, 132, 138)' }}
            >
              {contentInfo.ContentType?.ContentTypeName}
            </h6>
          </div>
          <h1 className="mt-10 font-outfit  font-medium ">
            {contentInfo?.ContentName}
          </h1>
          <div className="flex mt-5 ml-1">
            <h6 className="mr-1">
              {Math.floor(contentInfo?.SlotDuration / 60)}Hr
            </h6>
            <h6>{contentInfo?.SlotDuration % 60}Min</h6>
          </div>
          <h3 className=" mt-5 mb-2 font-outfit font-extrabold">Type</h3>
          <div className="flex ">
            <div
              style={{
                height: 30,
                border: '1px solid #f6e6e61a',
                display: 'flex',
                alignItems: 'center',
                padding: '18px 25px',
                background: '#00000029',
                color: 'white',
              }}
            >
              {contentInfo.View?.ViewName}
            </div>
          </div>
          <h3 className=" mt-5 mb-2 font-outfit font-extrabold">Genre</h3>
          <div className="flex">
            <p
              className=" font-outfit  font-medium mr-2"
              style={{
                height: 30,
                border: '1px solid #f6e6e61a',
                display: 'flex',
                alignItems: 'center',
                padding: '18px 25px',
                background: '#00000029',
                color: 'white',
              }}
            >
              {contentInfo.GenreMaster?.GenreName}
            </p>
            <p
              className=" font-outfit  font-medium"
              style={{
                height: 30,
                border: '1px solid #f6e6e61a',
                display: 'flex',
                alignItems: 'center',
                padding: '18px 25px',
                background: '#00000029',
                color: 'white',
              }}
            >
              {contentInfo.SubGenreMaster?.SubGenreName}
            </p>
          </div>
          {/* <Tooltip title="Play Video">
                  <FaPlayCircle
                    className="text-4xl cursor-pointer hover:text-sky-700"
                    onClick={() => setvideoShow(true)}
                  />
                </Tooltip> */}
          <h3 className="mt-7 font-outfit font-extrabold"> Synopsis</h3>
          <h6 className="mt-2 font-outfit  font-medium">
            {contentInfo?.Synopsis}
          </h6>
        </div>
        <div className="flex justify-center items-center">
          {videoShow ? (
            <VideoPlayer link={contentInfo?.MetaData} />
          ) : contentInfo.Content_Image ? (
            <img
              src={contentInfo?.Content_Image}
              style={{
                height: 300,
                width: 300,
              }} // Handle click event to open dialog
            />
          ) : (
            <img
              src={'/img/3204121.jpg'}
              style={{
                height: 300,
                width: 300,
              }} // Handle click event to open dialog
            />
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default ContentInfoDialog;
