import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import Button, { ThemeButton } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
}

const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ua' ? 'en' : 'ua');
  };
  return (
    <Button
      onClick={toggle}
      theme={ThemeButton.CLEAR}
      className={classNames('', {}, [className])}
    >
      {t('Language')}
      asfd
    </Button>
  );
};

export default LangSwitcher;
