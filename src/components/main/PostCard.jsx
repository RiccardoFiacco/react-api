import sconsolato from "../../assets/sconsolato.jpg"

function getCssTags(tag) {
  switch (tag) {
    case "html":
      return {
        backgroundColor: "#FE4C1E",
      };
    case "css":
      return{
        backgroundColor: "#0071BF",
    };
    case "js":
      return{
        backgroundColor: "#F7DF1E",
    };
    case "php":
      return{
        backgroundColor: "#777BB3",
    };
    default:
      return {};
  }
}

export function PostCard(props) {
  const {id = "", title = "", image = "", content = "", tags = [], published = false, callback, callbackChangeTitle} = props;

  return (
    <div className="col-4">
      <div className="card" id={`${id}`}>
        <img src={image ? image : sconsolato} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          
          <p>
            {tags.length != 0 ? tags.map((tag) => (
              <span key={tag}>&nbsp;<span  style={getCssTags(tag)}> {tag} </span>&nbsp;</span>
            )) : <span>niente tags</span>}
           
          </p>
          <p className="card-text">{content}</p>
          <div className="row">
            <div className="col">
              <a href="#" className="btn btn-primary" onClick={callback}>remove</a>
              </div>
            <div className="col">
              <a href="#" className="btn btn-primary" onClick={callbackChangeTitle}>change title</a>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}
