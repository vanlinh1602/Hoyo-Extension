import { Button, Form, Input, notification, Space } from 'antd';
import React from 'react';

import { post } from '../../api';
import { cookiesGet } from '../../lib/options';

const Popup = () => {
  const [form] = Form.useForm();
  const handleGetCookie = async () => {
    const { discordId } = await form.validateFields();
    const cookies = await chrome.cookies.getAll({ domain: '.hoyolab.com' });
    const upload: {
      discordId: string,
      cookies: { [T: string]: string },
    } = {
      discordId,
      cookies: {},
    };
    Object.entries(cookiesGet).forEach(([key, value]) => {
      const cookieFind = cookies.find((cookie) => cookie.name === value);
      upload.cookies[key] = cookieFind?.value || '';
    });
    console.log(upload);

    const result = await post('/api/syncToken', upload);
    if (result) {
      notification.success({
        message: 'Success',
        description: 'Successfully synced account!',
        duration: 3,
      });
    } else {
      notification.error({
        message: 'Error',
        description: 'Failed to sync account!',
        duration: 3,
      });
    }
  };

  return (
    <Space direction="vertical" style={{ width: 250 }}>
      <Form form={form}>
        <Form.Item name="discordId" label="Discord ID">
          <Input />
        </Form.Item>
        <Button type="primary" onClick={handleGetCookie}>
          Sync Account
        </Button>
      </Form>
    </Space>
  );
};

export default Popup;
