function ThreadList({ threads }) {
    return (
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            Thread ID: {thread.id} <br />
            Snippet: {thread.snippet}
          </li>
        ))}
      </ul>
    );
  }

  export default ThreadList;