import { useEffect, useRef, useState } from "react";
import Alert from "../components/Alert";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
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
  const [errorMessage, setErrorMessage] = useState("");
  const avatarRef = useRef(null);
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
      <div className="flex">
        <Alert color="error" icon="error">
          Error: {error.message}
        </Alert>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);
      formData.append("bio", bio);
      formData.append("avatar", avatarRef.current.files[0] || avatar);

      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      ).then((res) => res.json());

      if (data.status === "error") {
        throw new Error(data.message);
      }

      if (data.status === "ok") {
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <section className="flex w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-5 text-slate-800 dark:text-slate-200"
      >
        <div className="md: flex w-full flex-col justify-center gap-5 px-2 md:flex-row md:gap-10 lg:gap-32">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="">
              <div className="h-64 w-64 overflow-hidden rounded-full bg-cover object-cover">
                {avatar && (
                  <Avatar
                    src={`${process.env.REACT_APP_SERVER_URL}/images/avatars/${avatar}`}
                  />
                )}
              </div>
            </div>

            <input id="avatar" name="avatar" type="file" ref={avatarRef} />
          </div>

          <div className="flex flex-col gap-3 md:w-1/2">
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <label className="w-full">
                <Typography
                  as="label"
                  className="block"
                  weight="semibold"
                  color="muted"
                  htmlFor="first_name"
                >
                  Nombre
                </Typography>

                <Input
                  id="first_name"
                  name="first_name"
                  value={firstName}
                  setValue={setFirstName}
                  className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm dark:text-slate-800 sm:text-sm"
                />
              </label>

              <label className="w-full">
                <Typography
                  as="label"
                  className="block"
                  weight="semibold"
                  color="muted"
                  htmlFor="last_name"
                >
                  Apellidos
                </Typography>

                <Input
                  id="last_name"
                  name="last_name"
                  value={lastName}
                  setValue={setLastName}
                  className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm dark:text-slate-800 sm:text-sm"
                />
              </label>
            </div>

            <label className="block">
              <Typography
                as="label"
                className="block"
                weight="semibold"
                color="muted"
                htmlFor="email"
              >
                E-mail
              </Typography>

              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                setValue={setEmail}
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm dark:text-slate-800 sm:text-sm"
              />
            </label>

            <label className="block">
              <Typography
                as="label"
                className="block"
                weight="semibold"
                color="muted"
                htmlFor="password"
              >
                Contraseña
              </Typography>

              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                setValue={setPassword}
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm dark:text-slate-800 sm:text-sm"
              />
            </label>

            <label className="block">
              <Typography
                as="label"
                className="block"
                weight="semibold"
                color="muted"
                htmlFor="password_confirmation"
              >
                Confirmar contraseña
              </Typography>

              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={passwordConfirmation}
                setValue={setPasswordConfirmation}
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm dark:text-slate-800 sm:text-sm"
              />
            </label>

            <label className="block">
              <Typography
                as="label"
                className="block"
                weight="semibold"
                color="muted"
                htmlFor="bio"
              >
                Biografía
              </Typography>

              <Input
                id="bio"
                name="bio"
                value={bio}
                setValue={setBio}
                multiline
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm dark:text-slate-800 sm:text-sm"
              />
            </label>

            {errorMessage && (
              <div className="flex">
                <Alert color="error" icon="error">
                  {errorMessage.message}
                </Alert>
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" shape="rounded">
                Actualizar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
