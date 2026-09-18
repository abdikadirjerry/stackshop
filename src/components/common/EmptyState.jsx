function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">○</div>

      <h2>{title}</h2>

      <p>{message}</p>

      {actionLabel && onAction && (
        <button type="button" className="empty-state-button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
