import { Avatar, Button, Card, Tooltip } from 'components/ui';
import React, { memo, useRef } from 'react';
import { eventTypesEnum } from '../enum';
import { RiDeleteBinLine, RiInfinityFill } from 'react-icons/ri';
import { format } from 'date-fns';
import { HiOutlinePencil } from 'react-icons/hi';
import { IoImageOutline } from 'react-icons/io5';

function Day({ active, day, isFirst, isLast }) {
  return (
    <p
      className={`text-xs font-semibold text-white py-1 border-r border-x-gray-600 flex items-center justify-center ${active ? 'bg-teal-900' : ''
        } ${isFirst ? 'rounded-l-md' : ''} ${isLast ? 'rounded-r-md border-none' : ''
        }`}
    >
      {day}
    </p>
  );
}

function LicensedContentsCard({
  imageWidth,
  content,
  index,
  setLicensedContSelRowIds,
  openBulkEditDialog,
  originalContentsReponse,
  setNewContents,
  setLicensedContents,
  selectedCurrency,
  getContentById
}) {
  /* HOOKS */
  const licensedContentCardRef = useRef(null);

  /* CONSTANTS */
  const licensedContentCardHeight = licensedContentCardRef.current
    ? licensedContentCardRef.current.clientHeight
    : 'max-content';

  /* EVENT HANDLERS */
  const handleDelete = (clickedContent) => {
    setNewContents((prev) => {
      return [
        ...prev,
        {
          ...originalContentsReponse.filter(
            (originalContent) =>
              originalContent.ContentCode === clickedContent.ContentCode,
          )[0],
          ContentContractDetailID: null,
        },
      ];
    });
    setLicensedContents((prev) => {
      return prev.filter(
        (content) => content.ContentCode !== clickedContent.ContentCode,
      );
    });
  };

  return (
    <Card className="h-max" bodyClass="p-0 flex" ref={licensedContentCardRef}>
      <div className="grow pt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-1 px-3">
          <div className="flex gap-2 grow">
            {content.EventType === eventTypesEnum.MOVIE ? (
              <Tooltip title="Movie">
                <Avatar shape="circle" className="text-lg">
                  M
                </Avatar>
              </Tooltip>
            ) : content.EventType === eventTypesEnum.CONTENT ? (
              <Tooltip title="Content">
                <Avatar shape="circle" className="text-lg">
                  WS
                </Avatar>
              </Tooltip>
            ) : (
              <Tooltip title="Song">
                <Avatar shape="circle" className="text-lg">
                  S
                </Avatar>
              </Tooltip>
            )}
            <div className="grow">
              <div className="flex items-center justify-between gap-2">
                <p className="text-white font-semibold grow overflow-hidden text-ellipsis whitespace-nowrap">
                  {content.ContentName}
                </p>
              </div>
              <Tooltip title="Contract Duration">
                <p className="text-gray-400 text-xs font-semibold">
                  {format(content.ContractStartDate, 'dd-MMM-yyyy')} to{' '}
                  {format(content.ContractEndDate, 'dd-MMM-yyyy')}
                </p>
              </Tooltip>
            </div>
            <span className="text-white font-semibold text-lg">
              {selectedCurrency.CurrencySymbol} {content.ProgCost}
            </span>
          </div>
        </div>
        <div className="flex justify-between gap-2 py-2 border-y border-y-gray-700 px-3">
          {content.EventType === eventTypesEnum.CONTENT ? (
            <>
              <div className="flex flex-col justify-center items-center text-xs">
                <span className="text-gray-400 font-semibold">Season</span>
                <span className="text-white font-semibold">
                  {content.Season ? content.Season.label : '-'}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-xs">
                <span className="text-gray-400 font-semibold">Start EP</span>
                <span className="text-white font-semibold">
                  {content.StartEpisode ? content.StartEpisode.label : '-'}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-xs">
                <span className="text-gray-400 font-semibold">End EP</span>
                <span className="text-white font-semibold">
                  {content.EndEpisode ? content.EndEpisode.label : '-'}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center text-xs">
                <span className="text-gray-400">S Time</span>
                <span className="text-white font-semibold">
                  {content.BroadcastStartTime
                    ? format(content.BroadcastStartTime, 'HH:mm')
                    : null}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-xs">
                <span className="text-gray-400">E Time</span>
                <span className="text-white font-semibold">
                  {content.BroadcastEndTime
                    ? format(content.BroadcastEndTime, 'HH:mm')
                    : null}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-xs">
                <span className="text-gray-400">Total Runs</span>
                <span className="text-white font-semibold">
                  {content.UnlimitedRuns ? (
                    <Tooltip title="Unlimited Runs">
                      <RiInfinityFill className="text-base text-white" />
                    </Tooltip>
                  ) : (
                    2
                  )}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-xs">
                <span className="text-gray-400">Used</span>
                <span className="text-white font-semibold">
                  {content.UnlimitedRuns ? (
                    <Tooltip title="Unlimited Runs">
                      <RiInfinityFill className="text-base text-white" />
                    </Tooltip>
                  ) : (
                    content.TotalOrignalRun
                  )}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-xs">
                <span className="text-gray-400">Balanced</span>
                <span className="text-white font-semibold">
                  {content.UnlimitedRuns ? (
                    <Tooltip title="Unlimited Runs">
                      <RiInfinityFill className="text-base text-white" />
                    </Tooltip>
                  ) : (
                    content.TotalOrignalRun
                  )}
                </span>
              </div>
            </>
          )}
        </div>
        <Tooltip title="Active Days" wrapperClass="block px-3 py-1">
          <div className="grid grid-cols-7 border border-gray-600 rounded-md">
            <Day active={content.SUN} day="S" isFirst={true} />
            <Day active={content.MON} day="M" />
            <Day active={content.TUE} day="T" />
            <Day active={content.WED} day="W" />
            <Day active={content.THU} day="T" />
            <Day active={content.FRI} day="F" />
            <Day active={content.SAT} day="S" isLast={true} />
          </div>
        </Tooltip>
        <div className="grid grid-cols-2">
          <Button
            shape="none"
            icon={<HiOutlinePencil className="text-[0.9rem]" />}
            size="sm"
            className={`!rounded-bl-lg !border-r !border-r-gray-600 ${content.IsContentUsed && 'col-span-2'
              }`}
            onClick={() => {
              setLicensedContSelRowIds({ [index]: true });
              openBulkEditDialog();
            }}
          >
            Edit
          </Button>
          {!content.IsContentUsed && (
            <Button
              shape="none"
              icon={<RiDeleteBinLine className="text-[0.9rem]" />}
              size="sm"
              onClick={() => handleDelete(content)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
      {!content.Content_Image.includes('No_Image_Available') ? (
        <div
          style={{
            width: imageWidth,
            backgroundImage: `url(${content.Content_Image})`,
            backgroundSize: 'cover', // Ensures the image covers the div without stretching
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat',
          }}
          className="rounded-r-lg"
          onClick={() => getContentById(content.ContentCode)}
        ></div>
      ) : (
        <div
          style={{
            width: imageWidth,
            height: licensedContentCardHeight,
          }}
          className="rounded-r-lg flex flex-col justify-center items-center gap-2 border-l border-l-gray-700"
        >
          <IoImageOutline className="text-2xl" />
          <p className="text-[0.825rem]">No Image Found</p>
        </div>
      )}
    </Card>
  );
}

export default memo(LicensedContentsCard);
