import React from 'react';

export default function useDisclosure() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
  };
}
