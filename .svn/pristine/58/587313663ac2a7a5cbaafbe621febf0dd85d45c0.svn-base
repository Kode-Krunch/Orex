import { Breadcrumbs } from '@material-tailwind/react';
import { Avatar } from 'components/ui';
import { AiFillHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DashboardHeader({ Name, Page, Links, additionalContent }) {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <h3 className="font-semibold">{Name}</h3>
        {additionalContent && additionalContent}
      </div>
      <Breadcrumbs>
        <Link to="/home" className="opacity-60 text-md">
          <Avatar
            className="dark:bg-indigo-500/20 dark:text-indigo-100 text-indigo-800 bg-indigo-400"
            icon={<AiFillHome />}
            size="sm"
          />
        </Link>
        <Link
          to={`/${Links}`}
          className="text-black  dark:text-white text-md font-semibold"
        >
          <span>Dashboard</span>
        </Link>
        <Link
          to={`/${Links}`}
          className="text-black  dark:text-white  text-md font-semibold"
        >
          <span>{Page}</span>
        </Link>
      </Breadcrumbs>
    </div>
  );
}
export default DashboardHeader;
