import React, { useEffect, useState } from 'react';
import { Button, Card, Spinner } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import SalesTargetCard from '../components/SalesTargetCard';
import { apiCallstoreprocedure } from 'services/CommonService';
import { useSelector } from 'react-redux';

function Dashboard({ setScreen }) {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);

  const Channel = useSelector((state) => state.locale.selectedChannel)
  useEffect(() => {
    const fetchTargets = async () => {
      try {
        setLoading(true);

        // 🔹 Ensure channel is selected
        if (!Channel?.LocationCode || !Channel?.ChannelCode) {
          console.warn('Channel not selected');
          setTargets([]);
          setLoading(false);
          return;
        }
        const response = await apiCallstoreprocedure('USP_GetUserSalesData', {

          LocationCode: Channel?.LocationCode,
          ChannelCode: Channel?.ChannelCode,
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          setTargets(response.data);
        } else {
          setTargets([]);
        }
      } catch (error) {
        console.error('Error fetching sales targets:', error);
        setTargets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTargets();
  }, [Channel]); // 🔹 refetch when Channel changes
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sales Target</h2>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => setScreen('add')}
        >
          Add Sales Target
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner size={30} />
        </div>
      ) : targets.length > 0 ? (
        <div className="grid grid-cols-5 gap-4 mt-6">
          {targets.map((t, index) => (
            <SalesTargetCard
              key={index}
              year={t.Description}
              target={t.TotalAmount}
              executives={t.ExecutiveCount}
              onEdit={() => setScreen('edit', t)} // optional
            />
          ))}
        </div>
      ) : (
        <Card
          className="h-full mt-6"
          bodyClass="h-full flex justify-center items-center text-gray-400"
        >
          No sales target to show
        </Card>
      )}
    </>
  );
}

export default Dashboard;
