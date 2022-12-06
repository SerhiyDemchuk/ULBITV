import {
  getProfileData,
  updateProfileData,
  getProfileReadonly,
} from '../../../editableProfileCard';
import { HStack } from '@/shared/ui/Stack';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { getUserAuthData } from '@/entities/User';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { profileActions } from '../../model/slice/profileSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation('profile');
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSaveEdit = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack
      max
      justify="between"
      className={classNames('', {}, [className])}
    >
      <Text title={t('Profile')} />
      {canEdit && (
        <div>
          {readonly ? (
            <Button
              onClick={onEdit}
              theme={ButtonTheme.OUTLINE}
              data-testid="EditableProfileCardHeader.EditButton"
            >
              {t('Edit')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                onClick={onCancelEdit}
                theme={ButtonTheme.OUTLINE_RED}
                data-testid="EditableProfileCardHeader.CancelButton"
              >
                {t('Cancel')}
              </Button>
              <Button
                onClick={onSaveEdit}
                theme={ButtonTheme.OUTLINE}
                data-testid="EditableProfileCardHeader.SaveButton"
              >
                {t('Save')}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
});
