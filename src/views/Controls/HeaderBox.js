import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'

const headerExtraContent = (openDrawer,DebouncedInput,globalFilter,setGlobalFilter) => {
    return (
        <span className="flex items-center">
            <span className="mr-1 mt-4  font-semibold">
             <DebouncedInput
                value={globalFilter ?? ''}
                className=" solid"
                placeholder="Search all columns..."
                size="sm"
                onChange={(value) => {setGlobalFilter(value)}}
            />
            </span>
            <span className="mr-1 font-semibold">
                           <Button
                    block
                    variant="solid"
                    size="sm"
                    icon={<HiPlusCircle />}
                    onClick={() => openDrawer()}
                >
                    Add Entity
                </Button>
                {/* </Link> */}
            </span>
        </span>
    )
}
export {headerExtraContent};