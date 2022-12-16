import './Loader.scss';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
  <div className="lds-ellipsis">
    <div />
    <div />
    <div />
    <div />
  </div>
);
