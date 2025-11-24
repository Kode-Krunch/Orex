import { Card, Input, Button, toast as toastwe } from 'components/ui';
import {
  Postchannelsetting,
  Postchannelsettingdetails,
  Putchannelsetting,
} from 'services/MasterService';
import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Notification from 'components/ui/Notification';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const VideoCard = ({
  channelsetting,
  setChannelsetting,
  setActiveIndex,
  Settings,
  Content,
  setMessage,
}) => {
  let ContinueSave =
    Object.keys(channelsetting).length === 0 ? 'Continue' : 'Save';
  const navigate = useNavigate();

  const [VideoPath1, setVideoPath1] = useState(
    channelsetting.VideoPath1 || Content.VideoPath1 || '',
  );
  const [VideoPath2, setVideoPath2] = useState(
    channelsetting.VideoPath2 || Content.VideoPath2 || '',
  );
  const [VideoPath3, setVideoPath3] = useState(
    channelsetting.VideoPath3 || Content.VideoPath3 || '',
  );
  const [VideoPath4, setVideoPath4] = useState(
    channelsetting.VideoPath4 || Content.VideoPath4 || '',
  );
  const [VideoPath5, setVideoPath5] = useState(
    channelsetting.VideoPath5 || Content.VideoPath5 || '',
  );

  const tokenS = useSelector((state) => state.auth.session.token);

  return (
    <>
      <Card>
        <div className="col-span-4 mb-1">
          <h4>Content Video Path</h4>
          <br />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {[VideoPath1, VideoPath2, VideoPath3, VideoPath4, VideoPath5].map(
            (path, index) => (
              <div className="col-span-2 flex items-center" key={index}>
                {/* {`VideoPath ${index + 1}`} */}
                <div className="w-[150px]">
                  {
                    [
                      'Segment Path',
                      'Commercial Path',
                      'Promo Path',
                      'Song Path',
                      'Others',
                    ][index]
                  }
                </div>
                <Input
                  name={`Content Path ${index + 1}`}
                  size="sm"
                  maxLength="100"
                  className="w-[600px] ml-2"
                  placeholder=""
                  value={path}
                  onChange={(e) => {
                    const setPathFunctions = [
                      setVideoPath1,
                      setVideoPath2,
                      setVideoPath3,
                      setVideoPath4,
                      setVideoPath5,
                    ];
                    setPathFunctions[index](e.target.value);
                  }}
                />
                <Button
                  size="xs"
                  className="ml-2"
                  variant="solid"
                  type="button"
                  icon={<IoIosCheckmarkCircle />}
                >
                  Verify
                </Button>
              </div>
            ),
          )}
        </div>
      </Card>
      <br />
      <div className="flex items-center">
        <Button
          size="sm"
          onClick={() => {
            setActiveIndex(2);
          }}
          className="mr-2"
        >
          Previous
        </Button>
        {Content.ChannelSettingCode ? (
          <Button
            type="button"
            size="sm"
            variant="solid"
            onClick={async () => {
              let res = {
                ...channelsetting,
                VideoPath1,
                VideoPath2,
                VideoPath3,
                VideoPath4,
                VideoPath5,
                IsActive: 1,
              };
              if (!res.ProviderCode) {
                delete res.ProviderCode;
              }
              if (!res.MamCode) {
                delete res.MamCode;
              }
              setChannelsetting(res);
              try {
                const response = await Putchannelsetting(
                  res,
                  tokenS,
                  Content.ChannelSettingCode,
                );
                // if (!response.ok) {
                //   throw new Error(`HTTP error! status: ${response.status}`);
                // }
                toastwe.push(
                  <Notification title={'success'} type={'success'}>
                    Updated Successfully
                  </Notification>,
                );
                const newArray = Settings.map((item) => ({
                  ...item,

                  ChannelSettingCode: Content.ChannelSettingCode,
                }));
                const respt = await Postchannelsettingdetails(newArray, tokenS);
                if (respt.status === 200) {
                  navigate('/ChannelSettingMaster');
                }
              } catch (error) {
                console.error('Error updating data:', error);
              }
            }}
          >
            Update
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="solid"
            onClick={async () => {
              // alert('hello');
              console.log(channelsetting);
              if (Settings.length > 0) {
                let res = {
                  ...channelsetting,
                  VideoPath1,
                  VideoPath2,
                  VideoPath3,
                  VideoPath4,
                  VideoPath5,
                  IsActive: 1,
                };

                if (!res.ProviderCode) {
                  delete res.ProviderCode;
                }
                if (!res.MamCode) {
                  delete res.MamCode;
                }
                setChannelsetting(res);

                try {
                  const resp = await Postchannelsetting(res, tokenS);
                  const newArray = Settings.map((item) => ({
                    ...item,
                    ChannelSettingCode: resp.data.ChannelSettingCode,
                  }));
                  const respdet = await Postchannelsettingdetails(
                    newArray,
                    tokenS,
                  );
                  if (respdet.status === 200) {
                    navigate('/ChannelSettingMaster');
                  } else {
                    setMessage('Data Not Saved!!');
                  }
                } catch (error) {
                  setMessage('Data Not Saved!!');
                }
              } else {
                setActiveIndex(2);
                setMessage('Please add Setting Details..');
              }
            }}
          >
            {ContinueSave}
          </Button>
        )}
      </div>
    </>
  );
};

export default VideoCard;
