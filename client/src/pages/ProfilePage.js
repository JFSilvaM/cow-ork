import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";

export default function ProfilePage() {
  const { data: user, loading, error } = useFetch("/users/profile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setBio(user.bio);
      setAvatar(user.avatar);
    }
  }, [user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
        bio,
      };

      const data = await fetchEndpoint(
        `/users/${user.id}`,
        token,
        "PUT",
        formData
      );

      if (data.status === "ok") {
        setErrorMessage("");
        setSuccessMessage(data);
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error);
    }
  };

  return (
    <section>
      <article className="flex flex-col space-y-4 border p-2">
        <form onSubmit={handleSubmit}>
          <Input
            id="first_name"
            name="first_name"
            value={firstName}
            setValue={setFirstName}
          />

          <Input
            id="last_name"
            name="last_name"
            value={lastName}
            setValue={setLastName}
          />

          <Input id="email" name="email" value={email} setValue={setEmail} />

          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            setValue={setPassword}
          />

          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
          />

          <Input id="bio" name="bio" multiline value={bio} setValue={setBio} />

          <Avatar size="xxxl" src={`/images/avatars/${avatar}`} />
          <Input id="avatar" name="avatar" type="file" />

          <Button size="sm" shape="rounded">
            Actualizar
          </Button>
        </form>
        {successMessage && (
          <Alert color="success" icon="success">
            {successMessage.message}
          </Alert>
        )}
        {errorMessage && (
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        )}
      </article>
    </section>
  );
}
