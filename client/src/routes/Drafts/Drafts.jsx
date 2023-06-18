import React, { useState, useEffect, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedComponent from "../../AnimatedComponent";
import { transferData, takeData } from "../../parts/Dashboard/Dashboard";
import RecentSkeleton from "../../components/Skeleton/RecentSkeleton";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
// import NewDsrSkeleton from "../../components/Skeleton/NewDsrSkeleton";

function Drafts() {
	// State to save drafts from API call
	const [drafts, setDrafts] = useState([]);
	// State to set the Loading skeleton
	const [loading, setLoading] = useState(true);

	// using the useContext to set the draftdata into the setDraftData function for newDSr.
	const { setDraftData } = useContext(transferData);
	const { setIsUse } = useContext(takeData);

	function handleUse(index) {
		setDraftData(drafts[index]);
		setIsUse(true);
	}

	// Fetching drafts data from API using Async
	const fetchDrafts = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				"https://new-web-app.onrender.com/users/draft",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user: JSON.parse(localStorage.getItem("usercred")).id,
					}),
				}
			);
			const data = await response.json();
			setDrafts(data);
			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchDrafts();
	}, []);

	// Deleting Drafts
	async function deleteDraft(id) {
		try {
			const response = await fetch(
				"https://new-web-app.onrender.com/draftdelete",
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ draft: id }),
				}
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("There was an error deleting the data:", error);
		}
	}

	// Call deleteDraft and then fetchDrafts in sequence
	async function handleDelete(draftId) {
		try {
			const deletedData = await deleteDraft(draftId);
			verificationMsg();
			setTimeout(closeMsg, 3000);
			await fetchDrafts();
			return deletedData;
		} catch (error) {
			console.error("Error:", error);
		}
	}

	function handleDeleteBtn(draftId) {
		hideModal();
		handleDelete(draftId);
	}

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

	let draftId = 0;

	const [msg, setMsg] = useState(false);

	function verificationMsg() {
		setMsg(true);
	}

	function closeMsg() {
		setMsg(false);
	}

	// Checking if DSR is marked as Leave
	const [isLeave, setIsLeave] = useState("");

	const fetchStatus = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				"https://new-web-app.onrender.com/todaystatus",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user: JSON.parse(localStorage.getItem("usercred")).id,
					}),
				}
			);
			const data = await response.json();
			setIsLeave(data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchStatus();
	}, []);

	// Mapping drafts in to React component
	const cardDraft = drafts.map((data, index) => {
		// formatting date and time from API data
		let date = new Date(data.date);
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();

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

		let dateOfCreation = day + " " + monthArray[month] + " " + year;
		draftId = data._id;

		return (
			<div key={data._id}>
				<div className="draft-card recents-card card">
					<div className="info">
						<div className="data date">
							<h4 className="heading-xs">Date of Creation</h4>
							<p className="para date">{dateOfCreation}</p>
						</div>

						<div className="data project-name">
							<h4 className="heading-xs">Project Name</h4>
							<p className="para para-bold">{data.projectName}</p>
						</div>

						<div className="data hrs-worked">
							<h4 className="heading-xs">Hours Worked</h4>
							<p className="para">{data.hoursWorked} hrs</p>
						</div>

						<div className="data client-manager">
							<h4 className="heading-xs">Project Manager</h4>
							<p className="para">{data.clientManager}</p>
						</div>
					</div>

					<div className="cta">
						{isLeave === 0 ? (
							<Link
								to="/"
								className="btn btn-dark btn-view"
								onClick={() => handleUse(index)}
							>
								Use
							</Link>
						) : (
							""
						)}

						<button className="btn btn-dark btn-error" onClick={showModal}>
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	});

	return (
		// Adding animated component to make the route change animated -- Adarsh(19-Apr)
		<HelmetProvider>
			<AnimatedComponent>
				<Helmet>
					<title>Your Saved Drafts | LeafLog-Quadrafort</title>
				</Helmet>
				<div className={`verification-cta ${msg ? "show-verification" : ""}`}>
					<h3 className="heading-xs">Draft Deleted Successfully! 🎉</h3>
				</div>

				{/* Modal confirmation */}
				<Modal
					btnValue={"Delete"}
					modalHead={"Are you sure to delete this Draft?"}
					action={handleDeleteBtn}
					state={modal}
					setState={setModal}
					hideModal={hideModal}
					draftId={draftId}
				/>

				<div className="recents">
					<h3 className="heading-s">Your Saved Drafts</h3>

					<div className="recents-card-container card-container">
						<div className="scroll-parent">
							{loading ? (
								Array.from({ length: 10 }, (_, i) => <RecentSkeleton key={i} />)
							) : cardDraft.length > 0 ? (
								cardDraft
							) : (
								<div className="blank-page">
									<h3 className="heading-s">
										<i className="fa-solid fa-mug-hot"></i>
										<br /> There is no saved Drafts. <br />
										You can save the draft from the New DSR page!
									</h3>
								</div>
							)}
						</div>
					</div>
				</div>
			</AnimatedComponent>
		</HelmetProvider>
	);
}

export default Drafts;
