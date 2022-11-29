const interfaceConst = 'interface';

module.exports = (componentName) => `import { memo } from 'react';
import cls from './${componentName}.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.UserPage, {}, [className])}>

    </div>
  );
});
`;
