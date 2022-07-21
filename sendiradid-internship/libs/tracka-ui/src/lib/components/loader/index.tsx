import Image from 'next/image';
import styled from '@emotion/styled';
import Logo from './Logo.svg';

const AnimatedLoader = styled(Image)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 1.6s cubic-bezier(0.125, 0.69, 0.25, -0.88) infinite;
`;
export const Loader = () => {
  return (
    <AnimatedLoader
      priority
      src={Logo}
      alt="Tracka Logo"
      width={100}
      height={100}
    />
  );
};
