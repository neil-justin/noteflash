const SubmitButton = ({ text }: { text: string }) => {
  return (
    <button
      type='submit'
      className='w-80 text-lg self-center p-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 hover:cursor-pointer'
    >
      {text}
    </button>
  );
};

export default SubmitButton;
