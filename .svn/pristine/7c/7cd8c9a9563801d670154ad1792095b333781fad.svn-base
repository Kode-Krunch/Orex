import { PostEmp, PutEmp } from 'services/MasterService';
const AddLocation = async (
  values,
  token,
  setMessage,
  setlog,
  navigate,
  Username,
) => {
  try {
    const resp = await PostEmp(values, token);
    if (resp.data.code == 200) {
      setlog('success');
      setMessage('Data Inserted Successfully.');
      setTimeout(() => {
        navigate('/UserMaster');
      }, 2000);
      return;
    } else if (resp.data.msg === 'Server Error.') {
      setlog('error');
      setMessage('Server Error.');
      return;
    }
  } catch (errors) {
    return {};
  }
};

const EditLocation = async (
  values,
  token,
  setMessage,
  setlog,
  navigate,
  Username,
) => {
  try {
    const resp = await PutEmp(values, token);
    if (resp.data.code == 200) {
      setlog('success');
      setMessage('Data Updated Successfully');
      setTimeout(() => {
        navigate('/UserMaster');
      }, 2000);
      return;
    } else if (resp.data.msg === 'Location is Already Exists') {
      setlog('warning');
      setMessage(resp.data.msg);
      return;
    }
  } catch (errors) {
    return {};
  }
};

export { AddLocation, EditLocation };
