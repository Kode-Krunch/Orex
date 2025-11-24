import React from 'react';
import { Table, Button } from 'components/ui';
import { HiMinus } from 'react-icons/hi';
const { Tr, Th, Td, THead, TBody } = Table;

const SettingTable = ({ Settings, setSettings }) => {
  return (
    <div>
      <Table compact>
        <THead>
          <Tr>
            <Th>Action</Th>
            <Th>Location</Th>
            <Th>Channel</Th>
            <Th>Description</Th>
            <Th>StartTime</Th>
            {/* <Th>EndTime</Th> */}
            <Th>EffectiveFrom</Th>
          </Tr>
        </THead>

        {Settings.length > 0 ? (
          <TBody>
            {Settings.map((Setting) => (
              <Tr key={Setting.id}>
                <Td>
                  <Button
                    shape="circle"
                    size="sm"
                    icon={<HiMinus />}
                    onClick={() => {
                      //
                      const newSettings = Settings.filter(
                        (setting) => setting.id !== Setting.id,
                      );
                      setSettings(newSettings);
                    }}
                  />
                </Td>
                <Td>{Setting.LocationName}</Td>
                <Td>{Setting.ChannelName}</Td>
                <Td>{Setting.ChannelTimeDescription}</Td>
                <Td>{Setting.StartTime}</Td>
                {/* <Td>{Setting.EndTime}</Td> */}
                <Td>{Setting.EffectiveFrom}</Td>
              </Tr>
            ))}
          </TBody>
        ) : (
          <TBody>
            <Tr>
              <Td colSpan="2">No Rows Found</Td>
            </Tr>
          </TBody>
        )}
      </Table>
    </div>
  );
};

export default SettingTable;
