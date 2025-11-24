import { Breadcrumbs } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
const HeaderExtraForSchedule = ({ ModuleText = 'Admin', Component, links }) => {
    return (
        <div>
            <Breadcrumbs
                style={{ marginLeft: '-15px', width: 'auto' }}
                className="py-1"
            >
                <Link to="/home" className="opacity-60 text-xs">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >

                        
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </Link>
                <Link to={`/${ModuleText}`} className="opacity-60 text-xs">
                    <span>{ModuleText}</span>
                </Link>
                <Link to="#" className="text-xs">
                    <span>{Component}</span>
                </Link>
            </Breadcrumbs>
        </div>
    )
}
export default HeaderExtraForSchedule
