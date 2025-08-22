import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientSiteAssetsData } from "../../Slices/clientSlice";
import { useParams } from "react-router-dom";
import ClientSiteViewTop from "../../Components/ClientSiteViewTop";
import { encryptPhpCompatible } from "../../cryptoHelper";

function SiteAssets() {
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
      dispatch(fetchClientSiteAssetsData({ userId: userId, id: id }));
    }
  }, [userId]);

  const data = useSelector(function (state) {
    return state.tscClientStore;
  });
  console.log(data)
  return (
    <>
      {data?.siteAssetsData?.details?.id && userId && (
        <ClientSiteViewTop
          id={data?.siteAssetsData?.details?.id}
          user_id={userId}
          site_name={data?.siteAssetsData?.details?.site_name}
          date_time={data?.siteAssetsData?.details?.date_time}
          action="site_assets"
        />
      )}
      {data?.siteAssetsData?.results &&
        Object.values(data.siteAssetsData.results).length > 0 &&
        Object.values(data.siteAssetsData.results).map((result) => {
          let first = encryptPhpCompatible(result.id.toString() + "first");
          let id_encrypted = encryptPhpCompatible(result.id.toString());
          let user_id_encrypted = encryptPhpCompatible(userId?.toString());

          return (
            <>
              <div class="col-lg-4 paddL0">
                <div
                  class="client_assets_block"
                  dir={`/clients/site_assets/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}
                >
                  {result.image !== "" && result.image !== null ? <div class="asset_img_exist"><img src="#" /></div> : <div class="asset_img"><span class="no_picture">No picture added</span></div>
                  }
                  <div class="asset_content">
                    <div class="bold600">{result.machine_name}</div>
                    <div class="clear paddB20">{result?.ClientSites?.site_name}</div>
                    <div class="col-lg-6 paddL0">
                      <div class="gray-color">Serial Number</div>
                      <div>{result.serial_no}</div>
                    </div>
                    <div class="col-lg-6 paddL0">
                      <div class="gray-color">Last Action</div>
                      <div>{result.last_action}</div>
                    </div>
                    <div class="clear"></div>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
}

export default SiteAssets;
