import "./styles/ListItem.css";

const ListItem = ({listData, setListSelected}) => {

  const thumbnailFactory = (movies) => {
    var thumbnailContents = [];
    var j = 0;
    for (var i = 0; i < 4; i++) {
      if (j >= movies.length) {
        j = 0;
      }
      var imagePath = movies[j].url;
      thumbnailContents.push(
        <img className="list-item-thumbnail-poster" src={imagePath}/>
      );
      j++;
    }
    return <div className="list-item-thumbnail">{thumbnailContents}</div>;
  };

  const selectList = () => {
   let newListData = Object.assign({}, listData)

    setListSelected(newListData);
  };

  return (
    <div class="list-item">
      {thumbnailFactory(listData.movies)}
      <div class="list-item-info">
        <div class="list-item-title" onClick={selectList}><b>{listData.listTitle}</b></div>
        <div class="list-item-meta"><b>{listData.user}</b>&nbsp;&nbsp;{listData.movies.length} films</div>
        <div class="list-item-summary">{listData.description.substring(0, 300)}{listData.description.length>300 ? '...' : ''}</div>
      </div>
    </div>
  );
  
};

export default ListItem;