import cls from './LoginModal.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { LoginForm } from 'features/AuthByUsername/ui/LoginForm/LoginForm';

interface LoginModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
  <Modal
    lazy
    isOpen={isOpen}
    onClose={onClose}
    className={classNames(cls.LoginModal, {}, [className])}
  >
    <LoginForm />
  </Modal>
);
