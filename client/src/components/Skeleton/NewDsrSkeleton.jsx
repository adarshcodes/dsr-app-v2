import React from "react";

function NewDsrSkeleton() {
	return (
		<div className="new-dsr-card">
			<div className="btn-skeleton align-right"></div>

			<div className="skeleton skeleton-card skeleton-new-dsr">
				<div className="uid-date">
					<p className="skeleton-text skeleton-date"></p>
				</div>

				<div className="form">
					<form className="form login-form">
						<div className="input-row">
							<div className="input__group">
								<div className="skeleton-input"></div>
							</div>

							<div className="input__group">
								<div className="skeleton-input"></div>
							</div>
						</div>

						<div className="input-row">
							<div className="input__group">
								<div className="skeleton-input"></div>
							</div>

							<div className="input__group">
								<div className="skeleton-input"></div>
							</div>
						</div>

						<div className="input-row">
							<div className="input__group input__group__area">
								<div className="skeleton-input skeleton-area"></div>
							</div>

							<div className="input__group input__group__area">
								<div className="skeleton-input skeleton-area"></div>
							</div>
						</div>

						<div className="input-row">
							<div className="input__group input__group__area">
								<div className="skeleton-input skeleton-area"></div>
							</div>

							<div className="input__group input__group__area">
								<div className="skeleton-input skeleton-area"></div>
							</div>
						</div>

						<div className="input-row btn-row">
							<div className="btn-skeleton"></div>

							<div className="btn-skeleton"></div>

							<div className="btn-skeleton"></div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default NewDsrSkeleton;
