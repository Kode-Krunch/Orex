import { TreeSelect } from 'primereact/treeselect';
import { useState, useEffect, useMemo, useRef } from 'react'
import { apishowplaceTree } from 'services/MasterService'
import { convertCityAreaCountry } from './convertCityAreaCountry'
import { Toast } from 'primereact/toast';
const CityTree = ({ selectedNodeKey, setSelectedNodeKey }) => {
    const [nodes, setNodes] = useState(null);

    const toast = useRef(null);
    const show = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: msg });
    };
    useEffect(() => {
        ; (async (values) => {
            const resp = await apishowplaceTree(values)
            setNodes(convertCityAreaCountry(resp.data));
        })()
    }, [])

    return (
        <><Toast ref={toast} />
            <TreeSelect value={selectedNodeKey}
                onChange={(e) => {
                    let res = e.value.split('-');

                    if (res.length < 3) {
                        show('please select city');
                    } else {
                        setSelectedNodeKey(e.value);
                    }
                }}
                options={nodes} filter className="w-full"
                placeholder="Select City">
            </TreeSelect></>


    )

}

export default CityTree