import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FiSend } from 'react-icons/fi';
import Fade from '@mui/material/Fade';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 40px 0 60px 0;
  background: ${({ theme }) => theme.card};
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const CTA = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin: 18px 0 8px 0;
  text-align: center;
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-align: center;
  background: linear-gradient(90deg, #00C9A7 0%, #845EC2 100%);
  padding: 14px 0;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: filter 0.2s;
  &:hover, &:focus {
    filter: brightness(1.08);
    outline: 2px solid ${({ theme }) => theme.primary};
  }
`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [showMailSent, setShowMailSent] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_yss8ol2', 'template_u2rqybq', form.current, 'HP9B63gflGBAw8cfp')
      .then(
        (result) => {
          setOpen(true);
          setError(false);
          form.current.reset();
          setShowMailSent(true);
          setTimeout(() => setShowMailSent(false), 4000);
        },
        (error) => {
          setError(true);
          console.log(error.text);
        }
      );
  };

  // Defensive container for Snackbar to avoid null errors
  const getSnackbarContainer = () => (typeof window !== 'undefined' && document.body ? document.body : undefined);

  return (
    <Container id="contact">
      <Wrapper>
        <Title>
          <FiSend style={{ color: '#845EC2', fontSize: 36 }} />
          Contact
        </Title>
        <CTA>Let's Work Together</CTA>
        <Desc>
          I'm always open to new opportunities, collaborations, or just a friendly chat. Fill out the form below or email me directly—let's build something great together!
        </Desc>
        {showMailSent && (
          <div style={{
            color: '#00C9A7',
            fontWeight: 700,
            fontSize: 20,
            margin: '18px 0 8px 0',
            textAlign: 'center',
            background: 'rgba(0, 201, 167, 0.08)',
            borderRadius: 8,
            padding: '10px 0',
            boxShadow: '0 2px 8px rgba(0,201,167,0.08)'
          }}>
            Mail sent!
          </div>
        )}
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" type="email" required />
          <ContactInput placeholder="Your Name" name="from_name" type="text" required />
          <ContactInput placeholder="Subject" name="subject" type="text" required />
          <ContactInputMessage placeholder="Message" rows="4" name="message" required />
          <ContactButton type="submit">
            <FiSend style={{ fontSize: 22 }} /> Send
          </ContactButton>
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          disablePortal
          TransitionComponent={Fade}
        >
          <Alert onClose={() => setOpen(false)} severity="success">
            Email sent successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={() => setError(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          disablePortal
          TransitionComponent={Fade}
        >
          <Alert onClose={() => setError(false)} severity="error">
            Failed to send email. Please try again.
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
