import { Dialog, Progress } from 'components/ui';
import React, { useEffect, useRef } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import anime from 'animejs';

function UploadingLoaderDialog({ isOpen, title, uploadPercent }) {
  /* HOOKS */
  const uploadIconRef = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      const uploadIconAnimation = anime({
        translateY: -20,
        duration: 1000,
        targets: uploadIconRef.current.querySelector('svg'),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        color: ['rgb(75 85 99)', 'rgb(94 234 212)'],
      });

      return () => uploadIconAnimation.pause();
    } catch (error) {
      console.error(error);
    }
  }, [uploadIconRef.current]);

  return (
    <Dialog closable={false} isOpen={isOpen}>
      <h5>{title}</h5>
      <div className="h-56 flex items-center justify-center">
        <Progress
          variant="circle"
          percent={uploadPercent}
          width={170}
          className="flex items-center justify-center"
          customInfo={
            <div className="flex flex-col items-center justify-center">
              <div ref={uploadIconRef}>
                <MdOutlineCloudUpload className="text-gray-400 text-5xl" />
              </div>
              <h4>{uploadPercent}%</h4>
              <span>completion</span>
            </div>
          }
        />
      </div>
    </Dialog>
  );
}

export default UploadingLoaderDialog;
