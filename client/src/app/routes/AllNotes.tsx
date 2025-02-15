import AppSidebar from '../../components/AppSidebar/index';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import * as Icons from '../../icons';
import Tiptap from '../Tiptap';

const AllNotes = () => {
  return (
    <>
      <AppSidebar />
      <ContentMenu>
        <>
          <Icons.LightBulb size={32} />
          <span className='text-sm text-primary hover:cursor-pointer'>
            Create your first note
          </span>
        </>
      </ContentMenu>
      <ContentArea>
        <Tiptap />
      </ContentArea>
    </>
  );
};

export default AllNotes;
