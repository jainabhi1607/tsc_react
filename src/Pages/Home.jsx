import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BarChart from "../Components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../Slices/userSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [recentSupportTickets, setRecentSupportTickets] = useState([]);
  const [maintainanceTypes, setMaintainanceTypes] = useState([]);

  const dispatch = useDispatch();
  let userData = "";
  if (sessionStorage.getItem("userData") !== "" && sessionStorage.getItem("userData") !== null) {
    userData = JSON.parse(sessionStorage.getItem("userData"));

    const userId = userData.id;
    useEffect(() => {
      dispatch(fetchHomeData(userId));
    }, []);
  }
  else{
    navigate("/login", { replace: true });
  }

  const data = useSelector(function (state) {
    return state.tscStore;
  });

  const [jobsImp, setJobsImp] = useState([
    10, 20, 30, 15, 25, 35, 40, 30, 20, 10, 5, 15,
  ]);
  const [graphMaxValue, setGraphMaxValue] = useState(50);
  const [graphInterval, setGraphInterval] = useState(1);

  /*useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/dashboardReact/" + user.id
    );
    console.log(result.data.data)
    setData(result.data.data);
    const ticketArray = (Object).values(result.data.data.recent_support_tickets);
    setRecentSupportTickets(ticketArray);
    
    const typeArray = (Object).values(result.data.data.maintainance_type);
    setMaintainanceTypes(typeArray);
    
    setJobsImp(result.data.data.jobs);
    setGraphMaxValue(result.data.data.graph_max_value);
    setGraphInterval(result.data.data.graph_interval);
  }*/

  return (
    <>
      {data.homeData.length > 0}
      <h1 class="page-heading">Dashboard</h1>
      <div class="col-lg-12 paddL0 paddR0 client_dashboard">
        <div class="col-lg-3 paddL0 borderbox">
          <div class="bluebg">
            <p>Number of Assets</p>
            <h1>{data.homeData.total_assets}</h1>
          </div>
        </div>
        <div class="col-lg-3 paddL0 borderbox">
          <div class="marB10">
            <p>New Support Tickets</p>
            <h2>{data.homeData.new_support_tickets}</h2>
          </div>
          <div class="">
            <p>
              Machine with most <br />
              Intractions
            </p>
            <h2>{data.homeData.machine_name}</h2>
          </div>
        </div>
        <div class="col-lg-3 paddL0 borderbox">
          <div class="marB10">
            <p>Next Service Date</p>
            <h2>{data.homeData.next_service_date}</h2>
          </div>
          <div class="">
            <p>Next Service Site</p>
            <h2>{data.homeData.site_name}</h2>
          </div>
        </div>
        <div class="col-lg-3 paddL0  borderbox">
          <div class="bluebg"></div>
        </div>
        <div class="clear paddB30 paddT20"></div>
        <div class="clear paddT20"></div>
        <div class="col-lg-6 paddL0">
          <h4 class="chart-heading">
            Maintainance action per month (
            {data.homeData.maintainance_action_month})
          </h4>
          <BarChart
            jobsImp={jobsImp}
            graphMaxValue={graphMaxValue}
            graphInterval={graphInterval}
          />
        </div>

        <div class="col-lg-6 paddL0">
          <div class="border-box-transparent">
            <h4>Recent Support Tickets</h4>
            <div class="clear paddB10"></div>
            {recentSupportTickets.length === 0 && (
              <p>No recent tickets found.</p>
            )}
            {recentSupportTickets.length > 0 &&
              recentSupportTickets.map((recentItem) => {
                console.log("first");
                return (
                  <>
                    <div class="table-responsive setting-section paddB10 marB10">
                      <span>{recentItem.date_time}</span>
                      <span>{recentItem.machine_name}</span>
                      <a href="#">
                        <span class="forward-icon"></span>
                      </a>
                    </div>
                  </>
                );
              })}
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="clear paddB30"></div>
      <div class="col-lg-6 paddL0">
        <div class="border-box-transparent">
          <h4 class="marT10">Maintainance action Breakdown by Type</h4>
          <div class="clear paddB20"></div>
          <div class="col-lg-5 paddL0">
            <canvas id="typeChart"></canvas>
          </div>
          <div class="col-lg-1"></div>
          <div class="col-lg-6">
            <div class="col-lg-9 paddL0 paddT3">Total Maintainance Actions</div>
            <div class="col-lg-3 paddR0">
              <h3 class="right-align marT0">{data.homeData.total_actions}</h3>
            </div>

            <div class="clear paddB30"></div>

            {maintainanceTypes.length > 0 &&
              maintainanceTypes.map((maintainanceType) => {
                return (
                  <>
                    <div class="col-lg-10 paddL0 line20">
                      <span class="analytics-box product_bg_1"></span>
                      <span class="float-left">{maintainanceType.title}</span>
                    </div>
                    <div class="col-lg-2 paddR0 right-align line20">
                      {maintainanceType.count}
                    </div>
                    <div class="clear marB10"></div>
                  </>
                );
              })}
          </div>
          <div class="clear paddB10"></div>
        </div>
      </div>
      <div class="col-lg-6 paddL0 paddR0 client_dashboard">
        <div class="col-lg-6 paddL0 borderbox">
          <div class="marB10">
            <p>Sites</p>
            <h2>{data.homeData.total_client_sites}</h2>
          </div>
          <div class="">
            <p>Active Users</p>
            <h2>{data.homeData.total_client_users}</h2>
          </div>
        </div>
        <div class="col-lg-6 paddL0 borderbox">
          <div class="marB10">
            <p>Contacts</p>
            <h2>{data.homeData.total_client_contacts}</h2>
          </div>
          <div class="">
            <p>Most maintainance Actions</p>
            <h2>Sterling</h2>
          </div>
        </div>
      </div>

      <div class="clear paddB30 paddT20"></div>
    </>
  );
}

export default Home;
