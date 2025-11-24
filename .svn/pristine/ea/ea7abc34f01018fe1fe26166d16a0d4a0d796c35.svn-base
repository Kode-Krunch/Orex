import { useState } from 'react';
import { Card, Progress, Button } from 'components/ui';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import './fnt.css';
import { convertDateToYMD, convertDateToYMDStr } from 'components/validators';
import { apiPOSTSTAR } from 'services/ProgrammingService';
import { useDispatch } from 'react-redux';
import { setLOADERCHECK, setSTARCAST } from 'store/locale/localeSlice';
const ProgressInfo = ({ precent }) => {
  return (
    <div>
      <h3 style={{ fontSize: 15 }} className="pppp">
        {precent}
      </h3>
    </div>
  );
};
const parseActors = (actors) => {
  return actors ? actors.split(', ') : [];
};
const Index = ({
  first,
  values,
  onDialogClose,
  setPreviewSource,
  setcontentratings,
  Rating,
}) => {
  const dispatch = useDispatch();

  const abx = () => {
    const parsedActors = parseActors(first?.Actors);
    const data = {
      star: parsedActors,
      Director: first?.Director,
    };
    (async (values) => {
      const StarCastTypeList = await apiPOSTSTAR(data);
      dispatch(setLOADERCHECK(true));
      dispatch(setSTARCAST(data));
    })();
    setPreviewSource(first?.Poster);
    values.EPGContentName = first?.Title;
    values.ContentName = first?.Title;
    values.FPCReleaseDate = convertDateToYMDStr(first?.Released);
    // values.Content_Image = first?.Poster
    values.Synopsis = first?.Plot;
    values.GenericSynopsis = first?.Plot;
    const words = first?.Title.split(' ');
    const shortForm = words
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    values.ShortName = shortForm;
    const v = first?.Runtime.replace(/\bmin\b/g, '').trim();
    const stringWithoutSpaces = v.replace(/\s/g, '');
    values.SlotDuration = stringWithoutSpaces;
    console.log('Internet', first);

    const mergedData = first.Ratings.flatMap((item) => {
      let resy;

      if (item.Source === 'Internet Movie Database') {
        resy = Rating.filter((itemr) => itemr.RatingCompanyCode == 2);
      } else {
        resy = Rating.filter(
          (itemr) => itemr.RatingCompanyName === item.Source,
        );
      }
      if (resy.length === 0) {
        // Handle case where no matching item is found in Rating array
        return [];
      }
      return resy.map((r) => {
        let newRating;

        if (
          item.Source === 'Internet Movie Database' &&
          r.RatingCompanyCode === 2
        ) {
          newRating = {
            RatingCompanyCode: r.RatingCompanyCode,
            Rating: parseFloat(item.Value.split('/')[0]),
            OutofRatingScale: 10,
            TotalVoters: parseInt(first.imdbVotes.replace(/,/g, ''), 10),
          };
        } else {
          switch (r.RatingCompanyCode) {
            case 3:
              newRating = {
                RatingCompanyCode: r.RatingCompanyCode,
                Rating:
                  (Number(parseFloat(item.Value.split('/')[0])) * 10) / 100,
                OutofRatingScale: 10,
                TotalVoters:
                  (Number(parseFloat(item.Value.split('/')[0])) * 10) / 100 == 0
                    ? 0
                    : parseInt(first.imdbVotes.replace(/,/g, ''), 10),
              };
              break;
            default:
              // Handle default case appropriately
              return null;
          }
        }

        return newRating;
      });
    });
    setcontentratings(mergedData);
    onDialogClose();
  };

  return (

    <div >
      <div className="grid grid-cols-3 gap-4    mt-1  ">
        <div className="col-span-2 ">
          <div style={{ marginTop: 10, marginLeft: 30 }}>
            <h3 >{first?.Title}</h3>
            <br />
            <p>{first?.Plot}</p>
          </div>
        </div>
        <div className="col-span-1 mt-1 " style={{ marginLeft: 40 }}>
          <img src={first?.Poster} height={100} width={100} />
        </div>
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-2">
        <div className="col-span-2">
          <div className="grid grid-cols-4 gap-4">
            <div className="rows-span-1 flex justify-center">
              <div style={{ marginTop: '20px' }}>
                <Progress
                  variant="circle"
                  percent={first?.imdbRating * 10}
                  width={60}
                  className="flex justify-center"
                  strokeWidth={10}
                  customInfo={<ProgressInfo precent={first?.imdbRating} />}
                />
                <center>Ratings</center>
              </div>
            </div>
            <div
              className="rows-span-1 flex justify-center"
            // style={{ border: '1px solid red' }}
            >
              <div style={{ marginTop: '20px', width: 100 }}>
                <center>
                  <p className="text-xl">{first?.imdbVotes}</p>
                  <h3 style={{ fontSize: 15 }} className="pppp">
                    Votes
                  </h3>
                </center>
                <p className="text-xl">
                  <Progress
                    color="blue-500"
                    percent={100}
                    showInfo={false}
                    size="sm"
                  />
                </p>
              </div>
            </div>
            <div
              className="rows-span-1 flex justify-center"
            // style={{ border: '1px solid red' }}
            >
              <div style={{ marginTop: '20px', width: 100 }}>
                <center>
                  <p className="text-xl">{first?.BoxOffice}</p>
                  <h3 style={{ fontSize: 15 }} className="pppp">
                    Box Office
                  </h3>
                </center>
                <p className="text-xl">
                  <Progress
                    color="blue-500"
                    percent={100}
                    showInfo={false}
                    size="sm"
                  />
                </p>
              </div>
            </div>
            <div
              className="col-span-1 flex justify-center"
            // style={{ border: '1px solid red' }}
            >
              <div style={{ marginTop: '20px', width: 100 }}>
                <center>
                  <p className="text-xl">{first?.Year}</p>
                  <h3 style={{ fontSize: 15 }} className="pppp">
                    Year
                  </h3>
                </center>
                <p className="text-xl">
                  <Progress
                    color="blue-500"
                    percent={100}
                    showInfo={false}
                    size="sm"
                  />
                </p>
              </div>
            </div>
            <div
              className="col-span-4 flex justify-center"
            // style={{ border: '1px solid red' }}
            >
              <div style={{ marginTop: '10px' }}>
                <Card>
                  <center className="text-5xl cursor-pointer">
                    <h4>Cast Name</h4>
                    <p className="text-lg">{first?.Actors}</p>
                  </center>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="row-span-3">
          <div
            style={{
              marginTop: '10px',
              width: 200,
              marginLeft: '80px',
            }}
          >
            <h3
              style={{
                fontSize: 15,
                textTransform: 'uppercase',
              }}
              className="pkk"
            >
              Initial Released
            </h3>
            <p className="text-sm" style={{ marginTop: '-5px' }}>
              {first?.Released}
            </p>
            <br />
            <h3
              style={{
                fontSize: 15,
                textTransform: 'uppercase',
              }}
              className="pkk"
            >
              Length
            </h3>
            <p className="text-sm" style={{ marginTop: '-5px' }}>
              {first?.Runtime}
            </p>
            <br />
            <h3
              style={{
                fontSize: 15,
                textTransform: 'uppercase',
              }}
              className="pkk"
            >
              Director
            </h3>
            <p className="text-sm" style={{ marginTop: '-5px' }}>
              {first?.Director}
            </p>
            <br />
            <h3
              style={{
                fontSize: 15,
                textTransform: 'uppercase',
              }}
              className="pkk"
            >
              Genre
            </h3>
            <p className="text-sm" style={{ marginTop: '-5px' }}>
              {first?.Genre}
            </p>

            {/* <p className="text-xl">
                            <Progress
                                color="blue-500"
                                percent={100}
                                showInfo={false}
                                size="sm"
                            />
                        </p> */}
          </div>
        </div>
      </div><div className='flex justify-center'>
        <Button variant="solid" size="sm" onClick={() => abx()}>
          Import Data
        </Button>
      </div>
    </div>

  );
};

export default Index;
