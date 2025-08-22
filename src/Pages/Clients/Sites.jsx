import { useDispatch, useSelector } from "react-redux";
import { fetchClientSiteData } from "../../Slices/clientSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { encryptPhpCompatible } from "../../cryptoHelper";

function Sites() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const edit = encryptPhpCompatible("edit");

  let userData = "";
  useEffect(() => {
    if (
      sessionStorage.getItem("userData") !== "" &&
      sessionStorage.getItem("userData") !== null
    ) {
      userData = JSON.parse(sessionStorage.getItem("userData"));

      setUserId(userData.id);
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchClientSiteData({ userId: userId }));
    }
  }, [userId]);

  const data = useSelector(function (state) {
    return state.tscClientStore;
  });
  console.log("Results",data);
  return (
    <>
      <h1 className="page-heading">Sites</h1>

      <div className="sites_ticket_listing">
        <div
          id="sites_ticket"
          className="form-inline dt-bootstrap ticket-listing sites_ticket_listing client_access"
        >
          <table className="table table-striped table-hover dataTables-example10">
            <thead>
              <tr role="row">
               <th class="">Site Name</th>
                  <th class="">Address</th>
                  <th class="">Site ID</th>
                  <th class="">No. of Assets</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.clientData?.results &&
                Object.values(data.clientData.results).length > 0 &&
                Object.values(data.clientData.results).map((result) => {

                  let first = encryptPhpCompatible(result.id.toString() + "first");
                  let id_encrypted = encryptPhpCompatible(result.id.toString());
                  let user_id_encrypted = encryptPhpCompatible(userId?.toString());

                  return (
                    <>
                      <tr>
                        <td className="paddL25">{result.site_name}</td>
                        <td className="">{result.address}</td>
                        <td className="">{result.site_id}</td>
                        <td className="">{result.no_of_assets}</td>
                        <td className="paddR0 paddL0">
                          <Link className="comment-operations icon" to={`/clients/view_site/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}><span class="arrow-right"></span></Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="clear paddB30 paddT20"></div>
    </>
  );
}

export default Sites;
