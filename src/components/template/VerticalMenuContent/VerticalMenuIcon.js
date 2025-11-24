import React from 'react';
import navigationIcon from 'configs/navigation-icon.config';
import { HiArrowsExpand } from 'react-icons/hi';

export const Icon = ({ component: Component }) => {
  return (
    <>
      <Component />
    </>
  );
};

const VerticalMenuIcon = ({ icon, gutter }) => {
  if (typeof icon !== 'string' && !icon) {
    return <></>;
  }

  return (
    <span className={`text-xl  ${gutter ? 'ltr:mr-2 rtl:ml-2' : ''}`}>
      {navigationIcon[icon]}
      {/* <img
        src={'/img/circle-heat-svgrepo-com.svg'}
        alt="React Logo"
        height={'20'}
        width={'20'}
      /> */}
      {/* <HiArrowsExpand /> */}
    </span>
  );
};

VerticalMenuIcon.defaultProps = {
  gutter: true,
};

export default VerticalMenuIcon;
