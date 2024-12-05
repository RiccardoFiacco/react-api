
export function PostCard(props) {
  const {id="",slug = "" , title = "", image = "", content = "", tags = [], callback} = props;

  return (
    <div className="col-6">
      <div className="card" id={`${slug}`}>
        <img src={image && id<=5 ? "http://localhost:3000/imgs/posts/"+image : image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          
          <p>
            {tags.length != 0 ? tags.map((tag, i) => (
              <span key={i}>&nbsp;<span className="text-bg-success"> {tag} </span>&nbsp;</span>
            )) : <span>niente tags</span>}
           
          </p>
          <p className="card-text">{content}</p>
          <div className="row">
            <div className="col">
              <a href="#" className="btn btn-primary" onClick={callback}>remove</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
