import { EMPTY_LINE, PAGE_WIDTH } from '../constants';

const getHeaderDefinitionForTCPage = (headerDetails) => {
  try {
    return {
      columns: [
        {
          width: (PAGE_WIDTH * 15) / 100,
          text: '',
        },
        {
          width: '*',
          alignment: 'center',
          margin: [0, 15, 0, 0],
          text: [
            {
              text: `${headerDetails.companyName}\n`,
              style: 'header',
            },
            { ...EMPTY_LINE },
            { text: headerDetails.address, style: 'secondaryTextBold' },
          ],
        },
        {
          width: (PAGE_WIDTH * 15) / 100,
          text: '',
        },
      ],
    };
  } catch (error) {
    throw error;
  }
};

export default getHeaderDefinitionForTCPage;
