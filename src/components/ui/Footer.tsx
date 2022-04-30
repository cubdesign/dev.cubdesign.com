import styled from "@emotion/styled";
import Image from "next/image";

const StyledFooter = styled("footer")`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;

const LogoImageMini = styled("span")`
  height: 1em;
  margin-left: 0.5rem;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <a href="https://cubdesign.com" target="_blank" rel="noopener noreferrer">
        &copy; 2022
        <LogoImageMini>
          <Image
            src="/static/cubdesign-logo-circle.png"
            alt="cubdesign Logo"
            width={16}
            height={16}
          />
        </LogoImageMini>
        cubdesign
      </a>
    </StyledFooter>
  );
};

export default Footer;
