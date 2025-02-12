import AppSidebar from '../../components/AppSidebar';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import * as Icons from '../../icons';

const Archive = () => {
  return (
    <>
      <AppSidebar />
      <ContentMenu>
        <>
          <Icons.Archive size={32} />
          <span className='text-sm'>Your archive is empty</span>
        </>
      </ContentMenu>
      <ContentArea />
    </>
  );
};

export default Archive;
