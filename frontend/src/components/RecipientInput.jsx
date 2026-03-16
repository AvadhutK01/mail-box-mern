import { useState, useEffect, useRef } from 'react';
import { Badge, Form, ListGroup } from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoint';

const RecipientInput = ({ recipients, setRecipients }) => {
  const [inputValue, setInputValue] = useState('');
  const [previousRecipients, setPreviousRecipients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.GET_PREVIOUS_RECIPIENTS);
        setPreviousRecipients(response.data);
      } catch (err) {
        console.error('Failed to fetch recipients', err);
      }
    };
    fetchRecipients();
  }, []);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = previousRecipients.filter(
        (email) => 
          email.toLowerCase().includes(inputValue.toLowerCase()) && 
          !recipients.includes(email)
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, recipients, previousRecipients]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addRecipient = (email) => {
    const trimmedEmail = email.trim();
    if (trimmedEmail && !recipients.includes(trimmedEmail)) {
      setRecipients([...recipients, trimmedEmail]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue) {
      e.preventDefault();
      addRecipient(inputValue);
    }
  };

  const removeRecipient = (emailToRemove) => {
    setRecipients(recipients.filter((email) => email !== emailToRemove));
  };

  return (
    <div className="recipient-input-container position-relative" ref={dropdownRef}>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {recipients.map((email) => (
          <Badge 
            key={email} 
            bg="light" 
            text="dark" 
            className="d-flex align-items-center py-2 px-3 border"
            style={{ borderRadius: '20px', fontWeight: 'normal' }}
          >
            {email}
            <IoCloseOutline 
              size={18} 
              className="ms-2" 
              onClick={() => removeRecipient(email)} 
              role="button"
              style={{ cursor: 'pointer' }}
            />
          </Badge>
        ))}
      </div>
      <Form.Control
        type="text"
        placeholder={recipients.length === 0 ? "Recipients" : ""}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border-0 p-0"
        style={{ boxShadow: 'none' }}
        autoComplete="off"
      />
      {showSuggestions && (
        <ListGroup 
          className="position-absolute w-100 mt-1 shadow-sm" 
          style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
        >
          {suggestions.map((email) => (
            <ListGroup.Item 
              key={email} 
              action 
              onClick={() => addRecipient(email)}
              className="py-2"
            >
              {email}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default RecipientInput;
