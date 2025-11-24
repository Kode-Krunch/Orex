import React from 'react';
import { Card } from 'components/ui';
import classNames from 'classnames';
import ReactHtmlParser from 'html-react-parser';
import { COMMENT } from '../constants';

const UnixDateTime = ({ value }) => {
  return <>{value}</>;
};

const HighlightedText = ({ children, className }) => {
  return (
    <span
      className={classNames(
        'font-semibold text-gray-900 dark:text-gray-100',
        className,
      )}
    >
      {children}
    </span>
  );
};

const Event = ({ data, compact, formattedTime }) => {
  const transform = (node, index) => {
    if (node.type === 'tag' && node.name === 'strong') {
      return (
        <HighlightedText key={node?.children[0]?.data}>
          {node?.children[0]?.data}
        </HighlightedText>
      );
    }
    return node.data;
  };

  const options = { transform };

  switch (data.type) {
    case COMMENT:
      return (
        <>
          <p className="my-1 flex items-center flex-wrap">
            <HighlightedText>{data.userName}</HighlightedText>
            <span className="mx-1">has created on</span>
            {/* <HighlightedText>Post</HighlightedText> */}
            <span className="ml-3 rtl:mr-3">
              <UnixDateTime value={formattedTime} />
            </span>
          </p>

          <Card bordered className="mt-4">
            {ReactHtmlParser(data.description || '', options)}
          </Card>
        </>
      );

    default:
      return null;
  }
};

export default Event;
