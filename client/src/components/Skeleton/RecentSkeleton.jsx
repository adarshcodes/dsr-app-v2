import React from "react";

function RecentSkeleton({ id }) {
	return (
		<div className="skeleton skeleton-card recents-card card" key={id}>
			<div className="info">
				<div className="data date">
					<div className="skeleton-text"></div>
					<div className="skeleton-text skeleton-text-short"></div>
				</div>

				<div className="data date">
					<div className="skeleton-text"></div>
					<div className="skeleton-text skeleton-text-short"></div>
				</div>

				<div className="data date">
					<div className="skeleton-text"></div>
					<div className="skeleton-text skeleton-text-short"></div>
				</div>

				<div className="data date">
					<div className="skeleton-text"></div>
					<div className="skeleton-text skeleton-text-short"></div>
				</div>
			</div>

			<div className="cta">
				<div className="skeleton-button"></div>
			</div>
		</div>
	);
}

export default RecentSkeleton;
