import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientViewAssetData } from "../../Slices/clientSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import ClientSiteViewTop from "../../Components/ClientSiteViewTop";
import { encryptPhpCompatible } from "../../cryptoHelper";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewAsset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      dispatch(fetchClientViewAssetData({ userId: userId, id: id }));
    }
  }, [userId]);

  const storeData = useSelector((state) => state.tscClientStore);
  const asset = storeData?.ViewAssetData;
  console.log("Asset Data: ",asset)
  if (!asset || !asset.details) return <p className="p-4">Loading...</p>;

  // ========== Chart Data ==========
  const chartLabels = Object.values(asset.type_arr || {}).map((t) => t.title);
  const chartValues = Object.values(asset.type_arr || {}).map((t) => t.count);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Maintenance Actions",
        data: chartValues,
        backgroundColor: ["#00BFFF", "#87CEFA", "#1E90FF"],
        borderColor: ["#fff"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "right",
        labels: { usePointStyle: true, pointStyle: "circle" },
      },
    },
  };

  // ========== Format Helpers ==========
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNoteDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>

      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Left Main Content */}
        <div className="col-span-8 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white rounded-xl p-4 shadow">
              <p className="text-sm">Time since last service</p>
              <h2 className="text-2xl font-bold">2 Months</h2>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <p className="text-sm">Support Requests</p>
              <h2 className="text-2xl font-bold">{asset.total_support_tickets}</h2>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <p className="text-sm">Job Cards</p>
              <h2 className="text-2xl font-bold">{asset.total_job_cards}</h2>
            </div>
          </div>

          {/* Maintenance Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4">Maintenance action Breakdown by Type</h3>
            <div className="flex items-center">
              <div className="w-1/2">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
              <div className="ml-6">
                <p>Total Maintenance Actions: {asset.total_actions}</p>
                {chartLabels.map((label, i) => (
                  <p key={i}>
                    <span
                      className="inline-block w-3 h-3 mr-2 rounded-full"
                      style={{
                        backgroundColor:
                          chartData.datasets[0].backgroundColor[i],
                      }}
                    ></span>
                    {label}: {chartValues[i]}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-xs text-gray-400">
              Last Edited: {formatNoteDate(asset.details.notes_edit_date_time)}
            </p>
            <p className="mt-2">{asset.details.notes}</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Asset Info */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="w-full h-40 bg-blue-50 flex items-center justify-center">
              {asset.details.image ? (
                <img
                  src={asset.details.image}
                  alt="Asset"
                  className="h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">[Image Placeholder]</span>
              )}
            </div>
            <p className="mt-4 text-sm text-gray-600">Serial Number</p>
            <p className="font-semibold">{asset.details.serial_no}</p>
            <p className="mt-2 text-sm text-gray-600">Purchase Date</p>
            <p className="font-semibold">{formatDate(asset.details.date_time)}</p>
            <p className="mt-2 text-sm text-gray-600">Make</p>
            <p className="font-semibold">{asset.details.AssetMakes?.title}</p>
            <p className="mt-2 text-sm text-gray-600">Model</p>
            <p className="font-semibold">{asset.details.AssetModels?.title}</p>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-2">QR Code</h3>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://yourdomain.com/asset/${asset.details.id}`}
              alt="QR Code"
              className="mx-auto"
            />
            <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg">
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAsset;
