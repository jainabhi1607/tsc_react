import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSupportData } from "../../Slices/supportSlice";
import { useParams } from "react-router-dom";

function ClientView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  let userData = "";
  let optionsDate = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};
let options1Date = { 
  day: 'numeric' ,
  month: 'long', 
  year: 'numeric'
};

let optionsTime = { 
  hour: '2-digit', 
  minute: '2-digit', 
  hour12: true 
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
    console.log("Id is", id);
    if (userId) {
      dispatch(fetchSingleSupportData({ userId: userId, id: id }));
    }
  }, [userId]);

  const data = useSelector(function (state) {
    return state.tscSupportStore;
  });
  console.log("client view", data);
  return (
    <>
      {data?.supportClientViewData?.details?.ticket_no !== ""}
      {
        <div>
          <h1 className="page-heading marB58">
            <a href="support" className="back-icon"></a>
            <span>
              Support Ticket # {data?.supportClientViewData?.details?.ticket_no}
            </span>
          </h1>
          <div className="col-lg-8 paddL0">
            <div className="table-responsive">
              <div className="paddT5">
                <span className="client_name font-26">
                  {data?.supportClientViewData?.details?.Clients?.company_name}
                </span>
              </div>
              <div className="clear paddB10"></div>
              <div className="clear paddB5">
                {data?.supportClientViewData?.details?.ClientSites.site_name} -{" "}
                {data?.supportClientViewData?.details?.ClientSites.address}
              </div>
              <div className="clear paddB5">
                {data?.supportClientViewData?.details?.ClientContacts.name}{" "}
                {data?.supportClientViewData?.details?.ClientContacts.last_name}
              </div>
              <div className="clear paddB5">
                {data?.supportClientViewData?.details?.ClientContacts.phone}
              </div>
              <div className="clear paddB5">
                {data?.supportClientViewData?.details?.ClientContacts.email}
              </div>
              <div className="clear paddB10"></div>
              <div className="clear popup-divider"></div>
              <div className="col-lg-12 paddR0 paddL0">
                <label className="normal gray-color">Sites</label>
                <label className="site-right">
                  <span>
                    {
                      data?.supportClientViewData?.details?.ClientSites
                        .site_name
                    }
                  </span>
                </label>
              </div>
              <div className="clear popup-divider"></div>
              <div className="col-lg-12 paddR0 paddL0">
                <label className="normal gray-color">Asset</label>
                <label className="site-right">
                  {data?.supportClientViewData?.details?.ClientAssets
                    .machine_name
                    ? data?.supportClientViewData?.details?.ClientAssets
                        .machine_name +
                      " " +
                      data?.supportClientViewData?.details?.ClientAssets
                        .serial_no
                    : ""}
                </label>
              </div>
              <div className="clear popup-divider"></div>
              <div className="col-lg-12 paddR0 paddL0">
                <label className="normal gray-color">Production Impact</label>
                <label className="float-right">
                  {data?.supportClientViewData?.details?.production_impact}
                </label>
              </div>
              <div className="clear popup-divider"></div>
              <div className="col-lg-12 paddR0 paddL0">
                <label className="normal gray-color">Time issue occured</label>
                <label className="float-right">
                  {data?.supportClientViewData?.details?.time_issue_hours}:
                  {data?.supportClientViewData?.details?.time_issue_minutes}
                  {data?.supportClientViewData?.details?.time_issue_ampm}
                </label>
              </div>
              <div className="clear popup-divider"></div>
              <div className="col-lg-12 paddR0 paddL0">
                <label className="normal gray-color">Date Submitted</label>
                <label className="float-right">
                  {data?.supportClientViewData?.details?.date_time}
                </label>
              </div>
              <div className="clear popup-divider"></div>
              <div className="col-lg-12 paddR0 paddL0">
                <h4>Description</h4>
                <div className="clear paddB5"></div>
                <div className="col-lg-12 paddL0 paddR0 popup-input width100 line-22">
                  {data?.supportClientViewData?.details?.SupportTicketDetails
                    .description ? (
                    data?.supportClientViewData?.details?.SupportTicketDetails
                      .description
                  ) : (
                    <div>Description not added.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-12 paddL0 paddB10 paddR0 lead-note-section comment_section">
              <form method="post">
                <h3 className="paddB10">
                  {userRole >= 4 ? "Activity" : "Comments / Updates"}
                </h3>
                <div>
                  <textarea
                    placeholder="Start typing..."
                    name="comments"
                    id="comment"
                    className="note_input"
                    rows="4"
                    required
                  ></textarea>
                  <div className="clear paddB10"></div>
                  <input
                    type="submit"
                    className="blue-btn float-left marR20"
                    id="submit_btn"
                    value="Save"
                  />
                  <div className="clear paddB10"></div>

                  {userData?.role < 4 && (
                    <>
                      <input
                        type="checkbox"
                        name="visibility"
                        value="2"
                        id="public_private"
                        className="public_private_class"
                      />
                      <label for="public_private" className="public_private_class">
                        Make Public
                      </label>
                    </>
                  )}

                  <div className="clear paddB30"></div>
                </div>
              </form>
              {console.log(data?.supportClientViewData?.comments)}
              {data?.supportClientViewData?.comments &&
                Object.values(data.supportClientViewData.comments).length > 0 &&
                Object.values(data.supportClientViewData.comments).map(
                  (result) => {
                    let className = "note-box ";
                    if (result.type === "log") {
                      className += "gray-section";
                    } else if (result.visibility === 2 || userRole >= 4) {
                      className += "yellow-section";
                    } else {
                      className += "sky-blue-section";
                    }
                    let message = result.message;
                    if (
                      message !== null &&
                      message !== "" &&
                      message !== undefined &&
                      message.indexOf("Job Card Status Change: ") !== -1
                    ) {
                      message = message.replace(
                        "Job Card Status Change: ",
                        ""
                      );
                    }
                    let date = new Date(result.date_time);
                    let formattedDate = date.toLocaleDateString('en-US', optionsDate); 
                    let formattedTime = date.toLocaleTimeString('en-US', optionsTime);
                    let final_date = formattedDate.replace(",", "") + " - " + formattedTime.replace(" ", "").toUpperCase();

                      return (
                        <>
                          <div className={className}>
                            <span className="blue-color">{final_date}</span>
                            <div className="clear paddB10"></div>
                            <div className="black-color">{message}</div>
                          </div>
                        </>
                      );
                  }
                )}
            </div>
          </div>

          <div className="col-lg-4 paddR0">
            <div className="table-responsive job-card-sidebar">
               <h3 className="bold600">Ticket Progress</h3>
               <div className="clear paddB10"></div>
               <div className="ticket_progress">
                      <span className="ticket_circle"></span>
                    <span>Ticket Created<br/><span className="paddL28">
                      {data?.supportClientViewData?.details?.dat_time}
                      </span></span>
                    <div className="clear paddB10"></div>
                    <span className="left-border"></span>
                    <div className="clear paddB25"></div>
                    
                      <span className={`ticket_circle ${data?.supportClientViewData?.details?.ticket_status < 2 ? "ticket_disabled" : "red-circle"}`}></span>
                    <span className={`${data?.supportClientViewData?.details?.ticket_status < 2 ? "ticket_disabled" :""}`}>In Progress</span>
                    <div className="clear paddB25"></div>
                    <span className="left-border"></span>
                    <div className="clear paddB25"></div>

                      <span className={`ticket_circle ${data?.supportClientViewData?.details?.ticket_status < 3 ? "ticket_disabled" : "yellow-circle"}`}></span>

                    <span className={`${data?.supportClientViewData?.details?.ticket_status < 3 ? "ticket_disabled" :""}`}>Technician Required<br/>
                    
                    
                    <span className="paddL28">{data?.supportClientViewData?.details?.ticket_status >= 3 && data?.supportClientViewData?.details?.JobCards?.job_date !== '' ? "Job Date: "+data.supportClientViewData.details.JobCards.job_date :""}
                    
                    </span></span>
                    <div className="clear paddB10"></div>
                    <span className="left-border"></span>
                    <div className="clear paddB25"></div>

                      <span className={`ticket_circle ${data?.supportClientViewData?.details?.ticket_status < 4 ? "ticket_disabled" : "blue-circle"}`}></span>

                    <span className={`${data?.supportClientViewData?.details?.ticket_status < 4 ? "ticket_disabled" :""}`}>Ticket Closed<br/>
                    
                    <span className="paddL28">                         
                         {data?.supportClientViewData?.details?.ticket_status >= 4 && data?.supportClientViewData?.details?.SupportTicketDetails?.resolved_date !== '' ? data.supportClientViewData.details.SupportTicketDetails.resolved_date :""}
                         </span></span>
                 </div>
            </div>
            <div className="table-responsive">
               <label className="job-sub-heading width100">Attachments <span className="float-right normal gray-color">Total </span></label>
               <div className="clear paddB10"></div>
               
               <div className="clear paddB10"></div>
            </div>
         </div>

        </div>
      }
    </>
  );
}

export default ClientView;
