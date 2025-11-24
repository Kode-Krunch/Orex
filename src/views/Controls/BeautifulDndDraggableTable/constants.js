import { theme } from 'twin.macro';

const TW_COLORS = theme`colors`;

const DEFAULT_STYLES = {
  width: '25',
  cell: {
    height: 30,
    fontWeight: '400',
    color: TW_COLORS.gray['300'],
    borderColor: TW_COLORS.gray['600'],
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingBlock: '0.25rem',
    paddingInline: '0.375rem',
    fontSize: '12px',
    backgroundColor: TW_COLORS.gray['800'],
    align: 'left',
  },
  header: {
    fontWeight: '600',
    color: 'white',
    borderColor: TW_COLORS.gray['500'],
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingBlock: '0.25rem',
    paddingInline: '0.375rem',
    fontSize: '12px',
    backgroundColor: TW_COLORS.gray['700'],
    align: 'left',
  },
};

export { DEFAULT_STYLES };
