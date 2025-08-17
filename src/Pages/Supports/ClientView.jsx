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
          <h1 class="page-heading marB58">
            <a href="support" class="back-icon"></a>
            <span>
              Support Ticket # {data?.supportClientViewData?.details?.ticket_no}
            </span>
          </h1>
          <div class="col-lg-8 paddL0">
            <div class="table-responsive">
              <div class="paddT5">
                <span class="client_name font-26">
                  {data?.supportClientViewData?.details?.Clients?.company_name}
                </span>
              </div>
              <div class="clear paddB10"></div>
              <div class="clear paddB5">
                {data?.supportClientViewData?.details?.ClientSites.site_name} -{" "}
                {data?.supportClientViewData?.details?.ClientSites.address}
              </div>
              <div class="clear paddB5">
                {data?.supportClientViewData?.details?.ClientContacts.name}{" "}
                {data?.supportClientViewData?.details?.ClientContacts.last_name}
              </div>
              <div class="clear paddB5">
                {data?.supportClientViewData?.details?.ClientContacts.phone}
              </div>
              <div class="clear paddB5">
                {data?.supportClientViewData?.details?.ClientContacts.email}
              </div>
              <div class="clear paddB10"></div>
              <div class="clear popup-divider"></div>
              <div class="col-lg-12 paddR0 paddL0">
                <label class="normal gray-color">Sites</label>
                <label class="site-right">
                  <span>
                    {
                      data?.supportClientViewData?.details?.ClientSites
                        .site_name
                    }
                  </span>
                </label>
              </div>
              <div class="clear popup-divider"></div>
              <div class="col-lg-12 paddR0 paddL0">
                <label class="normal gray-color">Asset</label>
                <label class="site-right">
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
              <div class="clear popup-divider"></div>
              <div class="col-lg-12 paddR0 paddL0">
                <label class="normal gray-color">Production Impact</label>
                <label class="float-right">
                  {data?.supportClientViewData?.details?.production_impact}
                </label>
              </div>
              <div class="clear popup-divider"></div>
              <div class="col-lg-12 paddR0 paddL0">
                <label class="normal gray-color">Time issue occured</label>
                <label class="float-right">
                  {data?.supportClientViewData?.details?.time_issue_hours}:
                  {data?.supportClientViewData?.details?.time_issue_minutes}
                  {data?.supportClientViewData?.details?.time_issue_ampm}
                </label>
              </div>
              <div class="clear popup-divider"></div>
              <div class="col-lg-12 paddR0 paddL0">
                <label class="normal gray-color">Date Submitted</label>
                <label class="float-right">
                  {data?.supportClientViewData?.details?.date_time}
                </label>
              </div>
              <div class="clear popup-divider"></div>
              <div class="col-lg-12 paddR0 paddL0">
                <h4>Description</h4>
                <div class="clear paddB5"></div>
                <div class="col-lg-12 paddL0 paddR0 popup-input width100 line-22">
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

            <div class="col-lg-12 paddL0 paddB10 paddR0 lead-note-section comment_section">
              <form method="post">
                <h3 class="paddB10">
                  {userRole >= 4 ? "Activity" : "Comments / Updates"}
                </h3>
                <div>
                  <textarea
                    placeholder="Start typing..."
                    name="comments"
                    id="comment"
                    class="note_input"
                    rows="4"
                    required
                  ></textarea>
                  <div class="clear paddB10"></div>
                  <input
                    type="submit"
                    className="blue-btn float-left marR20"
                    id="submit_btn"
                    value="Save"
                  />
                  <div class="clear paddB10"></div>

                  {userData?.role < 4 && (
                    <>
                      <input
                        type="checkbox"
                        name="visibility"
                        value="2"
                        id="public_private"
                        className="public_private_class"
                      />
                      <label for="public_private" class="public_private_class">
                        Make Public
                      </label>
                    </>
                  )}

                  <div class="clear paddB30"></div>
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
                            <span class="blue-color">{final_date}</span>
                            <div class="clear paddB10"></div>
                            <div class="black-color">{message}</div>
                          </div>
                        </>
                      );
                  }
                )}
            </div>
          </div>

          <div class="col-lg-4 paddR0">
            <div class="table-responsive job-card-sidebar">
               <h3 class="bold600">Ticket Progress</h3>
               <div class="clear paddB10"></div>
               <div class="ticket_progress">
                      <span class="ticket_circle"></span>
                    <span>Ticket Created<br/><span class="paddL28">
                      {data?.supportClientViewData?.details?.dat_time}
                      </span></span>
                    <div class="clear paddB10"></div>
                    <span class="left-border"></span>
                    <div class="clear paddB25"></div>
                    
                      <span className={`ticket_circle ${data?.supportClientViewData?.details?.ticket_status < 2 ? "ticket_disabled" : "red-circle"}`}></span>
                    <span class={`${data?.supportClientViewData?.details?.ticket_status < 2 ? "ticket_disabled" :""}`}>In Progress</span>
                    <div class="clear paddB25"></div>
                    <span class="left-border"></span>
                    <div class="clear paddB25"></div>

                      <span className={`ticket_circle ${data?.supportClientViewData?.details?.ticket_status < 3 ? "ticket_disabled" : "yellow-circle"}`}></span>

                    <span class={`${data?.supportClientViewData?.details?.ticket_status < 3 ? "ticket_disabled" :""}`}>Technician Required<br/>
                    
                    
                    <span class="paddL28">{data?.supportClientViewData?.details?.ticket_status >= 3 && data?.supportClientViewData?.details?.JobCards?.job_date !== '' ? "Job Date: "+data.supportClientViewData.details.JobCards.job_date :""}
                    
                    </span></span>
                    <div class="clear paddB10"></div>
                    <span class="left-border"></span>
                    <div class="clear paddB25"></div>

                      <span className={`ticket_circle ${data?.supportClientViewData?.details?.ticket_status < 4 ? "ticket_disabled" : "blue-circle"}`}></span>

                    <span class={`${data?.supportClientViewData?.details?.ticket_status < 4 ? "ticket_disabled" :""}`}>Ticket Closed<br/>
                    
                    <span class="paddL28">                         
                         {data?.supportClientViewData?.details?.ticket_status >= 4 && data?.supportClientViewData?.details?.SupportTicketDetails?.resolved_date !== '' ? data.supportClientViewData.details.SupportTicketDetails.resolved_date :""}
                         </span></span>
                 </div>
            </div>
            <div class="table-responsive">
               <label class="job-sub-heading width100">Attachments <span class="float-right normal gray-color">Total </span></label>
               <div class="clear paddB10"></div>
               
               <div class="clear paddB10"></div>
            </div>
         </div>

        </div>
      }
    </>
  );
}

export default ClientView;
