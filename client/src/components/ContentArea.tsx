interface ContentAreaProps {
  children: React.ReactElement;
}

const ContentArea = ({ children }: ContentAreaProps) => {
  return (
    <div className='content-area overflow-hidden shadow-md'>{children}</div>
  );
};

export default ContentArea;
