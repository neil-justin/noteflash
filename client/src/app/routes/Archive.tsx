import AppSidebar from '../../components/AppSidebar';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import { ArchiveBoxArrowDown } from '../../icons';

const Archive = () => {
  return (
    <>
      <AppSidebar />
      <ContentMenu>
        <>
          <ArchiveBoxArrowDown size={8} />
          <span className='text-sm'>Your archive is empty</span>
        </>
      </ContentMenu>
      <ContentArea />
    </>
  );
};

export default Archive;
