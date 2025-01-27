interface AlertDisplayProps {
  textClassName: string;
  text: string;
}

const AlertDisplay = ({ textClassName, text }: AlertDisplayProps) => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <p
        role='alert'
        className={textClassName}
      >
        {text}
      </p>
    </div>
  );
};

export default AlertDisplay;
