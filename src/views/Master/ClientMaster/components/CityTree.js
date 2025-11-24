import { TreeSelect } from 'primereact/treeselect';
import { useState, useEffect, useMemo, useRef } from 'react'
import { apishowplaceTree } from 'services/MasterService'
import { convertCityAreaCountry } from './convertCityAreaCountry'

export function CityTree(selectedNodeKey, setSelectedNodeKey, Client = false, setClient = false) {
    const [nodes, setNodes] = useState(null);

    // const [selectedNodeKey, setSelectedNodeKey] = useState(null); 

    // useEffect(()=>{
    //     console.log('selectedNodeKey'); console.log(selectedNodeKey);
    // },[selectedNodeKey])

    useEffect(() => {
        ; (async (values) => {
            const resp = await apishowplaceTree(values)
            // console.log(resp.data);
            setNodes(convertCityAreaCountry(resp.data));
            // setdata(resp.data)
        })()
    }, [])
    return <TreeSelect value={selectedNodeKey}
        onChange={(e) => {
            let res = e.value.split('-');

            if (res.length < 3) {
                alert('please select city..');
            } else {
                setSelectedNodeKey(e.value);
                // console.log(Boolean(setClient));
                if (!setClient) return
                setClient({ ...Client, CountryCode: res[0], StateCode: res[1], PlaceCode: res[2] })
                // setcountry(res[0]);
                // setstate(res[1]);
                // setcity(res[2]);
            }
        }}
        options={nodes} filter className="w-full"
        placeholder="Select City">
    </TreeSelect>;
}
