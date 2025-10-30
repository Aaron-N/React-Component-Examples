import { CopyIcon } from '@/components/base/CopyIcon';
import React, { useState, useEffect } from 'react';
import { RedErrorIcon } from '@/components/base/RedErrorIcon';
import { cn } from '@/utils';
import { CopiedOkIcon } from '@/components/base/CopiedOkIcon';

const MAXIMUM_URL_LENGTH = 2083;

enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
  NONE = 'none'
}

export function CopyLinkButton({ url }: { url: string }) {
  const [errorMessage, setErrorMessage] = useState(Status.NONE);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (errorMessage === Status.ERROR) {
      setErrorMessage(Status.NONE);
    }
    if (url.length > 2083) {
      setErrorMessage(Status.ERROR);
    } else {
      setErrorMessage(Status.SUCCESS);
    }
  }, [errorMessage, url.length]);

  // Function to copy text to clipboard
  const copyToClipboard = async () => {
    try {
      if (url.length <= MAXIMUM_URL_LENGTH) {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      }
    } catch (error: unknown) {
      alert('An error occurred. Please try again.');
    }
  };

  let styling, icon, buttonTitle, buttonBackground, disabled;

  if (errorMessage === 'success') {
    styling = cn(
      'btn-black',
      'btn',
      'flex',
      'w-full',
      'cursor-default',
      'items-center',
      'justify-between',
      'rounded-[28px]',
      'pr-1',
      'font-normal',
      'text-white'
    );
    icon = isCopied ? (
      <CopiedOkIcon width={32} height={32} />
    ) : (
      <CopyIcon width={16} height={16} className="text-white" />
    );
    buttonTitle = isCopied ? 'Link copied!' : 'Copy link';
    buttonBackground = cn('btn', 'btn-circle', 'btn-sm', 'h-[38px]', 'w-[38px]', 'bg-[#FFFFFF1A]');
    disabled = false;
  } else {
    styling = cn(
      'btn-black',
      'btn',
      'border-2',
      'border-[#E04837]',
      'flex',
      'w-full',
      'cursor-not-allowed',
      'items-center',
      'justify-between',
      'rounded-[28px]',
      'pr-1',
      'font-normal',
      'text-[#FFFFFF80]'
    );
    icon = (
      <>
        {' '}
        <RedErrorIcon width={24} height={24} aria-label="Message Icon" />
      </>
    );
    buttonTitle = 'Error';
    buttonBackground = cn('btn', 'btn-circle', 'btn-sm', 'h-[38px]', 'w-[38px]', 'bg-[#272E50]', 'cursor-not-allowed');
    disabled = true;
  }

  return (
    <div className={styling}>
      <div
        style={{
          width: 'calc(100% - 48px)' // Adjusted width for proper alignment
        }}
        title={url}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {url}
      </div>
      <button
        type="button"
        className={buttonBackground}
        onClick={disabled ? undefined : copyToClipboard}
        title={buttonTitle}
      >
        {icon}
      </button>
    </div>
  );
}