import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { EditableProfileCard } from '@/features/editableProfileCard/ui/EditableProfileCard/EditableProfileCard';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page
      data-testid="ProfilePage"
      className={classNames('', {}, [className])}
    >
      <VStack gap="16" max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
