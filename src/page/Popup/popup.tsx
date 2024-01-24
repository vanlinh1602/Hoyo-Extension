import React from 'react';
import {  Button, notification, Space, Form, Input, Typography } from 'antd';

const Popup = () => {
	const [form] = Form.useForm();
	const handleGetCookie = async () => {
		const {discordId} = await form.validateFields();
		chrome.runtime.sendMessage({type: 'GET_COOKIE', data: { discordId }}, (response) => {
			if (response) {
				console.log(response);
				notification.success({
					message: 'Success',
					description: 'Successfully synced account!',
					duration: 3
				});
			}
		});
	};

	return (
		<Space direction="vertical" style={{width: 250}}>
			<Form form={form}>
				<Form.Item name='discordId' label="Discord ID">
					<Input/>
				</Form.Item>
				<Button type='primary' onClick={handleGetCookie}>Sync Account</Button>
			</Form>
		</Space>
	);
};

export default Popup;