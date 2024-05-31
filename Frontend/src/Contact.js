import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return <Wrapper>
    <h2 className="common-heading">Contact Page</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.4580992295714!2d72.81789177486512!3d22.59936243198973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e50c43cdea6c7%3A0x5074fe9e0c1c8bd!2sCharotar%20University%20of%20Science%20and%20Technology%20(CHARUSAT)!5e0!3m2!1sen!2sin!4v1706502527627!5m2!1sen!2sin" width="100%" height="500"  style={{border: 0 }}  allowFullscreen=""  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

    <div className="container">
      <div className="contact-form">
        <form action="https://formspree.io/f/mnqejwwa" method="POST" className="contact-inputs">
          <input type="text" placeholder="username" name="username" required autoComplete="off"></input>
          <input type="email" placeholder="Email" name="Email" required autoComplete="off"></input>
          <textarea name="Message" cols="30" rows="10" required autoComplete="off" placeholder="Enter your message"></textarea>
          <input type="submit" value="send"></input>
        </form>

      </div>
    </div>
  </Wrapper>;
};

export default Contact;
