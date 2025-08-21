import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleServiceData } from "../../Slices/serviceSlice";
import { useParams } from "react-router-dom";
import ClientViewAttachments from "../../Components/ClientViewAttachments";

function ServiceClientView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  let userData = "";
  let optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let options1Date = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  let optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("userData") !== "" &&
      sessionStorage.getItem("userData") !== null
    ) {
      userData = JSON.parse(sessionStorage.getItem("userData"));
      setUserId(userData.id);
      setUserRole(userData.role);
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    
    if (userId) {
      dispatch(fetchSingleServiceData({ userId: userId, id: id }));
    }
  }, [userId]);

  const data = useSelector(function (state) {
    return state.tscServiceStore;
  });
  console.log("client view", data);
  return (
    <>
      {data?.serviceClientViewData?.details?.ticket_no !== ""}
      {
        <div className="parent-page-class listing-page detail-page job-card-view client-job-card-view left-align">
          <h1 className="page-heading marB58">
            <a href="/service" className="back-icon"></a>
            <span>
              {data?.serviceClientViewData?.details?.status === 15 ?  'Recurring JC '+ data?.serviceClientViewData?.details?.Clients.company_name : 
              'Job Card #'+data?.serviceClientViewData?.details?.ticket_no}
            </span>
          </h1>
         <div class="col-lg-8 paddL0">
          <div class="table-responsive">
               <div class="float-left paddT5">
                  <span class="client_name font-26">{data?.serviceClientViewData?.details?.Clients.company_name}</span>
               </div>

               <div class="clear paddB10"></div>
               <div class="clear paddB5">{data?.serviceClientViewData?.details?.ClientSites.site_name} {data?.serviceClientViewData?.details?.ClientSites.address}</div>
               <div class="clear paddB5">{data?.serviceClientViewData?.details?.ClientContacts.name +' '+ data?.serviceClientViewData?.details?.ClientContacts.last_name}</div>
               <div class="clear paddB5">{data?.serviceClientViewData?.details?.ClientContacts.phone}</div>
               <div class="clear paddB5">{data?.serviceClientViewData?.details?.ClientContacts.email}</div>
               <div class="clear paddB10"></div>
               <div class="clear popup-divider"></div>
               <div class="col-lg-12 paddR0 paddL0">
                  <label class="normal gray-color">Sites</label>
                  <label class="site-right">
                     <span>{data?.serviceClientViewData?.details?.ClientSites.site_name}</span>
                  </label>
               </div>
               <div class="clear popup-divider"></div>
               <div class="col-lg-12 paddR0 paddL0">
                  <label class="normal gray-color">Job Type</label>
                  <label class="site-right">
                     <span>{data?.serviceClientViewData?.details?.JobCardTypes.title}</span>
                  </label>
               </div>
               <div class="clear popup-divider"></div>
               <div class="clear"></div>
               <label class="float-left paddT13 job-sub-heading">Assets</label>
               <div class="clear paddB10"></div>


                {data?.serviceClientViewData?.assets &&
                Object.values(data.serviceClientViewData.assets).length > 0 &&
                Object.values(data.serviceClientViewData.assets).map(
                  (result) => {
                    let className = "border-box border-box-light-color ";
                    if (result.total_checklist_items === data.serviceClientViewData.completed_items && result?.total_checklist_items > 0) {
                      className += "completed_checklist";
                    }
                    return (
                      <>
                      <div class="col-lg-4 paddL0">
                        <div className={className}>
                        <div><span class="line-height-26 bold600">{result?.ClientAssets?.machine_name}</span>
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BEEAFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box-icon lucide-box float-right"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
                       </div>
                    <div class="line-height-26">Make: {result?.AssetMakes?.title}</div>
                    <div class="line-height-26">Model: {result?.AssetModels?.title}</div>
                    <div class="line-height-26">Serial: {result?.ClientAssets?.serial_no} </div>
                    </div></div>
                      </>
                    );
                  }
                )}
            </div>

            <div class="table-responsive">
               <div class="clear"></div>
               <label class="float-left job-sub-heading">Activity</label>
               <div class="clear paddB20"></div>

               {data?.serviceClientViewData?.comments &&
                Object.values(data.serviceClientViewData.comments).length > 0 &&
                Object.values(data.serviceClientViewData.comments).map(
                  (result) => {
                    let className = "note-box ";
                    if (result.type === 'log') {
                      className += "gray-section";
                    }
                    else
                      className += "yellow-section";
                    let message = '';
                  if (result?.message)
                     message = result?.message.replace("Job Card Status Change: ", "");

                    return (
                      <>
                      <div class={className}>
                        <span class="blue-color">{result?.date_time}</span>
                  <div class="clear paddB10"></div>
                  <div class="black-color">{message}</div>
                  </div>
                      </>
                    );
                  }
                )}
            </div>

          </div>

          <div className="col-lg-4 paddR0">
            <div className="table-responsive">
              <label className="job-sub-heading width100">
                Attachments
                <span className="float-right normal gray-color">Total {data?.serviceClientViewData?.attachements?.length}</span>
              </label>
              <div className="clear paddB10"></div>
              <ClientViewAttachments data={data?.serviceClientViewData?.attachements} userId = {userId} userRole = {userRole} />

              <div className="clear paddB10"></div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ServiceClientView;
