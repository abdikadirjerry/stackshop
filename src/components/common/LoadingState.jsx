function LoadingState({ message = "Loading..." }) {
  return (
    <div className="loading-state" role="status">
      <div className="loading-spinner"></div>

      <p>{message}</p>
    </div>
  );
}

export default LoadingState;
