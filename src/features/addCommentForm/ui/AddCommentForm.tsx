import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import { useTranslation } from 'react-i18next';
import {
  getAddCommentFormText,
  getAddCommentFormError,
} from '../model/selectors/addCommentFormSelectors';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
  ReducersList,
  DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(
  ({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value));
      },
      [dispatch],
    );

    const onSendHandler = useCallback(() => {
      onSendComment(text || '');
      onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
      <DynamicModuleLoader reducers={reducers}>
        <HStack
          max
          justify='between'
          data-testid='AddCommentForm'
          className={classNames(cls.AddCommentForm, {}, [className])}
        >
          <Input
            value={text}
            className={cls.input}
            data-testid='AddCommentForm.Input'
            onChange={onCommentTextChange}
            placeholder={t('Type comment text')}
          />
          <Button
            onClick={onSendHandler}
            theme={ButtonTheme.OUTLINE}
            data-testid='AddCommentForm.Button'
          >
            {t('Send')}
          </Button>
        </HStack>
      </DynamicModuleLoader>
    );
  },
);

export default AddCommentForm;
