import React, { useMemo } from 'react';
import { RedWarningIcon } from '@/components/base/RedWarningIcon';
import { GreenCheckIcon } from '@/components/base/GreenCheckIcon';
import { cn } from '@/utils';

export function TotalCharacterCount({ length }: { length: number }) {
  const { styling, Icon } = useMemo(() => {
    let styling = '';
    let Icon = null;
    if (length > 2083) {
      styling = cn('text-[14px]', 'font-bold', 'text-[#E04837]');
      Icon = RedWarningIcon;
    } else if (length > 0 && length <= 2083) {
      styling = cn('text-[14px]', 'font-bold', 'text-[#137FC3]');
      Icon = GreenCheckIcon;
    } else {
      styling = cn('text-[14px]', 'font-bold', 'text-[#11193C]');
    }
    return { styling, Icon };
  }, [length]);

  return (
    <span className="flex flex-row justify-items-end gap-1">
      <span className="text-[14px] text-[#11193C]">Total character count: </span>
      <span className={styling}>{length}</span>
      {Icon && <Icon aria-label="Message Icon" width={24} height={24} />}
    </span>
  );
}