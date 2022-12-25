import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';

export const BugButton = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const throwError = () => setError(true);
  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);
  return <Button onClick={throwError}>{t('Throw error')}</Button>;
};
