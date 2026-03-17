import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import RecipientInput from './RecipientInput';
import useSendEmail from '../hooks/useSendEmail';

const ComposeMail = ({ show, handleClose }) => {
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const { sendEmail, loading, error } = useSendEmail();

  const handleSend = async (e) => {
    e.preventDefault();

    if (recipients.length === 0 || !subject || !body || body === '<p><br></p>') {
      // Local validation error could be handled by a separate local state,
      // but the button covers it. We'll just return.
      return;
    }

    const success = await sendEmail({
      receivers: recipients,
      subject,
      body,
    });

    if (success) {
      alert('Email sent successfully!');
      setRecipients([]);
      setSubject('');
      setBody('');
      handleClose();
    }
  };

  const isFormValid = recipients.length > 0 && subject.trim() !== '' && body.trim() !== '' && body !== '<p><br></p>';

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered fullscreen="md-down">
      <Modal.Header closeButton>
        <Modal.Title>New Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSend}>
          <Form.Group className="mb-3">
            <RecipientInput recipients={recipients} setRecipients={setRecipients} />
          </Form.Group>
          <hr />
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Form.Group>
          <hr />
          <Form.Group className="mb-3">
            <ReactQuill 
              theme="snow" 
              value={body} 
              onChange={setBody} 
              placeholder="Compose your mail..."
              style={{ height: '200px', marginBottom: '50px' }}
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Discard
            </Button>
            <Button variant="primary" type="submit" disabled={!isFormValid || loading}>
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ComposeMail;
