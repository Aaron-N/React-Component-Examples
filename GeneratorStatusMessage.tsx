'use client';
import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { generatorAtom } from '@/components/home/generator/store/atoms';
import { GreenCheckIcon } from '@/components/base/GreenCheckIcon';
import { RedErrorIcon } from '@/components/base/RedErrorIcon';
import { cn } from '@/utils';

const SUCCESS_TITLE = 'Success.';
const SUCCESS_MSG = 'Please copy the link before generating another one.';

const ERROR_TITLE = 'Error.';
const ERROR_MSG = 'Generated link exceeds character limit of 2083 characters. Try again.';

export function GeneratorStatusMessage() {
  const [generatorValues] = useAtom(generatorAtom);
  const [errorMessage, setErrorMessage] = useState('none');
  useEffect(() => {
    const showToastMessage = generatorValues.lastUrl.length;
    if (generatorValues.lastUrl !== '') {
      if (showToastMessage > 2083) {
        setErrorMessage('error');
      } else {
        setErrorMessage('success');
      }
      setTimeout(() => {
        setErrorMessage('none');
      }, 6000);
    }
  }, [generatorValues.lastUrl]);

  let title, msg, styling, Icon;

  if (errorMessage === 'success') {
    title = SUCCESS_TITLE;
    msg = SUCCESS_MSG;
    styling = cn(
      'flex',
      'flex-row',
      'gap-4',
      'rounded-lg',
      'border',
      'border-t-8',
      'border-neutral-400',
      'border-t-[#5FCC5A]',
      'bg-[#F6FCF5]',
      'px-2',
      'py-4',
      'shadow-lg'
    );
    Icon = GreenCheckIcon;
  } else {
    title = ERROR_TITLE;
    msg = ERROR_MSG;
    styling = cn(
      'flex',
      'flex-row',
      'gap-4',
      'rounded-lg',
      'border',
      'border-t-8',
      'border-neutral-400',
      'border-t-[#E04837]',
      'bg-[#FDF4F4]',
      'px-2',
      'py-4',
      'shadow-lg'
    );
    Icon = RedErrorIcon;
  }

  if (errorMessage === 'none') {
    return null;
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%', top: '28px' }}>
        <div role="alert" className={styling}>
          <Icon aria-label="Message Icon" width={24} height={24} />
          <div className="grow">
            <span className="text-[15px] font-bold">{title}&nbsp;</span>
            <span className="text-[15px]">{msg}</span>
          </div>
        </div>
      </div>
    );
  }
}