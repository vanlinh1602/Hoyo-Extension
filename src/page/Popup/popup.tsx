import { Avatar, Button, Row, Space, Typography } from 'antd';
import React, { useEffect } from 'react';

const Popup = () => {
  const [isHasCookie, setIsHasCookie] = React.useState(false);
  useEffect(() => {
    chrome.cookies.getAll({ name: 'ltoken_v2', domain: '.hoyolab.com' }, (cookies) => {
      setIsHasCookie(cookies.length > 0);
    });
  }, []);

  return (
    <Space direction="vertical" style={{ width: 250 }}>
      <Row align="middle">
        <Avatar size="large" src="/icon.png" />
        <Typography.Title level={5} style={{ margin: '0px 20px' }}>
          Hoyo Bot
        </Typography.Title>
      </Row>
      {!isHasCookie ? (
        <div>
          <Typography.Text type="success">You have logged in to the game</Typography.Text>
          <Button
            type="primary"
            onClick={() => {
              chrome.tabs.create({
                url: `chrome-extension://${chrome.runtime.id}/options.html`,
              });
            }}
          >
            Sync Account
          </Button>
        </div>
      ) : (
        <div>
          <Typography.Text type="danger">Please login to the game first</Typography.Text>
          <Button
            type="primary"
            onClick={() => {
              chrome.tabs.create({
                url: 'https://www.hoyolab.com/',
              });
            }}
          >
            Go to login
          </Button>
        </div>
      )}
    </Space>
  );
};

export default Popup;
