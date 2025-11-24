import React, { memo, useMemo, lazy, Suspense, useEffect } from 'react';
import { Loading } from 'components/shared';
import { useSelector } from 'react-redux';
import {
  LAYOUT_TYPE_CLASSIC,
  LAYOUT_TYPE_MODERN,
  LAYOUT_TYPE_SIMPLE,
  LAYOUT_TYPE_STACKED_SIDE,
  LAYOUT_TYPE_DECKED,
  LAYOUT_TYPE_BLANK,
} from 'constants/theme.constant';
import useAuth from 'utils/hooks/useAuth';
import useDirection from 'utils/hooks/useDirection';
import { useNavigate } from 'react-router-dom';
import appConfig from 'configs/app.config';

const layouts = {
  [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
  [LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
  [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./StackedSideLayout')),
  [LAYOUT_TYPE_SIMPLE]: lazy(() => import('./SimpleLayout')),
  [LAYOUT_TYPE_DECKED]: lazy(() => import('./DeckedLayout')),
  [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
};

const Layout = () => {
  const layoutType = useSelector((state) => state.theme.layout.type);
  useEffect(() => {
    restartAutoReset();
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  const { authenticated } = useAuth();

  useDirection();
  const { signOut } = useAuth();
  // useLocale()

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return layouts[layoutType];
    }
    return lazy(() => import('./AuthLayout'));
  }, [layoutType, authenticated]);
  const history = useNavigate();
  let timeout = null;

  const goBackToHome = () => {
    history('/home');
    signOut();
  };
  const restartAutoReset = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      goBackToHome();
    }, appConfig.restartTime * 6); // 10-minute idle timeout
  };

  const onMouseMove = () => {
    restartAutoReset();
  };

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
      onMouseMove={onMouseMove}
    >
      <AppLayout onMouseMove={onMouseMove} />
    </Suspense>
  );
};

export default memo(Layout);
