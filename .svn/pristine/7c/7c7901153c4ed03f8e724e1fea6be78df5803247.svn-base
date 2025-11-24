import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APP_NAME } from 'constants/app.constant';
import { useNavigate } from 'react-router-dom';

const LOGO_SRC_PATH = '/img/logo/';

const Logo = (props) => {
  const { type, mode, gutter, className, imgClass, style, logoWidth } = props;
  const nav = useNavigate();
  return (
    <div
      className={classNames(' flex logo', className, gutter)}
      style={{
        ...style,
        ...{ width: logoWidth },
      }}
      onClick={() => nav('/home')}
    >
      <img
        style={{ height: 48, width: 100, marginTop: '-10px' }}
        src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
        alt={`${APP_NAME} logo`}
      />
    </div>
  );
};

Logo.defaultProps = {
  mode: 'light',
  type: 'full',
  logoWidth: 'auto',
};

Logo.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
  type: PropTypes.oneOf(['full', 'streamline']),
  gutter: PropTypes.string,
  imgClass: PropTypes.string,
  logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Logo;
