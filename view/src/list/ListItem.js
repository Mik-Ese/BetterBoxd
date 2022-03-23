import "./ListItem.css";

const ListItem = ({
  listData
}) => {
  
  const thumbnailFactory = (imagePaths) => {
    var thumbnailContents = [];
    var j = 0;
    for (var i = 0; i < 4; i++) {
      if (j >= imagePaths.length) {
        j = 0;
      }
      var imagePath = imagePaths[j];
      thumbnailContents.push(
        <img className="list-item-thumbnail-poster" src={imagePath}/>
      );
      j++;
    }
    return <div className="list-item-thumbnail">{thumbnailContents}</div>;
  };

  return (
    <div class="list-item">
      {thumbnailFactory(listData.imagePaths)}
      <div class="list-item-info">
        <div class="list-item-title"><b>{listData.title}</b></div>
        <div class="list-item-social"><b>{listData.user}</b>&nbsp;&nbsp;{listData.numMovies} films&nbsp;&nbsp;&#10084;&#65039;&nbsp;{listData.numLikes}&nbsp;&nbsp;&#128172;&nbsp;{listData.numComments}</div>
        <div class="list-item-summary">{listData.summary}</div> {/* maybe substring or something */}
      </div>
    </div>
  );
  
};

export default ListItem;