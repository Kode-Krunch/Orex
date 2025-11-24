import React, { useState } from 'react';
import { AdaptableCard } from 'components/shared';
import { FormItem, Upload, Tooltip, Button } from 'components/ui';
import { Field } from 'formik';
import { FcImageFile } from 'react-icons/fc';
import { GrClose } from 'react-icons/gr';

const ProfilePicture = (props) => {
  const { errors, touched, values, Emp_Image } = props;
  //console.log(Emp_Image)
  const [previewSource, setPreviewSource] = useState(
    Emp_Image ? Emp_Image : '',
  );
  const beforeUpload = (file, fileList) => {
    let valid = true;

    const allowedFileType = ['image/jpeg', 'image/png'];
    const MAX_FILE_SIZE = 500000;

    if (file) {
      for (const f of file) {
        if (!allowedFileType.includes(f.type)) {
          valid = 'Please upload a .jpeg file!';
        }

        if (f.size >= MAX_FILE_SIZE) {
          valid = 'Upload image cannot more then 500kb!';
        }
      }
    }

    return valid;
  };

  return (
    <AdaptableCard className="mb-4">
      <h5>Profile Picture</h5>
      <p className="mb-6">Add or change image for the Profile</p>
      {/* {Emp_Image ? (
                <img
                    src={`data:image/jpeg;base64,${Emp_Image}`}
                    style={{
                        height: '70px',
                        width: '100px',
                        marginBottom: 10,
                    }}
                />
            ) : null} */}
      <FormItem
        // asterisk
        label="Image"
        invalid={errors.Emp_Image && touched.Emp_Image}
        errorMessage={errors.Emp_Image}
      >
        <Field name="Emp_Image">
          {({ field, form }) => (
            <div style={{ display: 'grid' }}>
              <Upload
                // style={{ display: 'block' }}
                uploadLimit={1}
                beforeUpload={beforeUpload}
                accept=".jpg, .jpeg, .png, .bmp, .svg"
                showList={false}
                onChange={(files) => {
                  const reader = new FileReader();
                  const file = files[0];
                  if (file && file.size > 0) {
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      form.setFieldValue(field.name, reader.result);
                      setPreviewSource(reader.result);
                    };
                  } else {
                    form.setFieldValue(field.name, '');
                  }
                }}
              >
                <div className="border-dashed border-gray-500 border-2 p-3 rounded-lg w-full hover:cursor-pointer mt-1">
                  {previewSource ? (
                    <div className="flex items-center justify-center w-full">
                      <div className="relative">
                        <Tooltip title="Click to upload logo">
                          <img
                            src={previewSource}
                            style={{
                              height: '150px',
                              width: 'auto',
                            }}
                            alt="Preview"
                            className="hover:opacity-80"
                          ></img>
                        </Tooltip>
                        {/* </Upload> */}
                        <Tooltip
                          title="Remove Logo"
                          className="relative"
                          wrapperClass="absolute -top-3 -right-3"
                        >
                          <Button
                            shape="circle"
                            size="xs"
                            variant="solid"
                            color="red-500"
                            icon={<GrClose />}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              form.setFieldValue(field.name, '');
                              setPreviewSource('');
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    <div className="h-28 flex items-center justify-center w-full">
                      <Tooltip
                        title="Click to upload logo"
                        wrapperClass="flex flex-col items-center justify-center"
                      >
                        <FcImageFile size={25} />
                        <p className="text-xs mt-1 opacity-60 dark:text-white">
                          Support: jpeg, png, bmp, svg
                        </p>
                        <p className=" text-xs mt-1 opacity-60 dark:text-white">
                          (Max 1MB)
                        </p>
                      </Tooltip>
                      {/* </Upload> */}
                    </div>
                  )}
                </div>
              </Upload>
            </div>
          )}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default ProfilePicture;
