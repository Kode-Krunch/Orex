import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { apiGetContenStarCast } from 'services/ProgrammingService';
import MapStarcast from 'views/Controls/MapStarcast';

const StarCastEditDialog = ({ GetContents, path }) => {
    const { Content } = useSelector((state) => state.base.common);

    const [sMapStarcast, setMapStarcast] = useState([]);
    useEffect(() => {
        (async (values) => {
            const response = await apiGetContenStarCast(Content.ContentCode);
            const formattedOptions = response.data.map((option) => ({

                StarCastCode: option?.StarCastMaster?.StarCastCode,
                StarCastName: option?.StarCastMaster?.StarCastName,
                StarCastTypeCode: option?.StarCastTypeMaster?.StarCastTypeCode,
                StarCastTypeName: option?.StarCastTypeMaster?.StarCastTypeName
            }));
            setMapStarcast(formattedOptions);
        })();
    }, []);
    return (
        <div>
            <MapStarcast
                setMapStarcast={setMapStarcast}
                sMapStarcast={sMapStarcast}
                isEditMode={true} GetContents={GetContents} path={path}
            />
        </div>
    )
}

export default StarCastEditDialog