function ErrorState({
  title = "Something went wrong.",
  message = "We couldn't load the requested content.",
  onRetry,
}) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-icon">!</div>

      <h2>{title}</h2>

      <p>{message}</p>

      {onRetry && (
        <button type="button" className="error-state-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
