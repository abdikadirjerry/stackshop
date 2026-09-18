import { Link } from "react-router-dom";

function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">○</div>

      <h2>{title}</h2>

      <p>{message}</p>

      {actionLabel && actionTo && (
        <Link to={actionTo} className="empty-state-button">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
