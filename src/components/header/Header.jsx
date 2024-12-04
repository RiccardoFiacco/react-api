import style from "./Header.module.css";
export function Header() {
  return (
    <div className={style.bgcolor_lightGrey}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center pt-3">Il mio blog</h1>
          </div>
        </div>
      </div>
    </div>
  );
}