import { Button, Dialog, Table, Upload } from 'components/ui';
import TBody from 'components/ui/Table/TBody';
import Td from 'components/ui/Table/Td';
import Th from 'components/ui/Table/Th';
import THead from 'components/ui/Table/THead';
import Tr from 'components/ui/Table/Tr';
import React from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';

function ImportDialog({
  isDialogOpen,
  onDialogClose,
  fpcimportdata,
  beforeUpload,
  onDialogOKAI,
  FpcErrorheaders,
  maxUpload,
}) {
  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      {fpcimportdata.length <= 0 && (
        <>
          <Upload
            beforeUpload={beforeUpload}
            uploadLimit={maxUpload}
            tip={<p className="mt-2">XLSX only</p>}
          >
            <Button variant="solid" icon={<HiOutlineCloudUpload />}>
              Upload your file
            </Button>
          </Upload>
          <div className="text-right mt-6">
            <Button
              className="ltr:mr-2 rtl:ml-2"
              variant="plain"
              onClick={onDialogClose}
            >
              Cancel
            </Button>
            <Button variant="solid" onClick={onDialogOKAI}>
              OK
            </Button>
          </div>
        </>
      )}
      <br></br>
      <br></br>
      {fpcimportdata.length > 0 && (
        <div
          style={{
            height: 'auto',
            minHeight: '100px',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          <Table compact>
            <THead>
              <Tr>
                {FpcErrorheaders.map((header, index) => (
                  <Th key={index}>{header}</Th>
                ))}
              </Tr>
            </THead>
            <TBody>
              {fpcimportdata.map((e, index) => (
                <Tr key={index} style={{ border: '1px solid #E3E5EB' }}>
                  <Td style={{ border: '1px solid #E3E5EB' }}>{e.StartTime}</Td>
                  <Td style={{ border: '1px solid #E3E5EB' }}>
                    {e.ContentName}
                  </Td>

                  <Td style={{ border: '1px solid #E3E5EB' }}>{e.Remark}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>
      )}
    </Dialog>
  );
}

export default ImportDialog;
