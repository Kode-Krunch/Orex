import { useState } from 'react';
import { viewsEnum } from './enum';
import { useSelector } from 'react-redux';
import TeamMapping from './components/TeamMapping';
import Loader from 'views/Controls/Loader';
import Home from './components/Home';
import AddEditEvents from './components/AddEditEvent';

const ManageEvents = () => {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [clickedActionRowData, setClickedActionRowData] = useState(null);
  const [curView, setCurView] = useState(viewsEnum.HOME);
  useState(false);
  const [showLoader, setShowLoader] = useState(false);

  /* HELPER FUNCTIONS */
  const resetPage = () => {
    setClickedActionRowData(null);
    setCurView(viewsEnum.HOME);
    setShowLoader(false);
  };

  return (
    <>
      {curView === viewsEnum.HOME ? (
        <Home
          setCurView={setCurView}
          setShowLoader={setShowLoader}
          setClickedActionRowData={setClickedActionRowData}
        />
      ) : curView === viewsEnum.ADD || curView === viewsEnum.EDIT ? (
        <AddEditEvents
          curView={curView}
          setShowLoader={setShowLoader}
          clickedActionRowData={clickedActionRowData}
          resetPage={resetPage}
        />
      ) : (
        <TeamMapping
          channel={channel}
          resetPage={resetPage}
          eventDetails={clickedActionRowData}
          setShowLoader={setShowLoader}
        />
      )}
      <Loader showLoader={showLoader} />
    </>
  );
};

export default ManageEvents;
