export default function Die(props) {
  let styles = {
    backgroundColor: props.isheld ? "#59e391" : "white",
  };
  return (
    <div
      className="die-element"
      style={styles}
      onClick={() => props.handleHeld(props.id)}
    >
      <h2>{props.value}</h2>
    </div>
  );
}
