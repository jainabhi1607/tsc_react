import { useDispatch, useSelector } from "react-redux";
import { fetchServiceData } from "../Slices/serviceSlice";
import { useEffect, useState } from "react";import { encryptPhpCompatible, decryptPhpCompatible } from "../cryptoHelper";
import { Link } from "react-router-dom";

function CompletedService() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  let userData = "";
const edit = encryptPhpCompatible("edit");

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
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchServiceData({ userId: userId, completed: 1 }));
    }
  }, [userId]);

  const data = useSelector(function (state) {
    return state.tscServiceStore;
  });
  return (
    <>
      <h1 className="page-heading marB10">Services</h1>

      <div class="clear"></div>
      <ul class="websites-tabs">
        <li class="ticket_status">
          <Link to={`/service`}>Upcoming</Link>
        </li>
        <li class="active ticket_status">
          <Link to={`/completed`}>Completed</Link>
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
            {data?.serviceData?.results?.length > 0 &&
          Object.values(data?.serviceData?.results).length > 0 &&
          Object.values(data?.serviceData?.results).map((result) => {
            let first = encryptPhpCompatible(result.id.toString() + "first");
            let id_encrypted = encryptPhpCompatible(result.id.toString());
            let user_id_encrypted = encryptPhpCompatible(userId?.toString());
                return (
                  <>
                    <tr>
                      <td className="paddL25">{result.ticket_no}</td>
                      <td>{result.site_name}</td>
                      <td>{result.machine_name}</td>
                      <td>{result.job_date}</td>
                      <td>{result.type}</td>
                      <td className="paddB0">
                        <span className="status client_ticket_status ticket_status_{result.status}">
                          {result.status_display}
                        </span>
                      </td>
                      <td className="paddR0 paddL0">

                        <Link className="comment-operations icon" to={`/service_client_view/${edit}/${user_id_encrypted}/${id_encrypted}/${first}`}>
                    <span class="arrow-right"></span></Link>
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

export default CompletedService;
