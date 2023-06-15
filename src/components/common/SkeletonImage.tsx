import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const EVENT_IMAGE_LOAD = 'load';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: React.CSSProperties['objectFit'];
  style?: React.CSSProperties;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  unoptimized?: boolean;
};

function SkeletonImage(props: Props) {
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const {
    src,
    alt,
    style,
    objectFit = 'fill',
    width,
    height,
    priority,
    placeholder = 'empty',
    unoptimized = false,
    ...restProps
  } = props;

  const fill = !Boolean(width) || !Boolean(height);

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

  return (
    <Wrapper width={width} height={height} style={style} objectFit={objectFit} {...restProps}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={fill ? 'fill' : 'non-fill'}
        priority={priority}
        placeholder={placeholder}
        unoptimized={unoptimized}
      />

      {!isLoaded && <SkeletonBox />}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'width' | 'height' | 'objectFit'>;
const Wrapper = styled.div<StyleProps>`
  position: relative;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width ?? '100%')};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};

  img {
    object-fit: ${({ objectFit }) => objectFit};
  }

  img.fill {
    position: relative !important;
    width: 100% !important;
    height: ${({ height }) => (height ? '100%' : 'auto')} !important;
  }
`;

const LeftToRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const SkeletonBox = styled.div`
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
