import { FC } from 'react';
import { Page } from '@/widgets/Page/Page';
import { useTranslation } from 'react-i18next';

const AdminPanelPage: FC = () => {
  const { t } = useTranslation('admin');
  return (
    <Page data-testid="AdminPanelPage">
      {t('Admin Panel Page')}
    </Page>
  );
};

export default AdminPanelPage;
