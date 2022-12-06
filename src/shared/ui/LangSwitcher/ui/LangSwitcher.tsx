import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonTheme, Button } from '@/shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ua' ? 'en' : 'ua');
  };
  return (
    <Button
      onClick={toggle}
      theme={ButtonTheme.CLEAR}
      className={classNames('', {}, [className])}
    >
      {t(short ? 'Lang' : 'Language')}
    </Button>
  );
});

export default LangSwitcher;
