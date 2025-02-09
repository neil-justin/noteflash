import AppSidebar from '../../components/AppSidebar/index';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import { Trash as TrashIcon } from '../../icons';

const Trash = () => {
  return (
    <>
      <AppSidebar />
      <ContentMenu>
        <>
          <TrashIcon size={8} />
          <span className='text-sm'>Your trash is empty</span>
        </>
      </ContentMenu>
      <ContentArea />
    </>
  );
};

export default Trash;
