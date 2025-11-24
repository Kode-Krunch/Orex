import React from 'react';
import classNames from 'classnames';
import { Container } from 'components/shared';
import { APP_NAME } from 'constants/app.constant';
import { PAGE_CONTAINER_GUTTER_X } from 'constants/theme.constant';
import { useNavigate } from 'react-router-dom';

const FooterContent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between flex-auto w-full">
      <span className="text-xs">
        Copyright &copy; {`${new Date().getFullYear()}`}{' '}
        <span className="font-semibold">{`${APP_NAME}`}</span> All rights
        reserved.
      </span>
      <div className="">
        <span
          style={{ cursor: 'pointer' }}
          className="text-xs"
          onClick={(e) => navigate('/TermConditions')}
        >
          Term & Conditions
        </span>
        <span className="mx-2 text-muted"> | </span>
        <span
          style={{ cursor: 'pointer' }}
          className="text-xs"
          onClick={(e) => navigate('/PrivacyPolicy')}
        >
          Privacy & Policy
        </span>
      </div>
    </div>
  );
};

export default function Footer({ pageContainerType }) {
  return (
    <footer
      className={classNames(
        `footer flex flex-auto items-center pb-4 ${PAGE_CONTAINER_GUTTER_X}`,
      )}
    >
      {pageContainerType === 'contained' ? (
        <Container>
          <FooterContent />
        </Container>
      ) : (
        <FooterContent />
      )}
    </footer>
  );
}
