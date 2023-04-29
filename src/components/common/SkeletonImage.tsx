import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const EVENT_IMAGE_LOAD = 'event_image_load';
const THRESHOLD = 0.5;

const onIntersection = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(EVENT_IMAGE_LOAD));
    }
  });
};

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
}

function SkeletonImage(props: Props) {
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const { src, alt, style, width, height, priority, placeholder = 'empty', ...restProps } = props;

  React.useEffect(() => {
    const handleLoadImage = () => setIsLoaded(true);

    const imageElement = imageRef.current as HTMLImageElement;
    if (imageElement) {
      imageElement.addEventListener(EVENT_IMAGE_LOAD, handleLoadImage);
      return () => {
        imageElement.removeEventListener(EVENT_IMAGE_LOAD, handleLoadImage);
      };
    }
  }, [imageRef]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, { threshold: THRESHOLD });
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
  }, [imageRef]);

  return (
    <Wrapper width={width} height={height} style={style} {...restProps}>
      <Image
        ref={imageRef}
        priority={priority}
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder={placeholder}
      />
      {!isLoaded && <SkeletonBox width={width} height={height} />}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'width' | 'height'>;
const Wrapper = styled.div<StyleProps>`
  position: relative;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
`;

const LeftToRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const SkeletonBox = styled.div<StyleProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: -50%;
  transform: translateY(50%);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray100};

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    background: linear-gradient(
      to right,
      transparent,
      transparent,
      #eaeaea,
      transparent,
      transparent
    );
    animation: ${LeftToRight} 1.2s infinite;
  }
`;

export default SkeletonImage;