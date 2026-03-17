import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { IoMailOutline } from 'react-icons/io5';
import useAuth from '../hooks/useAuth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!email || !password || !confirmPassword) {
      // Local validation could technically still be handled if needed,
      // but button is disabled anyway.
      return;
    }

    if (password !== confirmPassword) {
      // This is a local validation error, we could add a local state for it,
      // but for simplicity we'll just return as the API also validates it.
      return;
    }

    const isSuccessful = await signup({ email, password, confirmPassword });
    if (isSuccessful) {
      console.log('User has successfully signed up.');
      setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const isFormValid = email && password && confirmPassword;

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-5">
                <div className="bg-primary text-white rounded-circle d-inline-flex p-3 mb-3 shadow-lg">
                  <IoMailOutline size={40} />
                </div>
                <h2 className="fw-bold text-dark">Create Account</h2>
                <p className="text-muted">Join us to manage your emails better</p>
              </div>

              {error && <Alert variant="danger" className="py-2 small border-0 shadow-sm mb-4">{error}</Alert>}
              {success && <Alert variant="success" className="py-2 small border-0 shadow-sm mb-4">Account created! Redirecting...</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="small fw-bold text-secondary">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2 px-3 shadow-none border-secondary-subtle"
                    style={{ borderRadius: '10px' }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="small fw-bold text-secondary">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create complex password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="py-2 px-3 border-end-0 shadow-none border-secondary-subtle"
                      style={{ borderRadius: '10px 0 0 10px' }}
                      required
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="bg-white border-start-0 border-secondary-subtle px-3"
                      style={{ borderRadius: '0 10px 10px 0' }}
                    >
                      {showPassword ? <FaEyeSlash className="text-muted" size={18} /> : <FaEye className="text-muted" size={18} />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-5" controlId="formConfirmPassword">
                  <Form.Label className="small fw-bold text-secondary">Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="py-2 px-3 border-end-0 shadow-none border-secondary-subtle"
                      style={{ borderRadius: '10px 0 0 10px' }}
                      required
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="bg-white border-start-0 border-secondary-subtle px-3"
                      style={{ borderRadius: '0 10px 10px 0' }}
                    >
                      {showConfirmPassword ? <FaEyeSlash className="text-muted" size={18} /> : <FaEye className="text-muted" size={18} />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2 mb-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={!isFormValid || loading}
                    className="py-2 fw-bold shadow border-0"
                    style={{ borderRadius: '10px', height: '50px' }}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </div>

                <div className="text-center small text-muted">
                  Already have an account? <Link to="/login" className="fw-bold text-decoration-none text-primary">Login</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;


