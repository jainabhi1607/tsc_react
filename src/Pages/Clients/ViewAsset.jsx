import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientViewAssetData } from "../../Slices/clientSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { encryptPhpCompatible } from "../../cryptoHelper";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { QRCodeCanvas } from "qrcode.react";
import ViewAssetTop from "../../Components/ViewAssetTop";
import AddEditAssetNotes from "./AddEditAssetNotes";

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewAsset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const edit = encryptPhpCompatible("edit");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleEditClick = (id) => {
    console.log('cliked')
    setSelectedId(id);
    setShowModal(true);
  };

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
  
  if (!asset || !asset.details) return <p className="p-4">Loading...</p>;

  
  const qrValue = `https://tsc.sterlinginfotech.com/client-asset/${asset?.details?.id}`;

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
    responsive: true,
    aspectRatio: 1,
    cutout: "85%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#FFF", // ✅ Set tooltip background color
        bodyColor: "#000",
        titleColor: "#000",
        displayColors: false, // ✅ Remove colored box
        callbacks: {
          title: () => "", // ✅ Remove tooltip title
          label: (context) => {
            const label = context.label || "";
            const value = context.raw;
            return `${label}: ${value.toFixed(1)}%`; // e.g., "Installation: 75%"
          },
        },
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
      <ViewAssetTop
        id={asset?.details?.id}
        user_id={userId}
        machine_name={asset?.details?.machine_name}
        site_name={asset?.details?.ClientSites?.site_name}
        action="view_asset"
      />
      <div className="detail-page">
        <div className="col-lg-8 paddL0 paddR0">
          <div className="asset_blocks">
            <div className="col-lg-4 paddL0">
              <div className="card bluecard">
                <div className="top-text">Time since last service</div>
                <div className="bottom-text date_text">
                  {asset.total_support_tickets}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="top-text">Support Requests</div>
                <div className="bottom-text">{asset.total_support_tickets}</div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="top-text">Job Cards</div>
                <div className="bottom-text">{asset.total_job_cards}</div>
              </div>
            </div>
            <div className="clear"></div>
          </div>

          <div className="clear paddB24"></div>
          <div className="col-lg-12 paddL0">
            <div className="table-responsive marB0">
              <h4 className="marT10">Maintenance action Breakdown by Type</h4>
              <div className="clear paddB20"></div>
              <div className="col-lg-3 paddL0 paddR0">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
              <div className="col-lg-2"></div>
              <div className="col-lg-7">
                <div className="col-lg-9 paddL0 paddT7">
                  Total Maintenance Actions
                </div>
                <div className="col-lg-3 paddR0">
                  <h3 className="right-align">{asset.total_actions}</h3>
                </div>
                <div className="clear paddB24"></div>
                {Object.values(asset.type_arr || {}).map((result) => {
                  return (
                    <>
                      <div className="col-lg-10 paddL0 line20">
                        <span className="analytics-box product_bg"></span>
                        <span className="float-left">{result.title}</span>
                      </div>
                      <div className="col-lg-2 paddR0 right-align line20">
                        {result.count}
                      </div>
                      <div className="clear marB10"></div>
                    </>
                  );
                })}
              </div>
              <div className="clear"></div>
            </div>
            <div className="clear paddB24"></div>
            <div className="table-responsive marB10">
              <div>
                <h3 className="bold600 paddT0">
                  Notes
                  <span className="notes_added paddL20">
                    Last Edited:{" "}
                    {formatNoteDate(asset.details.notes_edit_date_time)}
                  </span>

                  <button className="add_edit_asset_notes  comment-operations icon marR0" onClick={() => handleEditClick(asset.details.id)}>
                 
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18 "
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00172C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-edit-2"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg></button>

                    <AddEditAssetNotes
        show={showModal}
        handleClose={() => setShowModal(false)}
        assetId={selectedId}
      />
      
                </h3>
                <div className="clear paddB20"></div>
                <div>
                  {asset.details.notes ? (
                    <div className="client_notes">{asset.details.notes}</div>
                  ) : (
                    <a
                      href="javascript:void(0)"
                      className="add_edit_asset_notes"
                    >
                      <span className="underline">
                        Enter a note about this asset
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 paddR0">
          <div className="table-responsive">
            <div
              class={
                asset.details.image
                  ? "asset_image_exist"
                  : "asset_image paddT30"
              }
            >
              {asset.details.image ? (
                <img src={asset.details.image} alt="Asset" className="" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="140"
                  height="140"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ceecf7"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-image paddT30"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              )}
            </div>
            <div className="clear  "></div>
            <a
              href="javascript:void(0)"
              rel="<?php echo $edit;?>"
              rev="<?php echo $first;?>"
              dir="<?php echo $id;?>"
              lang="<?php echo $second;?>"
              className="add_edit_asset_image  comment-operations icon marR0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#272D34"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-pencil-icon lucide-pencil"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
            </a>
            <div className="clear paddB20"></div>
            <div className="col-lg-12 paddR0 paddL0">
              <label className="normal gray-color">Serial Number</label>
              <label className="float-right">{asset.details.serial_no}</label>
            </div>
            <div className="clear popup-divider"></div>
            <div className="col-lg-12 paddR0 paddL0">
              <label className="normal gray-color">Purchase Date</label>
              <label className="float-right">
                {asset.details.date_time
                  ? formatDate(asset.details.date_time)
                  : '<a href="javascript:void(0)" className="add_edit_asset gray-color underline">Edit Date</a>'}
              </label>
            </div>
            <div className="clear popup-divider"></div>
            <div className="col-lg-12 paddR0 paddL0">
              <label className="normal gray-color">Make</label>
              <label className="float-right">
                {asset?.AssetMakes?.title ? (
                  asset?.AssetMakes?.title
                ) : (
                  <a
                    href="javascript:void(0)"
                    className="add_edit_asset gray-color underline"
                  >
                    Edit Make
                  </a>
                )}
              </label>
            </div>
            <div className="clear popup-divider"></div>
            <div className="col-lg-12 paddR0 paddL0">
              <label className="normal gray-color">Model</label>
              <label className="float-right">
                {asset?.AssetModels?.title ? (
                  asset?.AssetModels?.title
                ) : (
                  <a
                    href="javascript:void(0)"
                    className="add_edit_asset gray-color underline"
                  >
                    Edit Model
                  </a>
                )}
              </label>
            </div>
          </div>
          <div className="table-responsive">
            <div>
              <input
                type="hidden"
                name="copy_link"
                id="copy_link"
                value={qrValue}
              />
              <span className="bold600 float-left font-16">QR Code</span>
            </div>
            <div className="clear paddB20"></div>
            <div className="qr_code_text">
              Download the QR code sticker to place on or near your asset for on
              the spot asset information and maintenance tracking.
            </div>
            <div className="clear paddB20"></div>
            <div className="col-lg-5 paddR0 paddL0">
              <QRCodeCanvas
                id="coloredQR"
                value={qrValue}
                size={122}
                bgColor="#ffffff"
                fgColor="#00AEEF" // ✅ Changed color here
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="col-lg-7 paddR0">
              <div className="clear paddB20"></div>
              <div>
                <a
                  id="downloadLink"
                  href={document
                    .getElementById("coloredQR")
                    ?.toDataURL("image/png")}
                  download="qrcode.png"
                  className="border-box-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-download"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span> Download</span>
                </a>
              </div>

              <div className="clear paddB20"></div>
              <div>
                <a
                  href={qrValue}
                  className="border-box-transparent"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2A2A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-external-link"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21 3"></line>
                  </svg>
                  <span> Visit URL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAsset;
