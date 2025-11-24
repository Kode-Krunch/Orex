import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { formatDateWDMY } from 'views/Programming/general';

const Header = (props) => {
  const { headerStart, headerEnd, headerMiddle, className, container } = props;
  const dateForm = useSelector((state) => state.locale.dateForm);


  return (
    <header className={classNames('header', className)}>
      <div
        className={`${classNames(
          'header-wrapper',
          container && 'container mx-auto',
        )} h-full`}
      >
        <div className="header-action header-action-start">{headerStart}</div>
        {headerMiddle && (
          <div className="header-action header-action-middle">
            {headerMiddle}
          </div>
        )}
        {/* <h1>h</h1> */}

        <div className="Gbox2   text-center" style={{ display: 'none' }}>
          <div
            style={{
              fontSize: '1.50rem',
              textAlign: 'center',
              fontWeight: '600',
              lineHeight: '2.75rem',
              color: 'white',
              marginTop: '3px',
              marginLeft: '5px',
            }}
          >
            {dateForm[1]}
          </div>

          <p
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              marginTop: '-10px',
            }}
            className="flex justify-center items-center  Gbox10"
          >
            <div className="flex items-center Gbox19">
              <h6 style={{ color: 'rgb(20 184 166)', fontSize: '18px' }}>
                {formatDateWDMY(dateForm[0])}
              </h6>
            </div>
          </p>
        </div>
        <div className="header-action header-action-end">{headerEnd}</div>
      </div>
    </header>
  );
};

Header.propTypes = {
  headerStart: PropTypes.node,
  headerEnd: PropTypes.node,
  container: PropTypes.bool,
};

export default Header;
