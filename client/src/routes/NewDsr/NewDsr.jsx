import React, { useState, useEffect, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedComponent from "../../AnimatedComponent";
import Modal from "../../components/Modal/Modal";
import { takeData, transferData } from "../../parts/Dashboard/Dashboard";
import NewDsrSkeleton from "../../components/Skeleton/NewDsrSkeleton";
import Dropdown from "../../components/Dropdown/Dropdown";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { base_url } from "../../api/base_url";

/*
Written the Code of NewDSR and made it responsive --- Ayush
*/

function NewDsr() {
  // adding a loading part which renders if api is slows down
  const [loading, setLoading] = useState(true);

  // Checking today's status of dsr(if already dsr is added the we will show edit option and remove form and leave button | if leave status is returned then it will show that you are on leave and if neither it returns leave nor dsr filled then will will show the form as well as Leave button) --Adarsh-25-apr-2023
  const [isLeave, setIsLeave] = useState("");

  //draft value is receiving from the drafts.jsx for
  const { draftValue } = useContext(transferData);
  const { isUse, setIsUse } = useContext(takeData);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(base_url + "/dsr/today/status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        // body: localStorage.getItem("authToken"),
      });
      const data = await response.json();
      if (data.status === 403) {
        localStorage.clear();
        window.location.href = window.location.origin + "/#/login";
      }

      setIsLeave(data);
      setLoading(false);
      // !data && <Navigate to="/login" replace />;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  // Posting New DSR Data --Adarsh-20-April-2023
  // Creating state to get data from the inputs onChange --Adarsh-20-April-2023

  // Generating current date in readable format
  const dateTime = new Date();

  let monthArray = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDate =
    dateTime.getDate() +
    " " +
    monthArray[dateTime.getMonth()] +
    " " +
    dateTime.getFullYear();

  const [dsrData, setDsrData] = useState([
    {
      project: null,
      other_project: "",
      other_manager: "",
      activitiesCompleted: "",
      activitiesPlanned: "",
      health: "",
      hoursWorked: "",
      comment: "",
      openIssues: "",
    },
  ]);

  const handleAddMore = () => {
    setDsrData([
      ...dsrData,
      {
        project: null,
        other_project: "",
        other_manager: "",
        activitiesCompleted: "",
        activitiesPlanned: "",
        health: "",
        hoursWorked: "",
        comment: "",
        openIssues: "",
      },
    ]);
  };

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleTabDelete = (index) => {
    const previousTab = activeTab === 0 ? 0 : activeTab - 1;
    const updatedFormEntries = dsrData.filter((entry, i) => i !== index);
    setDsrData(updatedFormEntries);
    setActiveTab(previousTab);
  };

  // Setting data from input in the state for both the DSR data and Draft data --20-April-2023--Adarsh

  function storeData(e, index) {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "hoursWorked") {
      // Remove any non-digit characters
      value = value.replace(/[^\d.]/g, "");

      // Limit to a range between 1 and 15
      if (value < 0) {
        value = "";
      } else if (value > 12) {
        value = 12;
      }
    }
    const updatedFormEntries = [...dsrData];
    updatedFormEntries[index][name] = value;
    setDsrData((prevDatam) =>
      prevDatam.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );

    // setDraftData((prevDatal) =>
    //   prevDatal.map((item, i) =>
    //     i === index ? { ...item, [name]: value } : item
    //   )
    // );

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  }

  // Handle Quill data change
  const handleQuillChange = (name, value, index) => {
    setDsrData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );

    setDraftData((prevDsrData) => ({
      ...prevDsrData,
      [name]: value,
    }));

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle Quill Edit
  const handleQuillEdit = (name, value) => {
    setLastDsr((prevDsrData) => ({
      ...prevDsrData,
      [name]: value,
    }));
  };

  //changing the state of dsrData if draftValue exist :------Ayush

  useEffect(() => {
    isUse &&
      draftValue &&
      setDsrData({
        project: draftValue.project,
        activitiesCompleted: draftValue.activitiesCompleted,
        activitiesPlanned: draftValue.activitiesPlanned,
        hoursWorked: draftValue.hoursWorked,
        health: draftValue.health,
        comment: draftValue.comment,
        openIssues: draftValue.openIssues,
        other_manager: draftValue.other_manager,
        other_project: draftValue.other_project,
      });
    isUse && draftValue && setSelectedOption(draftValue["health"]);

    isUse &&
      draftValue &&
      setSelectedProject({
        value: draftValue.project.name,
        label: draftValue.project.name,
        manager: draftValue.project.manager,
        _id: draftValue._id,
      });
  }, [isUse, draftValue]);
  // --Handle data post for new DSR to API--
  const handlePost = async (event) => {
    setLoading(true);
    try {
      const response = await fetch(base_url + "/dsr/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify(dsrData),
      });

      const data = await response.json();
      setLoading(false);
      if (data.status === 403) {
        localStorage.clear();
        window.location.href = window.location.origin + "/#/login";
      }
      // Clearing form after Submission
      setMsgToShow("DSR-Saved");
      data.errors ? errMsg() : verificationMsg();
      setTimeout(closeMsg, 2500);
      handleClear();
      setIsLeave("");
      await fetchLastDsr();
      await fetchStatus();
    } catch (error) {
      setMsgToShow("DSR-Not-Saved");
      errorMsg();
      setTimeout(closeMsg, 2500);
      console.log(error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      handlePost(event);
    }
  }

  // --End of Posting New DSR Data--

  // Clearing the input
  const handleClear = () => {
    setDsrData((prevData) =>
      prevData.map((item) => ({
        ...item,
        project: "",
        other_project: "",
        other_manager: "",
        activitiesCompleted: "",
        activitiesPlanned: "",
        health: "",
        hoursWorked: "",
        comment: "",
        openIssues: "",
      }))
    );

    setDraftData({
      ...dsrData,
      project: null,
      other_project: "",
      other_manager: "",
      activitiesCompleted: "",
      activitiesPlanned: "",
      health: "",
      hoursWorked: "",
      comment: "",
      openIssues: "",
    });

    setErrors({
      ...errors,
      project: "",
      other_project: "",
      other_manager: "",
      activitiesCompleted: "",
      activitiesPlanned: "",
      health: "",
      hoursWorked: "",
    });
    setSelectedOption("Project health");
    setSelectedProject("");

    setIsUse(false);
  };

  // Showing notification on submit data and error
  const [msgToShow, setMsgToShow] = useState();
  const [msg, setMsg] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  function verificationMsg() {
    setMsg(true);
  }

  function errorMsg() {
    setErrMsg(true);
  }

  function closeMsg() {
    setMsg(false);
    setErrMsg(false);
  }

  // Saving Draft
  const [draftData, setDraftData] = useState({
    project: null,
    other_project: "",
    other_manager: "",
    activitiesCompleted: "",
    activitiesPlanned: "",
    health: "",
    hoursWorked: "",
    comment: "",
    openIssues: "",
  });

  // Handle Draft Save
  const handleDraft = async () => {
    try {
      setLoading(true);
      const response = await fetch(base_url + "/dsr/draft/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify(draftData),
      });

      const data = await response.json();
      setLoading(false);
      // Clearing form after Submission
      if (data.status === 403) {
        localStorage.clear();
        window.location.href = window.location.origin + "/#/login";
      }

      handleClear();
      setMsgToShow("Draft-Saved");
      data.errors ? errMsg() : verificationMsg();
      setTimeout(closeMsg, 2500);
    } catch (error) {
      console.error("Error occurred:", error);
      setMsgToShow("Draft-Not-Saved");
      errorMsg();
      setTimeout(closeMsg, 2500);
    }
  };

  // Draft Validation
  // const handleDraftSave = () => {
  //   const isAnyFieldFilled = Object.keys(draftData).some((key) => {
  //     if (key === "user") {
  //       return false; // Ignore the "user" field
  //     }
  //     const value = dsrData[key];
  //     return value !== "" && value !== false;
  //   });

  //   if (isAnyFieldFilled) {
  //     handleDraft();
  //   } else {
  //     setMsgToShow("Draft-Empty");
  //     errorMsg();
  //     setTimeout(closeMsg, 2500);
  //   }
  // };

  // handling leave mark
  async function handleLeave() {
    try {
      const deletedData = await markLeave();
      await fetchStatus();
      return deletedData;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const markLeave = async () => {
    try {
      setLoading(true);
      const response = await fetch(base_url + "/dsr/onleave", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });

      const data = await response.json();
      setLoading(false);
      if (data.status === 403) {
        localStorage.clear();
        window.location.href = window.location.origin + "/#/login";
      }
      setMsgToShow("Marked-Leave");
      !data ? errorMsg() : verificationMsg();
      setTimeout(closeMsg, 2500);
    } catch (error) {
      setMsgToShow("Unmarked-Leave");
      errorMsg();
      setTimeout(closeMsg, 2500);
    }

    setModal(false);
  };

  function handleLeaveBtn() {
    hideModal();
    handleLeave();
  }

  // Shows Modal
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".container");
    modal
      ? container.classList.add("remove-scroll")
      : container.classList.remove("remove-scroll");
  }, [modal]);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  // Form Validation
  const [errors, setErrors] = useState({
    project: "",
    other_project: "",
    other_manager: "",
    activitiesCompleted: "",
    activitiesPlanned: "",
    health: "green",
    hoursWorked: "",
  });

  const validateForm = () => {
    let isValid = true;

    const newErrors = {
      project: "",
      other_project: "",
      other_manager: "",
      activitiesCompleted: "",
      activitiesPlanned: "",
      health: "green",
      hoursWorked: "",
    };

    if (!dsrData.project) {
      newErrors.project = "Project Name is required.";
      isValid = false;
    }

    // if (!dsrData.clientManager) {
    //   newErrors.clientManager = "Project Manager Name is required.";
    //   isValid = false;
    // }no need

    if (!dsrData.hoursWorked) {
      newErrors.hoursWorked = "Hours Worked is required.";
      isValid = false;
    } else if (dsrData.hoursWorked < 0) {
      newErrors.hoursWorked = "Hours Worked must be a positive number.";
      isValid = false;
    }

    if (!dsrData.health) {
      newErrors.health = "Project Status is required.";
      isValid = false;
    }

    if (!dsrData.activitiesCompleted) {
      newErrors.activitiesCompleted = "Activities completed today is required.";
      isValid = false;
    }

    if (!dsrData.activitiesPlanned) {
      newErrors.activitiesPlanned =
        "Activities planned for tomorrow is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Updating DSR
  const [lastDsr, setLastDsr] = useState({
    project: "",
    manager: "",
    other_project: "",
    other_manager: "",
    activitiesCompleted: "",
    activitiesPlanned: "",
    health: "",
    hoursWorked: "",
    comment: "",
    openIssues: "",
  });

  // const [isUpdated, setIsUpdated] = useState(false);
  const [isEditable] = useState(false);

  const fetchLastDsr = async () => {
    setLoading(true);
    try {
      const response = await fetch(base_url + "/dsr/last", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });

      const data = await response.json();
      setLoading(false);
      if (data.status === 403) {
        localStorage.clear();
        window.location.href = window.location.origin + "/#/login";
      }
      setLastDsr(data.data);
      // setIsUpdated(data.data.isupdated);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchLastDsr();
  }, []);

  // const saveUpdate = async () => {
  //   try {
  //     const response = await fetch(base_url + "/dsr/update", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("authToken"),
  //       },
  //       body: JSON.stringify(lastDsr),
  //     });

  //     const data = await response.json();
  //     setLastDsr(data);
  //     setMsgToShow("Updated-Dsr");
  //     // !data.isupdated ? errMsg() : verificationMsg();
  //     setTimeout(closeMsg, 2500);
  //   } catch (error) {
  //     setMsgToShow("Noupdated-Dsr");
  //     errorMsg();
  //     setTimeout(closeMsg, 2500);
  //   }
  // };

  function handleEdit(e) {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "hoursWorked") {
      // Remove any non-digit characters
      value = value.replace(/\D/g, "");

      // Limit to a range between 1 and 15
      if (value < 1) {
        value = 1;
      } else if (value > 12) {
        value = 12;
      }
    }

    setLastDsr({
      ...lastDsr,
      [e.target.name]: value,
    });
  }

  const handleOptionEdit = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);

    setLastDsr({
      ...lastDsr,
      health: option.label,
    });
    setDraftData({
      ...draftData,
      health: option.label,
    });
  };

  // function editDsr() {
  //   // setIsEditable(true);
  //   fetchLastDsr();
  // }

  // function updateDsr() {
  //   // setIsEditable(false);
  //   // setIsUpdated(true);
  //   saveUpdate();
  // }

  // Custom Dropdown
  const [selectedOption, setSelectedOption] = useState("Project health");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Green", color: "#00cc00" },
    { label: "Orange", color: "#FFBF00" },
    { label: "Red", color: "#ff0000" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    setDsrData((prevData) =>
      prevData.map((item, index) => {
        if (index === activeTab) {
          return {
            ...item,
            health: option.label,
          };
        }
        return item;
      })
    );
    // setDsrData([
    //   {
    //     ...dsrData,
    //     health: option.label,
    //   },
    // ]);

    setDraftData({
      ...draftData,
      health: option.label,
    });
  };

  // fetch project list Api
  const [projects, setProjects] = useState([]);

  const ProjectList = async () => {
    setLoading(true);
    try {
      const response = await fetch(base_url + "/dsr/project", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        // body: localStorage.getItem("authToken"),
      });
      const data = await response.json();

      if (data.status === 403) {
        localStorage.clear();
        window.location.href = window.location.origin + "/#/login";
      }
      setProjects(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    ProjectList();
  }, []);

  //list dropdown project name and the project manager dynamically with the Api

  const list = projects.map((data) => {
    return {
      value: data.name,
      label: data.name,
      manager: data.manager,
      _id: data._id,
    };
  });

  const [selectedProject, setSelectedProject] = useState("");

  const handleProjectSelect = (selectedOption, index) => {
    setSelectedProject(selectedOption);
    const updatedDsrData = [...dsrData];
    const entryIndex = activeTab;
    if (entryIndex >= 0 && entryIndex < updatedDsrData.length) {
      updatedDsrData[entryIndex] = {
        ...updatedDsrData[entryIndex],
        project: selectedOption ? selectedOption._id : null,
      };
    }

    setDsrData(updatedDsrData);
    setDraftData({
      ...draftData,
      project: selectedOption ? selectedOption._id : null,
    });
  };

  return (
    // Adding animated component to make the route change animated -- Adarsh(19-Apr)
    <HelmetProvider>
      <AnimatedComponent>
        <Helmet>
          <title>Create New DSR | LeafLog-Quadrafort</title>
        </Helmet>
        <div className="container-box">
          {loading && <NewDsrSkeleton />}

          {!loading && !isLeave.submitted && !isLeave.leave && (
            <div className="new-dsr">
              {/* Notification Messages */}
              <div
                className={`verification-cta ${msg ? "show-verification" : ""}`}
              >
                <h3 className="heading-xs">
                  {msgToShow === "DSR-Saved" &&
                    "DSR successfully Submitted! 🎉"}
                  {msgToShow === "Draft-Saved" && "Draft saved successfully!🎉"}
                  {msgToShow === "Marked-Leave" && "Leave Marked for today! 🎉"}
                  {msgToShow === "Updated-Dsr" &&
                    "DSR is updated successfully! 🎉"}
                </h3>
              </div>

              <div
                className={`verification-cta error-cta ${
                  errMsg ? "show-verification" : ""
                }`}
              >
                <h3 className="heading-xs">
                  {msgToShow === "DSR-Not-Saved" &&
                    "DSR was not Saved! We are experiencing some problems! 💀"}
                  {msgToShow === "Draft-Not-Saved" &&
                    "Draft was not Saved! We are experiencing some problems! 💀"}
                  {msgToShow === "Draft-Empty" &&
                    "Fill atleast one field to save the draft! 💀"}
                  {msgToShow === "Unmarked-Leave" &&
                    "Unable to mark leave due to some internal issues! 💀"}
                  {msgToShow === "Noupdated-Dsr" &&
                    "Unable to edit DSR due to some internal issues! 💀"}
                </h3>
              </div>

              {/* Modal confirmation */}
              <Modal
                btnValue={"Mark Leave"}
                modalHead={"Are you sure to mark leave today?"}
                action={handleLeaveBtn}
                state={modal}
                setState={setModal}
                hideModal={hideModal}
              />

              <button
                className="btn btn-dark btn-error"
                onClick={(e) => showModal()}
              >
                On Leave
              </button>

              <div className="new-dsr-card">
                <div className="add-more">
                  <button type="button" onClick={handleAddMore}>
                    Add Project
                  </button>
                </div>
                <div className="tabs">
                  {dsrData.map((entry, index) => (
                    <div
                      key={index}
                      className={`tab ${activeTab === index ? "active" : ""}`}
                      onClick={() => handleTabClick(index)}
                    >
                      Project {index + 1}{" "}
                      {index > 0 && (
                        <span
                          className="cross"
                          onClick={() => handleTabDelete(index)}
                        >
                          {" "}
                          &#9587;
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="uid-date">
                  <h3 className="heading-s">Please Fill Your DSR!</h3>
                  <p className="para">
                    Date: <span>{currentDate}</span>
                  </p>
                </div>

                {dsrData.map((entry, index) => (
                  <div
                    className={`dynamic-form ${
                      activeTab === index ? "active" : ""
                    }`}
                    key={index}
                  >
                    <form className={`form login-form `}>
                      <div className="input-row">
                        <div className="input__group">
                          <Select
                            value={selectedProject}
                            defaultValue="Select Project"
                            isMulti={false}
                            name="colors"
                            options={list}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(e) => handleProjectSelect(e, index)}
                          />

                          <label
                            htmlFor="project-name"
                            className="input__label input-label"
                          >
                            Project Name <sup style={{ color: `red` }}>*</sup>
                          </label>

                          {errors.project && (
                            <div className="validation-error">
                              {errors.project}
                            </div>
                          )}
                        </div>

                        <div className="input__group">
                          <input
                            type="text"
                            id="client-manager-name"
                            name="clientManager"
                            onChange={(event) => storeData(event, index)}
                            className={`form__input form-input disabled ${
                              errors.clientManager
                                ? "invalid-input"
                                : "valid-input"
                            }`}
                            readOnly
                            value={
                              selectedProject ? selectedProject.manager : ""
                            }
                          />

                          <label
                            htmlFor="client-manager-name"
                            className="input__label input-label"
                          >
                            Project Manager Name{" "}
                            <sup style={{ color: `red` }}>*</sup>
                          </label>

                          {/* {errors.clientManager && (
                        <div className="validation-error">
                          {errors.}
                        </div>
                      )} */}
                        </div>
                      </div>

                      {selectedProject.value === "Other" && (
                        <div className="input-row">
                          <div className="input__group">
                            <input
                              type="text"
                              id="other-project-name"
                              name="other_project"
                              onChange={(event) => storeData(event, index)}
                              className={`form__input form-input ${
                                errors.project ? "invalid-input" : "valid-input"
                              }`}
                              value={entry.other_project}
                            />

                            <label
                              htmlFor="project-name"
                              className="input__label input-label"
                            >
                              Other Project Name{" "}
                              <sup style={{ color: `red` }}>*</sup>
                            </label>

                            {errors.project && (
                              <div className="validation-error">
                                {errors.other_manager}
                              </div>
                            )}
                          </div>

                          <div className="input__group">
                            <input
                              type="text"
                              id="other-manager-name"
                              name="other_manager"
                              onChange={(event) => storeData(event, index)}
                              className={`form__input form-input ${
                                errors.other_manager
                                  ? "invalid-input"
                                  : "valid-input"
                              }`}
                              value={entry.other_manager}
                            />

                            <label
                              htmlFor="client-manager-name"
                              className="input__label input-label"
                            >
                              Other Project Manager Name{" "}
                              <sup style={{ color: `red` }}>*</sup>
                            </label>

                            {errors.other_manager && (
                              <div className="validation-error">
                                {errors.other_manager}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="input-row">
                        <div className="input__group input__group__area">
                          <ReactQuill
                            value={entry.activitiesCompleted}
                            onChange={(value) =>
                              handleQuillChange(
                                "activitiesCompleted",
                                value,
                                index
                              )
                            }
                          />

                          <label
                            htmlFor="activities-today"
                            className="input__label input__label__area input-label"
                          >
                            Activities completed Today{" "}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>

                          {errors.activitiesCompleted && (
                            <div className="validation-error textarea-error">
                              {errors.activitiesCompleted}
                            </div>
                          )}
                        </div>

                        <div className="input__group input__group__area">
                          <ReactQuill
                            value={entry.activitiesPlanned}
                            onChange={(value) =>
                              handleQuillChange(
                                "activitiesPlanned",
                                value,
                                index
                              )
                            }
                          />

                          <label
                            htmlFor="activities-tomorrow"
                            className="input__label input__label__area input-label"
                          >
                            Activities planned for tomorrow{" "}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>

                          {errors.activitiesPlanned && (
                            <div className="validation-error textarea-error">
                              {errors.activitiesPlanned}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="input-row input-row-spcl">
                        <div className="input__group-box">
                          <div className="input__group row-group">
                            <input
                              type="number"
                              inputMode="numeric"
                              id="hours-worked"
                              name="hoursWorked"
                              onChange={(event) => storeData(event, index)}
                              className={`form__input form-input ${
                                errors.hoursWorked
                                  ? "invalid-input"
                                  : "valid-input"
                              }`}
                              min="1"
                              max="12"
                              value={entry.hoursWorked}
                            />

                            <label
                              htmlFor="hours-worked"
                              className="input__label input-label"
                            >
                              Hours Worked <sup style={{ color: "red" }}>*</sup>
                            </label>

                            {errors.hoursWorked && (
                              <div className="validation-error">
                                {errors.hoursWorked}
                              </div>
                            )}
                          </div>

                          <div className="input__group row-group">
                            <Dropdown
                              selectedOption={selectedOption}
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              options={options}
                              handleOptionClick={handleOptionClick}
                              id="health"
                            />

                            <label
                              htmlFor="health"
                              className="input__label input__label__area input-label"
                            >
                              Select Project Health{" "}
                              <sup style={{ color: `red` }}>*</sup>
                            </label>
                          </div>
                        </div>

                        <div className="input__group input__group__area input__group__area__spcl">
                          <textarea
                            id="open-issues"
                            name="openIssues"
                            onChange={(event) => storeData(event, index)}
                            className={`form__input form-input`}
                            value={entry.openIssues}
                          />

                          <label
                            htmlFor="open-issues"
                            className="input__label input__label__area input-label"
                          >
                            Open Issues for today <sup>&nbsp;</sup>
                          </label>
                        </div>
                      </div>

                      <div className="input-row">
                        <div className="input__group input__group__area">
                          <textarea
                            id="comment"
                            name="comment"
                            onChange={(event) => storeData(event, index)}
                            className={`form__input form-input`}
                            value={entry.comment}
                          />

                          <label
                            htmlFor="comment"
                            className="input__label input__label__area input-label"
                          >
                            Any other comments
                          </label>
                        </div>
                      </div>

                      <div className="input-row btn-row">
                        <button
                          type="submit"
                          className="btn btn-dark"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>

                        <button
                          className="btn btn-dark btn-warning"
                          type="button"
                          onClick={handleDraft}
                        >
                          Save as Draft
                        </button>

                        <button
                          type="button"
                          className="btn btn-dark btn-error"
                          onClick={handleClear}
                        >
                          Clear
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
                {/* has context menu */}
              </div>
            </div>
          )}

          {!loading && isLeave.submitted && !isLeave.leave && (
            <div className="blank-container card-container edit-card">
              <div className="blank-page dsr-edit-page">
                <h1 className="heading-m">
                  <i className="fa-solid fa-person-hiking"></i>
                  <br />
                  {/* {`${
										!isUpdated
											? "You've already filled the DSR. Do you want to edit?"
											: "You've already edited the DSR. You can't edit again!"
									}`} */}
                  You've already filled the DSR.
                </h1>

                <div className="preview-edit">
                  <h4 className="heading-s">Your last DSR</h4>
                  <div className="preview-card">
                    <div className="edit-input-row">
                      <label htmlFor="project-edit">Project name:</label>
                      <input
                        type="text"
                        name="project"
                        id="project-edit"
                        value={
                          lastDsr.other_project
                            ? lastDsr.other_project
                            : lastDsr.project.name
                        }
                        onChange={handleEdit}
                        readOnly={!isEditable}
                        className={`${!isEditable ? "non-editable" : ""}`}
                      />
                    </div>

                    <div className="edit-input-row">
                      <label htmlFor="manager-edit">
                        Project manager name:
                      </label>
                      <input
                        type="text"
                        name="clientManager"
                        id="manager-edit"
                        value={
                          lastDsr.other_manager
                            ? lastDsr.other_manager
                            : lastDsr.project.manager
                        }
                        onChange={handleEdit}
                        readOnly={!isEditable}
                        className={`${!isEditable ? "non-editable" : ""}`}
                      />
                    </div>

                    <div className="edit-input-row">
                      <label htmlFor="hours-edit">Hours worked:</label>
                      <input
                        type="number"
                        name="hoursWorked"
                        id="hours-edit"
                        value={lastDsr.hoursWorked}
                        onChange={handleEdit}
                        readOnly={!isEditable}
                        className={`${!isEditable ? "non-editable" : ""}`}
                      />
                    </div>

                    <div className="edit-input-row">
                      <label htmlFor="status-edit">Project Health:</label>
                      {isEditable ? (
                        <Dropdown
                          selectedOption={selectedOption}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          options={options}
                          handleOptionClick={handleOptionEdit}
                          id="health"
                        />
                      ) : (
                        <input
                          type="text"
                          name="health"
                          id="status-edit"
                          value={lastDsr.health}
                          onChange={handleEdit}
                          readOnly={!isEditable}
                          className={`${!isEditable ? "non-editable" : ""}`}
                        />
                      )}
                    </div>

                    <div className="edit-input-row">
                      <label htmlFor="activity-edit">
                        Activities completed today:
                      </label>

                      {isEditable ? (
                        <ReactQuill
                          value={lastDsr.activitiesCompleted}
                          onChange={(value) =>
                            handleQuillEdit("activitiesCompleted", value)
                          }
                          modules={{ toolbar: true }}
                        />
                      ) : (
                        <div
                          className="rte non-editable"
                          dangerouslySetInnerHTML={{
                            __html: lastDsr.activitiesCompleted,
                          }}
                        ></div>
                      )}
                    </div>

                    <div className="edit-input-row">
                      <label htmlFor="activity-planned-edit">
                        Activities planned for tomorrows:
                      </label>

                      {isEditable ? (
                        <ReactQuill
                          value={lastDsr.activitiesPlanned}
                          onChange={(value) =>
                            handleQuillEdit("activitiesPlanned", value)
                          }
                          modules={{ toolbar: true }}
                        />
                      ) : (
                        <div
                          className="rte non-editable"
                          dangerouslySetInnerHTML={{
                            __html: lastDsr.activitiesPlanned,
                          }}
                        ></div>
                      )}
                    </div>

                    <div className="edit-input-row">
                      <label htmlFor="issues-edit">Open issues:</label>
                      <textarea
                        name="openIssues"
                        id="issues-edit"
                        value={lastDsr.openIssues}
                        onChange={handleEdit}
                        readOnly={!isEditable}
                        className={`${!isEditable ? "non-editable" : ""}`}
                      ></textarea>
                    </div>

                    <div className="edit-input-row">
                      <label htmlFor="comment-edit">Any other comment:</label>
                      <textarea
                        name="comment"
                        id="comment-edit"
                        value={lastDsr.comment}
                        onChange={handleEdit}
                        readOnly={!isEditable}
                        className={`${!isEditable ? "non-editable" : ""}`}
                      ></textarea>
                    </div>
                  </div>

                  {/* Showing edit or update button based on if it is edited once or not */}

                  {/* {!isUpdated ? (
										!isEditable ? (
											<button
												className="btn btn-dark btn-edit"
												onClick={editDsr}
											>
												Edit
											</button>
										) : (
											<button
												className="btn btn-dark btn-edit"
												onClick={updateDsr}
											>
												Update
											</button>
										)
									) : (
										""
									)}


									{!isUpdated ? (
										<p className="para warning-cta">
											Once you edit the DSR, you won't be able to edit again!
										</p>
									) : (
										""
									)} */}
                </div>
              </div>
            </div>
          )}

          {!loading && isLeave.leave && (
            <div className="blank-container card-container">
              <div
                className={`verification-cta error-cta ${
                  errMsg ? "show-verification" : ""
                }`}
              >
                <h3 className="heading-xs">
                  {msgToShow === "DSR-Not-Saved" &&
                    "DSR was not Saved! We are experiencing some problems! 💀"}
                  {msgToShow === "Draft-Not-Saved" &&
                    "Draft was not Saved! We are experiencing some problems! 💀"}
                  {msgToShow === "Unmarked-Leave" &&
                    "Unable to mark leave due to some internal issues! 💀"}
                  {msgToShow === "Noupdated-Dsr" &&
                    "Unable to edit DSR due to some internal issues! 💀"}
                </h3>
              </div>

              <div className="blank-page">
                <h1 className="heading-m">
                  <i className="fa-solid fa-person-hiking"></i>
                  <br />
                  You've already marked the DSR as Leave! <br />
                  You can only fill your DSR Tomorrow. <br /> Enjoy Your Day!
                </h1>
              </div>
            </div>
          )}

          {/* {!isLeave.leave && (
            <div className="blank-container card-container">
              <div className="blank-page">
                <h1 className="heading-m">
                  <i className="fa-solid fa-server"></i>
                  <br />
                  DSR was removed by Admin! Please contact your Manager!
                </h1>
              </div>
            </div>
          )} */}
        </div>
      </AnimatedComponent>
    </HelmetProvider>
  );
}

export default NewDsr;
