const processData = {
  id: 'abcd',
  title: 'process',
  allowedUsers: [],
  createdAt: '',
  updateAt: '',
  deletedAt: false,
  // deActivate: false, // can we just name it disabled !!
  forms: [
    {
      id: 'abcdefg',
      serialNumber: 1,
      title: 'form',
      // color: 'blue',
      allowedUsers: [],
      // formLogs: [],
      createdAt: '',
      updateAt: '',
      deletedAt: false,
      components: [
        {
          id: 'xyz',
          serialNumber: 1,
          type: 'sidebarItem', //react DND type for drag and drop
          inputType: 'text', // HTML input type
          fieldName: 'singleLine', // unique name as per BRD
          deletedAt: false,
          title: 'Company Name',
          response: {
            data: null, // will be set at the time of form filling can be string, array, object, boolean, // need to send json.stringify()
            createdBy: '',
          },
          details: {
            // need to send json.stringify()
            placeHolder: 'type here...',
            defaultValue: '',
            steps: 1,
            required: false, // just to add * sign in label if required
            options: [],
          },
          allowedUsers: [],
          validations: [], // need to send json.stringify()
        },
      ],
    },
  ],
};

export default processData;
