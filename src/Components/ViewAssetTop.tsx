import { Link } from "react-router-dom";
import { encryptPhpCompatible, decryptPhpCompatible } from "../cryptoHelper";

function ViewAssetTop(props) {
  console.log(props);

  const first = encryptPhpCompatible(props?.id.toString() + "first");
  const id_encrypted = encryptPhpCompatible(props?.id.toString());
  const user_id_encrypted = encryptPhpCompatible(props?.user_id?.toString());
  const edit = encryptPhpCompatible("edit");

  return (
    <>
    <div className="col-lg-12 tooltip-demo paddL0">
      <h1 className="page-heading paddB10 marB10 line-25">
         <a href="/clients/asset_listing" className="back-icon">
         </a>
         <span>{props.machine_name}</span>
         <div className="line-height-10 paddL42">
            <span className="normal-size normal">{props.site_name}</span>
         </div>
      </h1>
      <div className="clear"></div>
      <ul className="websites-tabs">
        <li
            className={
              props.action === "view_asset"
                ? "active ticket_status"
                : "ticket_status"
            }
          >
            <Link
              to={`/clients/view_asset/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}
            >
              Overview
            </Link>
          </li>
          <li
            className={
              props.action === "asset_maintenance"
                ? "active ticket_status"
                : "ticket_status"
            }
          >
            <Link to={`/clients/asset_maintenance/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}>
              Maintenance
            </Link>
          </li>
          <li
            className={
              props.action === "asset_activity"
                ? "active ticket_status"
                : "ticket_status"
            }
          >
            <Link
              to={`/clients/asset_activity/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}
            >
              Activity
            </Link>
          </li>

      </ul>
      <div className="clear"></div>
   </div>


    </>
  );
}

export default ViewAssetTop;
