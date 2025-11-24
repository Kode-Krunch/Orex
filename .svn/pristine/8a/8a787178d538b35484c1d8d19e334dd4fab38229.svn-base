import { Button, Card, Tooltip } from 'components/ui';
import { GoPencil } from 'react-icons/go';

/* CONSTANTS */
const TAX_BADGE_COLOR = 'bg-teal-700';

/* COMPONENTS */
const ListItem = ({ label, value, badgeColor }) => {
  return (
    <li className="flex items-center justify-between">
      <span className="flex items-center">
        <span className={`mr-2 rounded-full ${badgeColor} w-2 h-2`} />
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </li>
  );
};

function SalesTargetCard({ year, target, executives, onEdit }) {
  return (
    <Card
      className="dark:hover:bg-gray-700 hover:bg-gray-300 hover:cursor-pointer"
      style={{ minHeight: '10rem' }}
      bodyClass="p-3 h-full flex flex-col"
      bordered={false}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3 pb-1 border-b border-dashed border-dash-2 border-b-gray-600">
        <h6>{year}</h6>
        <Tooltip title="Edit">
          <Button
            shape="circle"
            variant="plain"
            className="-mt-1 -mr-2 opacity-80"
            icon={<GoPencil size={19} className="opacity-80" />}
            onClick={onEdit}
          />
        </Tooltip>
      </div>

      {/* Details */}
      <ul className="flex flex-col gap-3">
        <ListItem
          label="Target"
          value={`₹ ${Number(target).toLocaleString()}`}
          badgeColor={TAX_BADGE_COLOR}
        />
        <ListItem
          label="Executives"
          value={executives}
          badgeColor={TAX_BADGE_COLOR}
        />
      </ul>
    </Card>
  );
}

export default SalesTargetCard;
