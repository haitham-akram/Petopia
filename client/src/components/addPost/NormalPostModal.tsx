import {
  Modal, Form, Input, Upload, Card, message,
} from 'antd';
import { MessageAdd1, DirectInbox } from 'iconsax-react';
import { useContext, useState } from 'react';
import axios from 'axios';
import Paragraph from '../commons/Paragraph';
import ImageComponent from '../commons/Image';
import Box from '../commons/Box';
import { AuthContext } from '../context/AuthContext';
import uploadToCloudinary from '../../helpers/uploadToCloudinary';
import { ICategory } from '../../interfaces';

const { TextArea } = Input;

const NormalPostModal = ({
  visible, onClose, category,
} :
{ visible: boolean; onClose: () => void, category:ICategory }) => {
  const { userData } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const normFile = (e: { fileList: unknown; }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const addNormalPost = async () => {
    try {
      await form.validateFields();
      const images = form.getFieldValue('images');
      if (images && images.length > 0) {
        const imageUrls = await Promise.all(images.map(uploadToCloudinary));
        form.setFieldsValue({ images: imageUrls });
      }
      await axios.post('/api/v1/posts/', {
        postContent: form.getFieldValue('postContent'),
        isHaveImg: (!!images),
        imagesUrl: form.getFieldValue('images'),
        categoryId: category.categoryId,
      });

      form.resetFields();
      message.success('Post added successfully');
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await addNormalPost();
      setConfirmLoading(false);
    } catch (error) {
      message.error('Something went wrong');
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={`Add ${category.title} post`}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add Post"
      width={650}
      style={{ top: 20 }}
      confirmLoading={confirmLoading}
      className="addPost--addPostModal"
    >
      <Form
        form={form}
        name="post-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        style={{ maxWidth: 600, display: 'flex', flexDirection: 'column' }}
      >
        <Card className="addPost--modalCard">
          <Box className="addPost">
            <ImageComponent
              src={userData.userImage}
              alt="image"
              className="addPost--user-img"
              width="40px"
              height="40px"
            />
            <Form.Item
              name="postContent"
              rules={[{ required: true, message: "Post content can't be empty" }]}
              messageVariables={{ label: 'post-content' }}
            >
              <TextArea
                className="addPost--post-field"
                style={{ height: 90, width: 490 }}
                placeholder={`What's in your mind, ${userData.fullName}?`}
              />
            </Form.Item>
            <MessageAdd1 className="add" />
          </Box>
          <Form.Item className="addPost--uploadField">
            <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger
                action=""
                listType="picture"
                multiple
                beforeUpload={() => false}
                onChange={({ fileList }) => {
                  form.setFieldsValue({ images: fileList });
                }}
              >
                <Paragraph className="addPost--ant-upload-drag-icon">
                  <DirectInbox />
                </Paragraph>
                <Paragraph>Click or drag images to this area to upload</Paragraph>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Card>
      </Form>
    </Modal>
  );
};

export default NormalPostModal;
