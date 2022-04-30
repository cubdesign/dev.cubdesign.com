import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

const StyledHeader = styled("header")`
  display: flex;
  flex: 1;
  padding: 2rem 2rem;
  justify-content: start;
  align-items: center;
  background-color: #000000;
  color: #ffffff;
`;

const LogoImage = styled("span")`
  height: 3em;

  margin-right: 0.5rem;
`;

const LogoText = styled("span")`
  vertical-align: middle;
  font-size: 2rem;
`;

const DevText = styled("span")`
  font-size: 10px;
  color: #f406c8;
  padding-left: 0.5rem;
`;

const Logo = styled("a")`
  display: flex;
  flex: 1;
  justify-content: start;
  align-items: center;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link href="/" passHref>
        <Logo>
          <LogoImage>
            <Image
              src="/static/cubdesign-logo-circle.png"
              alt="cubdesign Logo"
              width={16 * 3}
              height={16 * 3}
            />
          </LogoImage>
          <LogoText>cubdesign</LogoText>
          <DevText>DEV</DevText>
        </Logo>
      </Link>
    </StyledHeader>
  );
};

export default Header;
