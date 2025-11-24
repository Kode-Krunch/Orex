import { mdiSync } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Card, Tooltip } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { MdOutlineSync } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {
  apiGetRatingcompanymaster,
  apicontentGEtrates,
  apicontenteRATE,
  apicontentupdaterates,
} from 'services/ProgrammingService';
import {
  abbreviateNumberE,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';

const Rating = () => {
  const [Rating, setRating] = useState([]);
  const [contentratings, setcontentratings] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [averageRating, setaverageRating] = useState(false);
  const { Content } = useSelector((state) => state.base.common);
  useEffect(() => {
    const filteredRatings = contentratings.filter(
      (item) => item.OutofRatingScale === 10 && item.Rating !== 0,
    );

    const sumOfRatings = filteredRatings.reduce(
      (acc, curr) => acc + curr.Rating,
      0,
    );
    const averageRating =
      filteredRatings.length > 0 ? sumOfRatings / filteredRatings.length : 0; // Handle division by zero
    const roundedAverage = Number(averageRating.toFixed(1));

    setaverageRating(roundedAverage);
  }, [contentratings]);

  const GetAPi = async (item, i) => {
    setShowLoader(true);
    try {
      // Check if the rating already exists
      const find = contentratings.some(
        (iteme) =>
          iteme.RatingCompanyCode === item.RatingCompanyCode &&
          iteme.Rating === i.Rating,
      );
      if (find) {
        openNotification('warning', 'Ratings have been already updated.');
        setShowLoader(false);
        return;
      }
      const resp = await apicontentGEtrates(Content.ContentName);
      setShowLoader(false);
      if (resp.data?.Response === 'False') {
        openNotification('danger', resp.data?.Error);
        return;
      }
      const rottenTomatoesRating = resp.data?.Ratings.find(
        (rating) =>
          rating.Source === item.RatingCompanyName ||
          item.RatingCompanyCode === 2,
      );
      if (!rottenTomatoesRating) {
        openNotification('danger', `${item.RatingCompanyName} Data Not Found`);
        return;
      }
      let newRating;
      switch (item.RatingCompanyCode) {
        case 2:
          newRating = {
            ContentCode: Content.ContentCode,
            RatingCompanyCode: item.RatingCompanyCode,
            Rating: parseFloat(rottenTomatoesRating.Value.split('/')[0]),
            OutofRatingScale: 10,
            TotalVoters: parseInt(resp.data?.imdbVotes.replace(/,/g, ''), 10),
          };
          break;
        case 3:
          newRating = {
            ContentCode: Content.ContentCode,
            RatingCompanyCode: item.RatingCompanyCode,
            Rating: Number((parseFloat(rottenTomatoesRating.Value) * 10) / 100),
            OutofRatingScale: 10,
            TotalVoters: parseInt(resp.data?.imdbVotes.replace(/,/g, ''), 10),
          };
          break;
        case 4:
          newRating = {
            ContentCode: Content.ContentCode,
            RatingCompanyCode: item.RatingCompanyCode,
            Rating: rottenTomatoesRating,
            OutofRatingScale: 10,
            TotalVoters: parseInt(resp.data?.imdbVotes.replace(/,/g, ''), 10),
          };
          break;
        default:
          console.log('Unknown source:', item.RatingCompanyName);
          return;
      }
      setcontentratings([...contentratings, newRating]);
      const updateResp = await apicontentupdaterates([
        ...contentratings,
        newRating,
      ]);
      if (updateResp.status === 200) {
        openNotification('success', `${item.RatingCompanyName} Data Added!`);
      } else {
        console.error('Error In Updating Ratings:', updateResp.data);
        openNotification('danger', 'Error In Updating Ratings');
      }
    } catch (error) {
      // console.error('Error in GetAPi function:', error);
      openNotification('danger', 'Error occurred while processing');
    } finally {
      setShowLoader(false); // Ensure loader is hidden after processing
    }
  };

  useEffect(() => {
    (async (values) => {
      try {
        const resp = await apicontenteRATE(Content.ContentCode);
        if (resp.status == 200) {
          const Da = resp.data?.map((resp) => ({
            ContentCode: Content.ContentCode,
            RatingCompanyCode: resp.RatingCompanyMaster.RatingCompanyCode,
            Rating: resp?.Rating,
            OutofRatingScale: 10,
            TotalVoters: resp?.TotalVoters,
          }));

          setcontentratings(Da);
        } else {
          setcontentratings([]);
        }
        if (resp.status == 204) {
          openNotification('info', 'Ratings Not Found');
          setcontentratings([]);
        }
      } catch (error) {}
    })();
    (async (values) => {
      const Rating = await apiGetRatingcompanymaster(values);
      if (Rating.status == 200) {
        setRating(Rating.data);
      } else if (Rating.status === 204) {
        openNotification('info', 'Ratings Not Found');
        setRating([]);
      }
    })();
  }, []);

  return (
    <Card>
      <Loader showLoader={showLoader} />
      <div className="flex justify-between items-center ml-2 mr-3">
        <p
          style={{ color: 'white', fontSize: 16, fontWeight: 600 }}
          className="flex"
        >
          Average Ratings{' '}
          <p className="flex ml-2">
            {averageRating} <p className={`ml-1 filled`}>★</p>
          </p>
        </p>
        {/* <Button
          variant="solid"
          size="xs"
          icon={<MdOutlineSync />}
          type="button"
        /> */}
      </div>
      <div style={{ height: '150px', overflow: 'auto' }}>
        <div
          style={{ height: 1, width: '100%', background: '#e6dcdc7a' }}
          className="mt-5"
        ></div>
        {Rating.map((item, index) => {
          const filteredRatings = contentratings?.filter(
            (itemr) => itemr.RatingCompanyCode === item.RatingCompanyCode,
          );
          const hasMatchingCode = filteredRatings?.length > 0;
          return (
            <div key={index}>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex justify-left ml-5 items-center">
                  <img
                    src={item.RatingCompanyLogo}
                    height={60}
                    width={60}
                    alt={item.RatingCompanyName}
                  />
                </div>
                <div className="flex justify-end items-center">
                  <div className="mr-10 flex items-center">
                    <h5
                      className="mr-1"
                      style={{ color: 'gold', marginTop: '-5' }}
                    >
                      ★
                    </h5>
                    <span className="mr-2" style={{ color: 'gold' }}>
                      {hasMatchingCode && filteredRatings[0].Rating}
                    </span>
                    {hasMatchingCode && (
                      <span>
                        {' '}
                        ({abbreviateNumberE(filteredRatings[0]?.TotalVoters)})
                      </span>
                    )}
                  </div>
                  {contentratings?.RatingCompanyCode !== 2 && (
                    <Tooltip title="Sync Ratings">
                      <Button
                        size="xs"
                        className="mr-2"
                        variant="solid"
                        type="button"
                        // disabled={hasMatchingCode}
                        onClick={() => {
                          GetAPi(item, filteredRatings[0]);
                        }}
                        icon={
                          <Icon
                            path={mdiSync}
                            size={0.8}
                            style={{ color: '#fff' }}
                          />
                        }
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
              <div
                style={{ height: 1, width: '100%', background: '#e6dcdc7a' }}
                className="mt-2 mb-2"
              ></div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Rating;
