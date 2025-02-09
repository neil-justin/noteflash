import AppSidebar from '../../components/AppSidebar/index';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import { LightBulb } from '../../icons';

const AllNotes = () => {
  return (
    <>
      <AppSidebar />
      <ContentMenu>
        <>
          <LightBulb size={12} />
          <span className='text-sm text-primary hover:cursor-pointer'>
            Create your first note
          </span>
        </>
      </ContentMenu>
      <ContentArea />
    </>
  );
};

export default AllNotes;
