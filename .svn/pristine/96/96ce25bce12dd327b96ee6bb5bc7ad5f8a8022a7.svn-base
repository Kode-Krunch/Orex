import { Button } from 'components/ui'
import { AiOutlineSave } from 'react-icons/ai'

const Footer = ({
    onSaveClick,
    onCancel,
    BtnSaveTxt = 'Save',
    BtnCancelTxt = 'Discard',
}) => {
    return (
        <div className="text-left w-full flex">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                {BtnCancelTxt}
            </Button>

            <Button
                size="sm"
                className="mr-2"
                variant="solid"
                onClick={onSaveClick}
                icon={<AiOutlineSave />}
            >
                Show Spots
            </Button>
        </div>
    )
}
export default Footer
