import React, { useEffect, useState } from 'react';
import { AdaptableCard, Loading } from 'components/shared';
import { Button, toast, Card } from 'components/ui';
import {
  apiGetEmpbyid,
  apiGetrightsShowT2,
  PostRights,
} from 'services/MasterService';
import { useLocation } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tree } from 'primereact/tree';
import { StickyFooter } from 'components/shared';
import { validate } from 'components/validators';
import Notification from 'components/ui/Notification';
import HeaderExtra from 'views/Controls/HeaderExtra';
import Loader from 'views/Controls/Loader';
import {
  filterData2,
  openNotification,
  convertObj1ToObj2,
} from 'views/Controls/GLOBALFUNACTION';

const EmployeeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let EmployeeCode = location.pathname.split('/').at(-1);
  const [showLoader, setshowLoader] = useState(false);
  const [data, setData] = useState(['']);
  const [loginid, setLoginid] = useState([]);
  const tokenS = useSelector((state) => state.auth.session.token);
  const addRights = async (values, token, navigate) => {
    setshowLoader(true);
    try {
      const resp = await PostRights(values, token);
      if (resp.status === 200) {
        toast.push(
          <Notification title={'success'} type={'success'}>
            Data Save successfully
          </Notification>,
        );
        setshowLoader(false);
        setTimeout(() => {
          navigate('/employee');
        }, 2000);
      } else if (resp.status === 'Server Error.') {
        openNotification('danger', 'Something Went Wrong');
        setshowLoader(false);
        return;
      }
    } catch (errors) {
      setshowLoader(false);
      return {};
    }
  };

  useEffect(() => {
    (async (values) => {
      const EmpDetails = await apiGetEmpbyid(EmployeeCode);
      setData(EmpDetails.data);
      console.log(EmpDetails);
      setLoginid(EmpDetails.data.LoginCode);
    })();
    // document.getElementsByClassName('side')[0].click()
  }, [EmployeeCode]);
  const { customerview } = useSelector((state) => state.auth.session);
  const [treeNodes, settreeNodes] = useState([]);
  const [selectedTreeNodeKeys, setSelectedTreeNodeKeys] = useState({});

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetrightsShowT2(EmployeeCode);

      let res = resp.data.subRows;
      let res2 = [];
      let i = 0;

      res.forEach((row) => {
        res2.push(convertObj1ToObj2(row, i));
        i++;
      });

      settreeNodes(res2);

      setSelectedTreeNodeKeys(filterData2(resp.data.subRows));
    })();
  }, [EmployeeCode]);

  return (
    <Card header={<HeaderExtra Component={'User Master'} />}>
      <Loading>
        <Loader showLoader={showLoader} />
        {!isEmpty(data) && (
          <>
            <div className="grid grid-cols-7 gap-4">
              {customerview ? (
                <div className="col-span-7 ">
                  <AdaptableCard>
                    <div className="text-black">
                      <Tree
                        value={treeNodes}
                        className="w-full md:w-30rem text-black"
                        filter
                        filterMode="lenient"
                        filterPlaceholder="Filter in access"
                        selectionMode="checkbox"
                        selectionKeys={selectedTreeNodeKeys}
                        onSelectionChange={(e) =>
                          setSelectedTreeNodeKeys(e.value)
                        }
                      /></div>
                  </AdaptableCard>
                </div>
              ) : (
                <div className="col-span-9">
                  <AdaptableCard>
                    <Tree
                      value={treeNodes}
                      className="w-full md:w-30rem "
                      filter
                      filterMode="lenient"
                      filterPlaceholder="Filter in access"
                      selectionMode="checkbox"
                      selectionKeys={selectedTreeNodeKeys}
                      onSelectionChange={(e) =>
                        setSelectedTreeNodeKeys(e.value)
                      }
                    />
                  </AdaptableCard>
                </div>
              )}
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <Button
                  variant="solid"
                  size="sm"
                  onClick={() => {
                    const writes = [];
                    const reads = [];
                    // console.log(selectedTreeNodeKeys);
                    for (const [key, value] of Object.entries(
                      selectedTreeNodeKeys,
                    )) {
                      if (key.endsWith('-0')) {
                        if (validate(key.split('-')[2])) {
                          reads.push(key.split('-')[2]);
                        }
                      }
                      if (key.endsWith('-1')) {
                        if (validate(key.split('-')[2])) {
                          writes.push(key.split('-')[2]);
                        }
                      }
                    }
                    const convertedData = [];

                    reads.forEach((formCode) => {
                      const canWrite = writes.includes(formCode) ? 1 : 0;
                      const canRead = reads.includes(formCode) ? 1 : 0;
                      convertedData.push({
                        LoginCode: loginid,
                        FormCode: formCode,
                        CanRead: canRead,
                        CanWrite: canWrite,
                      });
                    });
                    writes.forEach((formCode) => {
                      if (!reads.includes(formCode)) {
                        const canWrite = writes.includes(formCode) ? 1 : 0;
                        const canRead = reads.includes(formCode) ? 1 : 0;
                        convertedData.push({
                          LoginCode: loginid,
                          FormCode: formCode,
                          CanRead: canRead,
                          CanWrite: canWrite,
                        });
                      }
                    });
                    // console.log(convertedData);
                    addRights(convertedData, tokenS, navigate);
                  }}
                >
                  Save Access
                </Button>
              </StickyFooter>
            </div>
          </>
        )}
      </Loading>
    </Card>
  );
};

export default EmployeeView;
