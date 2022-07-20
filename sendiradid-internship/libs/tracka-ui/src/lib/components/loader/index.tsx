import Image from 'next/image';
import styled from '@emotion/styled';

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
  // your styles here
  height: 200px; // example
  width: 200px;
`;
export const Loader = () => {
  return (
    <AnimatedLoader
      src="/Logo.svg"
      alt="Tracka Logo"
      width={100}
      height={100}
    />
  );
};
