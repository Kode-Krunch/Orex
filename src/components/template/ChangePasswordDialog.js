// ChangePasswordDialog.js
import React, { useState } from 'react';
import { Dialog, Button, Input, Notification, toast as toastwe } from 'components/ui';
import { HiOutlineUser, HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';
import { loginupdate } from 'services/MasterService';

const passwordRequirements = {
  minLength: 8,
  uppercase: true,
  lowercase: true,
  number: true,
  symbol: true,
};

const ChangePasswordDialog = ({ isOpen, onClose, LoginId, Username, token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const validatePassword = (pw) => {
    const err = [];
    if (pw.length < passwordRequirements.minLength) err.push('Min 8 characters.');
    if (!/[A-Z]/.test(pw)) err.push('One uppercase letter required.');
    if (!/[a-z]/.test(pw)) err.push('One lowercase letter required.');
    if (!/\d/.test(pw)) err.push('One number required.');
    if (!/[^a-zA-Z0-9]/.test(pw)) err.push('One special character required.');
    setErrors(err);
    return err.length === 0;
  };

  const handleSubmit = () => {
    if (!validatePassword(password) || password !== confirmPassword) return;

    loginupdate(LoginId, { password }, token).then((resp) => {
      if (resp.status === 200) {
        toastwe.push(<Notification title="Success" type="success">Password updated!</Notification>);
        onClose();
        setPassword('');
        setConfirmPassword('');
      } else {
        toastwe.push(<Notification title="Error" type="danger">{resp.detail || 'Update failed.'}</Notification>);
      }
    });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} width={400}>
      <div className="p-6">
        <h5 className="mb-4">Change Password</h5>
        <Input
          placeholder="Username"
          prefix={<HiOutlineUser />}
          value={Username}
          disabled
          className="mb-4"
        />
        <Input
          type={showPw ? 'text' : 'password'}
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => validatePassword(password)}
          suffix={<span className="cursor-pointer" onClick={() => setShowPw(!showPw)}>{showPw ? <HiOutlineEyeOff /> : <HiOutlineEye />}</span>}
          className="mb-2"
        />
        <Input
          type={showConfirmPw ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          suffix={<span className="cursor-pointer" onClick={() => setShowConfirmPw(!showConfirmPw)}>{showConfirmPw ? <HiOutlineEyeOff /> : <HiOutlineEye />}</span>}
        />
        {errors.length > 0 && (
          <ul className="text-red-600 text-sm mt-2">
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        )}
        {password && confirmPassword && password !== confirmPassword && (
          <div className="text-red-500 text-sm mt-1">Passwords do not match.</div>
        )}
        <div className="text-right mt-6">
          <Button variant="plain" className="mr-2" onClick={onClose}>Cancel</Button>
          <Button variant="solid" disabled={errors.length > 0 || password !== confirmPassword} onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangePasswordDialog;
