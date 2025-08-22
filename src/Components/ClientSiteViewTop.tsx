import { Link } from "react-router-dom";
import { encryptPhpCompatible, decryptPhpCompatible } from "../cryptoHelper";

function ClientSiteViewTop(props) {
  console.log(props);

  const first = encryptPhpCompatible(props?.id.toString() + "first");
  const id_encrypted = encryptPhpCompatible(props?.id.toString());
  const user_id_encrypted = encryptPhpCompatible(props?.user_id?.toString());
  const edit = encryptPhpCompatible("edit");

  return (
    <>
      <div className="col-lg-12 tooltip-demo">
        <h1 className="page-heading paddB10 marB10 line-30">
          <a
            href="<?php echo Router::url('/', true);?>admin/clients/sites"
            className="back-icon"
          ></a>
          <span>{props.site_name}</span>
          <div className="line-height-10 paddL42">
            <span className="normal-size normal">
              Created:{" "}
              {new Date(props.date_time).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </h1>
        <div className="clear"></div>
        <ul className="websites-tabs">
          <li
            className={
              props.action === "view_site"
                ? "active ticket_status"
                : "ticket_status"
            }
          >
            <Link
              to={`/clients/view_site/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}
            >
              Overview
            </Link>
          </li>
          <li
            className={
              props.action === "site_assets"
                ? "active ticket_status"
                : "ticket_status"
            }
          >
            <Link
              to={`/clients/site_assets/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}
            >
              Assets
            </Link>
          </li>
          <li
            className={
              props.action === "site_contacts"
                ? "active ticket_status"
                : "ticket_status"
            }
          >
            <Link
              to={`/clients/site_contacts/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}
            >
              Contacts
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ClientSiteViewTop;
