import React, { useContext, useEffect, lazy, Suspense } from 'react';
import SchedulerContextProvider from './context/SchedulerContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import SchedulerContext from './context/SchedulerContext';
import { setdateForm } from 'store/locale/localeSlice';
import { setPageHeading } from './utils';
import { useLocation } from 'react-router-dom';

/* CODE SPLITTING */
const SchedulingArea = lazy(() =>
  import('./components/SchedulingArea/SchedulingArea'),
);
const SchedulingCalendar = lazy(() =>
  import('./components/SchedulingCalendar/SchedulingCalendar'),
);
const Loader = lazy(() => import('views/Controls/Loader'));

function Scheduler() {
  return (
    <SchedulerContextProvider>
      <SchedulerWithContext></SchedulerWithContext>
    </SchedulerContextProvider>
  );
}

function SchedulerWithContext() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const path = useSelector((state) => state.base.common.Path);
  const dispatch = useDispatch();

  /* CONTEXT */
  const { page, setPage, date, setDate, showLoader, resetPage } =
    useContext(SchedulerContext);

  /*HOOKS */
  const location = useLocation();

  useEffect(() => {
    return removePageHeading;
  }, []);

  useEffect(() => {
    resetPage();
  }, [channel]);

  useEffect(() => {
    if (location.state && location.state.date) {
      setDate(location.state.date);
    }
  }, [location.state]);

  useEffect(() => {
    try {
      /* GET CURRENT PAGE NAME */
      setPage(getCurPage());
    } catch (error) {
      console.error(error);
    }
  }, [path]);

  useEffect(() => {
    try {
      /* SET DATE AND PAGE NAME IN NAVBAR */
      setPageHeading(page, dispatch, setdateForm, date, channel);
    } catch (error) {
      console.error(error);
    }
  }, [page, date]);

  /* HELPER FUNCTIONS */
  const removePageHeading = () => {
    try {
      const gboxElement = document.getElementsByClassName('Gbox2')[0];
      const gboxElementchild =
        document.getElementsByClassName('Gbox2')[0].children[1];
      if (gboxElement) {
        gboxElement.style.display = 'none';
        gboxElementchild.style.display = 'none';
      }
    } catch (error) {
      throw error;
    }
  };

  const getCurPage = () => {
    try {
      let page = null;
      if (path.length > 0) {
        page = path.split('/').slice(-1)[0].toLowerCase();
      }
      return page;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Suspense fallback={<Loader showLoader={true} />}>
      {page && <>{date ? <SchedulingArea /> : <SchedulingCalendar />}</>}
      <Loader showLoader={showLoader} />
    </Suspense>
  );
}

export default Scheduler;
