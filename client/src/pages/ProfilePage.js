import Alert from "../components/Alert";
import Avatar from "../components/Avatar";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function ProfilePage() {
  const { data: user, loading, error } = useFetch("/users/profile");

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
      <article>
        <Typography>{user.first_name}</Typography>
        <Typography>{user.last_name}</Typography>
        <Typography>{user.email}</Typography>
        <Typography>{user.bio}</Typography>
        <Avatar src={`/images/avatars/${user.avatar}`} />
        <Typography>{user.is_admin}</Typography>
        <Typography>{user.is_active}</Typography>
        <Typography>{user.created_at}</Typography>
      </article>
    </section>
  );
}
