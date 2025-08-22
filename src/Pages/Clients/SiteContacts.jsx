import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientSiteContactsData } from "../../Slices/clientSlice";
import { useParams } from "react-router-dom";
import ClientSiteViewTop from "../../Components/ClientSiteViewTop";
import { encryptPhpCompatible } from "../../cryptoHelper";

function siteContacts() {
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
      dispatch(fetchClientSiteContactsData({ userId: userId, id: id }));
    }
  }, [userId]);

  const data = useSelector(function (state) {
    return state.tscClientStore;
  });
  console.log(data)
  return (
    <>
      {data?.siteContactsData?.details?.id && userId && (
        <ClientSiteViewTop
          id={data?.siteContactsData?.details?.id}
          user_id={userId}
          site_name={data?.siteContactsData?.details?.site_name}
          date_time={data?.siteContactsData?.details?.date_time}
          action="site_contacts"
        />
      )}
      <table className="table table-striped table-hover dataTables-example10">
      <thead>
        <tr role="row">
          <th className="paddL20">Name</th>
          <th>Position</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {data?.siteContactsData?.results &&
        Object.values(data.siteContactsData.results).length > 0 &&
        Object.values(data.siteContactsData.results).map((result) => {
          let first = encryptPhpCompatible(result.id.toString() + "first");
          let id_encrypted = encryptPhpCompatible(result.id.toString());
          let user_id_encrypted = encryptPhpCompatible(userId?.toString());

          return (
            <>
              <tr class="">
                  <td class="paddL25">{result.name+' '+result.last_name}</td>
                  <td class="paddB0">{result.position}</td>
                  <td class="paddB0">{result.email}</td>
                  <td class="paddB0">{result.phone}</td>
               </tr>
            </>
          );
        })}
        </tbody></table>
    </>
  );
}

export default siteContacts;
