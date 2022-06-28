import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function UsersPage() {
  const { data: users, loading, error } = useFetch("/users");

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert color="error" icon="error">
        Error: {error.message}
      </Alert>
    );
  }

  return (
    <section>
      {users.map((user) => (
        <article key={user.id}>
          <Typography>{user.first_name}</Typography>
          <Typography>{user.last_name}</Typography>
          <Typography>{user.email}</Typography>
          <Typography>{user.bio}</Typography>
          <Typography>{user.avatar}</Typography>
          <Typography>{user.is_admin}</Typography>
          <Typography>{user.is_active}</Typography>
          <Typography>{user.created_at}</Typography>
        </article>
      ))}
    </section>
  );
}
