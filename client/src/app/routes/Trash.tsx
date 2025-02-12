import AppSidebar from '../../components/AppSidebar/index';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import * as Icons from '../../icons';

const Trash = () => {
  return (
    <>
      <AppSidebar />
      <ContentMenu>
        <>
          <Icons.Delete size={32} />
          <span className='text-sm'>Your trash is empty</span>
        </>
      </ContentMenu>
      <ContentArea />
    </>
  );
};

export default Trash;
