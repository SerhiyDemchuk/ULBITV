import Button, { ThemeButton } from 'shared/ui/Button/Button';
import cls from './LangSwitcher.module.scss';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import { Theme, useTheme } from "app/providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
  className?: string;
}

const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ua' ? 'en' : 'ua');
  }
  return (
    <Button
      onClick={toggle}
      theme={ThemeButton.CLEAR}
      className={classNames(cls.LangSwitcher, {}, [className])}
    >
      {t('Language')}
    </Button>
  )
}

export default LangSwitcher;
