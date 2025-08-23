import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientAssetsData } from "../../Slices/clientSlice";
import { Link, useParams } from "react-router-dom";
import ClientSiteViewTop from "../../Components/ClientSiteViewTop";
import { encryptPhpCompatible } from "../../cryptoHelper";

function AssetListing() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
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
      dispatch(fetchClientAssetsData({ userId: userId, id: id }));
    }
  }, [userId]);

  const data = useSelector(function (state) {
    return state.tscClientStore;
  });
  console.log(data);
  return (
    <>
      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="parent-page-class listing-page">
          <div class="col-lg-12">
            <h1 class="page-heading">Assets</h1>
            <div class="blue-line marT20 marB30"></div>
          </div>
          <table className="table table-striped table-hover dataTables-example10">
            <thead>
              <tr role="row">
                <th className="paddL20">Machine Name</th>
                <th>Serial Number</th>
                <th>Client Name</th>
                <th>Client Site</th>
                <th>Last Ticket</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.AssetsData?.assets &&
                Object.values(data.AssetsData.assets).length > 0 &&
                Object.values(data.AssetsData.assets).map((result) => {
                  let first = encryptPhpCompatible(result.id.toString() + "first");
                  let id_encrypted = encryptPhpCompatible(result.id.toString());
                  let user_id_encrypted = encryptPhpCompatible(userId?.toString());

                  return (
                    <>
                      <tr class="">
                        <td class="paddL25">{result.machine_name}</td>
                        <td class="paddB0">{result.serial_no}</td>
                        <td class="paddB0">{result?.Clients?.company_name}</td>
                        <td class="paddB0">{result?.ClientSites?.site_name}</td>
                        <td class="paddB0">{" "}
              {new Date(result?.SupportTickets?.date_time).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}</td>
              <td class="">
                <Link className="comment-operations icon" to={`/clients/view_asset/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}>
                     <span class="view-icon"></span>
                     <span class="icon-text">View Asset</span></Link></td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AssetListing;
