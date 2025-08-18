import { KeyboardEvent } from 'react';

export const onPressEnter = (submit: () => void, textVerification: string) => {
  return (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (textVerification.trim()) submit();
    }
  };
};
