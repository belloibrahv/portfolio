import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FiSend, FiMapPin, FiClock, FiBriefcase, FiMail } from 'react-icons/fi';
import Fade from '@mui/material/Fade';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 70px 24px 90px;
  overflow: hidden;
  background: radial-gradient(circle at 15% 15%, rgba(0, 201, 167, 0.08), transparent 35%),
    radial-gradient(circle at 85% 10%, rgba(132, 94, 194, 0.12), transparent 35%);
  @media (max-width: 768px) {
    padding: 40px 16px 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  position: relative;
  z-index: 1;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  border-radius: 999px;
  filter: blur(60px);
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
  @keyframes floatGlow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-18px); }
  }
  animation: floatGlow 16s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const GlowOne = styled(BackgroundGlow)`
  width: 320px;
  height: 320px;
  left: -120px;
  top: 120px;
  background: radial-gradient(circle, rgba(0, 201, 167, 0.45), transparent 70%);
`;

const GlowTwo = styled(BackgroundGlow)`
  width: 360px;
  height: 360px;
  right: -120px;
  top: 40px;
  animation-delay: 2s;
  background: radial-gradient(circle, rgba(132, 94, 194, 0.55), transparent 70%);
`;

const ContactLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(320px, 520px);
  gap: 36px;
  align-items: start;
  margin-top: 10px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeUp 0.7s ease-out 0.05s both;
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeUp 0.7s ease-out 0.15s both;
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const CTA = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin-top: 14px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
  border-radius: 14px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  animation: cardFloat 10s ease-in-out infinite;
  &:nth-child(2) { animation-delay: 1.6s; }
  &:nth-child(3) { animation-delay: 3.2s; }
  &:hover {
    border-color: rgba(132, 94, 194, 0.35);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const InfoIcon = styled.div`
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 201, 167, 0.8) 0%, rgba(132, 94, 194, 0.9) 100%);
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
`;

const InfoContent = styled.div``;
const InfoLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;
const InfoText = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.5;
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card};
  padding: 28px;
  border-radius: 18px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
  margin-top: 20px;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
  backdrop-filter: blur(6px);
  animation: formRise 0.7s ease-out 0.1s both;
  @keyframes formRise {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  @media (max-width: 640px) {
    padding: 24px;
    margin-top: 16px;
  }
`;

const ContactTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 4px;
`;

const ContactInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.text_secondary}30;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 14px 18px;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(132, 94, 194, 0.18);
  }
  @media (max-width: 640px) {
    padding: 12px 16px;
    font-size: 15px;
  }
`;

const ContactInputMessage = styled.textarea`
  width: 100%;
  min-height: 120px;
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.text_secondary}30;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 14px 18px;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(132, 94, 194, 0.18);
  }
  @media (max-width: 640px) {
    padding: 12px 16px;
    font-size: 15px;
  }
`;

const ContactButton = styled.button`
  width: 100%;
  min-height: 48px;
  text-align: center;
  background: linear-gradient(90deg, #00C9A7 0%, #845EC2 50%, #00C9A7 100%);
  background-size: 200% 100%;
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: filter 0.2s, transform 0.2s, background-position 0.5s ease;
  &:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
    background-position: 100% 0%;
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
  }
  @media (max-width: 480px) {
    min-height: 44px;
    font-size: 16px;
    padding: 12px 16px;
  }
`;

const MessageSent = styled.div`
  color: #00C9A7;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  background: rgba(0, 201, 167, 0.08);
  border-radius: 12px;
  padding: 12px 18px;
  box-shadow: 0 6px 18px rgba(0,201,167,0.12);
  animation: popIn 0.5s ease-out both;
  @keyframes popIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
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
        (err) => {
          setError(true);
          console.log(err.text);
        }
      );
  };

  return (
    <Container id="contact">
      <GlowOne />
      <GlowTwo />
      <Wrapper>
        <Title>
          <FiSend style={{ color: '#845EC2', fontSize: 36 }} />
          Get In Touch
        </Title>
        <CTA>Let's Talk About Your Product</CTA>
        <Desc>
          Software Engineer focused on building reliable, scalable web products end to end.
          I help teams design, build, and improve modern applications, from user
          interfaces and APIs to deployment and performance.
        </Desc>
        <ContactLayout>
          <LeftPanel>
            <InfoGrid>
              <InfoCard>
                <InfoIcon><FiBriefcase /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Expertise</InfoLabel>
                  <InfoText>Product engineering, UI architecture, API design, performance</InfoText>
                </InfoContent>
              </InfoCard>
              <InfoCard>
                <InfoIcon><FiMapPin /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Collaboration</InfoLabel>
                  <InfoText>Full-time roles, contract work, or consulting engagements</InfoText>
                </InfoContent>
              </InfoCard>
              <InfoCard>
                <InfoIcon><FiClock /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Availability</InfoLabel>
                  <InfoText>Open to new opportunities and project discussions</InfoText>
                </InfoContent>
              </InfoCard>
            </InfoGrid>
          </LeftPanel>
          <RightPanel>
            {showMailSent && (
              <MessageSent>
                Message sent! I'll get back to you soon.
              </MessageSent>
            )}
            <ContactForm ref={form} onSubmit={handleSubmit}>
              <ContactTitle>Send a message</ContactTitle>
              <ContactInput placeholder="Your Email" name="from_email" type="email" required />
              <ContactInput placeholder="Your Name" name="from_name" type="text" required />
              <ContactInput placeholder="Subject (e.g. Project inquiry)" name="subject" type="text" required />
              <ContactInputMessage placeholder="Tell me about your project or opportunity..." rows="4" name="message" required />
              <ContactButton type="submit">
                <FiMail style={{ fontSize: 20 }} /> Send Message
              </ContactButton>
            </ContactForm>
          </RightPanel>
        </ContactLayout>
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
