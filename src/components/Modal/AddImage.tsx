import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import Uppy from '@uppy/core';
import { DashboardModal, useUppy } from '@uppy/react';
import React from 'react';

interface AddImageProps {
  modalOpen: boolean;
  handleClose: () => void;
  addNewImageHandler: (files: any[]) => void;
}

const AddImage = (props: AddImageProps) => {
  const { handleClose, modalOpen, addNewImageHandler } = props;

  const uppy = useUppy(() => {
    const upy = new Uppy({
      autoProceed: false,
      debug: false,
      restrictions: {
        minNumberOfFiles: 1,
        maxNumberOfFiles: 10,
        maxFileSize: 10485760,
        allowedFileTypes: ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx', '.txt'],
      },
    }).on('complete', (response) => {
      const files = response.successful.map((file) => file.data);
      addNewImageHandler(files);
      handleClose();
      upy.cancelAll();
    });

    return upy;
  });

  React.useEffect(() => {
    return () => {
      uppy.close();
    };
  }, []);

  return (
    <>
      <DashboardModal
        showSelectedFiles
        uppy={uppy}
        closeModalOnClickOutside={false}
        closeAfterFinish
        open={modalOpen}
        onRequestClose={handleClose}
        plugins={['Webcam']}
        proudlyDisplayPoweredByUppy={false}
      />
    </>
  );
};

export default AddImage;
