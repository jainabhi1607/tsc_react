import { useDispatch, useSelector } from "react-redux";
import { fetchsupportData } from "../Slices/supportSlice";
import { useEffect } from "react";

function Support() {
  const dispatch = useDispatch();

  let userData = "";
  if (
    sessionStorage.getItem("userData") !== "" &&
    sessionStorage.getItem("userData") !== null
  ) {
    userData = JSON.parse(sessionStorage.getItem("userData"));

    const userId = userData.id;
    useEffect(() => {
      dispatch(fetchsupportData({ userId: userId }));
    }, []);
  } else {
    navigate("/login", { replace: true });
  }

  const data = useSelector(function (state) {
    return state.tscSupportStore;
  });
  return (
    <>
      <h1 className="page-heading marB10">Support Tickets</h1>

      <div className="support_ticket_listing">
        <div
          id="support_ticket"
          className="form-inline dt-bootstrap ticket-listing support_ticket_listing client_access"
        >
          <table className="table table-striped table-hover dataTables-example10">
            <thead>
              <tr role="row">
                <th>Ticket No.</th>
                {userData?.role < 4 ? (
                  <>
                    <th>Client Name</th>
                  </>
                ) : (
                  ""
                )}
                <th>Client Site</th>
                <th>Asset</th>
                {userData?.role >= 4 ? (
                  <>
                    <th>Requester</th>
                    <th>Lodged Date</th>
                  </>
                ) : (
                  ""
                )}

                {userData?.role < 4 && (
                  <>
                    <th>Job Title</th>
                    <th>Age</th>
                    <th>Technicians</th>
                  </>
                )}

                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.values(data.supportData.data).length > 0 &&
                Object.values(data.supportData.data).map((result) => {
                  return (
                    <>
                      <tr>
                        <td className="paddL25">{result.ticket_no}</td>
                        
                        {userData?.role < 
                          4 && (
                          <>
                            <td>{result.company_name}</td>
                          </>
                        )}

                        <td>{result.site_name}</td>
                        <td>{result.machine_name}</td>
                        {userData?.role >=
                          4 && (
                          <>
                            <td>{result.contact_name}</td>
                            <td>{result.date}</td>
                          </>
                        )}

                        {userData?.role <
                          4 && (
                          <>
                            <td>{result.title}</td>
                            <td>{result.age}</td>
                            <td>{result.technicians}</td>
                          </>
                        )}

                        <td className="paddB0">
                          <span
                            className={`status ${
                              result.status
                                ? `ticket_status_${result.status} client_ticket_status_${result.status}`
                                : ""
                            }`}
                          >
                            {result.status_display}
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
      </div>
      <div className="clear paddB30 paddT20"></div>
    </>
  );
}

export default Support;
