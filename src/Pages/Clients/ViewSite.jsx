import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientViewSiteData } from "../../Slices/clientSlice";
import { useParams } from "react-router-dom";
import ClientSiteViewTop from "../../Components/ClientSiteViewTop";

function ViewSite() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userId, setUserId] = useState(null);

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
      dispatch(fetchClientViewSiteData({ userId: userId, id: id }));
    }
  }, [userId]);

  const data = useSelector(function (state) {
    return state.tscClientStore;
  });
  console.log("client Site Details", data);
  return (
    <>
       {data?.clientSiteData?.details?.id && userId && (
    <ClientSiteViewTop
      id={data?.clientSiteData?.details?.id}
      user_id={userId}
      site_name={data?.clientSiteData?.details?.site_name}
      date_time={data?.clientSiteData?.details?.date_time}
      action="view_site"
    />
  )}
      {data?.clientSiteData?.details?.id !== ""}
      {
        <div class="col-lg-8 paddL0">
          <div class="table-responsive">
            <div class="col-lg-12 paddR0 paddL0">
              <label class="normal gray-color">Site Name</label>
              <label class="float-right">
                {data?.clientSiteData?.details?.site_name}
              </label>
            </div>
            <div class="clear popup-divider"></div>
            <div class="col-lg-12 paddR0 paddL0">
              <label class="normal gray-color">Address </label>
              <label class="float-right">
                {data?.clientSiteData?.details?.address}
              </label>
            </div>
            <div class="clear popup-divider"></div>
            <div class="col-lg-12 paddR0 paddL0">
              <label class="normal gray-color">Site ID</label>
              <label class="float-right">
                {data?.clientSiteData?.details?.site_id}
              </label>
            </div>
            <div class="clear popup-divider"></div>
            <div class="col-lg-12 paddR0 paddL0">
              <label class="normal gray-color">No. of Assets</label>
              <label class="float-right">
                {data?.clientSiteData?.details?.assets_count}
              </label>
            </div>
            <div class="clear popup-divider"></div>
            <div class="col-lg-12 paddR0 paddL0">
              <label class="normal gray-color">Contacts</label>
              <label class="float-right">{data?.clientSiteData?.contact}</label>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ViewSite;
