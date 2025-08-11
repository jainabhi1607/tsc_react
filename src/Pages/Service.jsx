import { useDispatch, useSelector } from "react-redux";
import { fetchserviceData } from "../Slices/serviceSlice";
import { useEffect } from "react";

function Service() {
  const dispatch = useDispatch();

  let userData = "";
  if (
    sessionStorage.getItem("userData") !== "" &&
    sessionStorage.getItem("userData") !== null
  ) {
    userData = JSON.parse(sessionStorage.getItem("userData"));

    const userId = userData.id;
    useEffect(() => {
      dispatch(fetchserviceData({ userId: userId, completed: 0 }));
    }, []);
  } else {
    navigate("/login", { replace: true });
  }

  const data = useSelector(function (state) {
    return state.tscServiceStore;
  });
  console.log("Data",data)
  return (
    <>
      <h1 className="page-heading marB10">Services</h1>

      <div class="clear"></div>
      <ul class="websites-tabs">
        <li class="active ticket_status">
          <a href="/service">Upcoming </a>
        </li>
        <li class="ticket_status">
          <a href="/completed">Completed</a>
        </li>
      </ul>
      <div class="clear"></div>
      <div id="job_card" className="form-inline dt-bootstrap ticket-listing">
        <table className="table table-striped table-hover dataTables-example10">
          <thead>
            <tr role="row">
              <th>Ticket No</th>
              <th>Site</th>
              <th>Asset</th>
              <th>Date Allocated</th>
              <th>Job Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.values(data?.serviceData?.results).length > 0 &&
              Object.values(data?.serviceData?.results).map((result) => {
                return (
                  <>
                    <tr>
                      <td className="paddL25">{result.ticket_no}</td>
                      <td>{result.ClientSites.site_name}</td>
                      <td>{result.ClientAssets?.machine_name}</td>
                      <td>{result?.job_date}</td>
                      <td>{result.JobCardTypes?.title}</td>
                      <td className="paddB0">
                        <span className="status client_ticket_status ticket_status_{result.status}">
                          {result?.status_display}
                        </span>
                      </td>
                      <td className="paddR0 paddL0">
                        <a href="#" class="comment-operations icon">
                          <span class="arrow-right"></span>
                        </a>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="clear paddB30 paddT20"></div>
    </>
  );
}

export default Service;
