import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ListSelectedPage = ({ listSelected, setListSelected }) => {
  const closeListSelected = () => {
    setListSelected(null);
  }
  return (
    <div>
      <div className="icon-bar">
        <div className="back-arrow" onClick={closeListSelected}>
          <ArrowBackIcon/>
        </div>
      </div>
      <div class="list-selected-title"><b>{listSelected.listTitle}</b></div>
      <div class="list-selected-meta"><b>{listSelected.user}</b></div>
      <div class="list-selected-summary">{listSelected.description}</div> {/* maybe substring or something */}
    </div>
  );
};

export default ListSelectedPage;